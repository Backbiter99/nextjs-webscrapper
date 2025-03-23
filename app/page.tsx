"use client";

import ReviewSummary from "@/components/ReviewSummary";
import axios from "axios";
import { useState } from "react";

interface IProduct {
    productName: string;
    rating: string;
    numRatings: string;
    price: string;
    discount: string;
    bankOffers: {
        title: string;
        description: string;
        offerCount: string;
    }[];
    aboutItem: string;
    productInfo: string;
    productImg?: string[];
    manufacturerImg: string[];
    reviews?: string[];
}

export default function Home() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState<IProduct>();
    const [darkMode, setDarkMode] = useState(false);

    const handleScrape = async () => {
        setLoading(true);

        console.log(`url: ${url}`);

        try {
            const domain = window.location.origin || "";
            const res = await axios.post(`${domain}/api/scrape`, {
                url: url,
            });
            setProduct(res.data);
        } catch (error) {
            console.error("Failed to scrape data:", error);
            alert("Failed to scrape product details!");
        }
        setLoading(false);
    };

    const formatProductInfo = (infoString: string) => {
        const lines = infoString.split("\n");
        const parsedInfo = lines.flatMap((line) =>
            line
                .split(/\s{2,}/)
                .map((part) => part.trim())
                .filter(Boolean)
        );

        const result: { label: string; value: string }[] = [];
        for (let i = 0; i < parsedInfo.length; i += 2) {
            result.push({
                label: parsedInfo[i],
                value: parsedInfo[i + 1] || "",
            });
        }

        return result.length > 0 ? (
            result.map((line, idx) => (
                <div key={idx} className="flex justify-between border-b py-1">
                    <span className="font-medium w-1/3">
                        {line.label.trim()}:
                    </span>
                    <span className="w-2/3 pl-1">{line.value.trim()}</span>
                </div>
            ))
        ) : (
            <p>No data available</p>
        );
    };

    return (
        <div
            className={`p-6 min-h-screen ${
                darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
        >
            <button
                className="mb-4 p-2 rounded border border-gray-500 hover:bg-gray-700 hover:text-white"
                onClick={() => setDarkMode(!darkMode)}
            >
                Toggle {darkMode ? "Light" : "Dark"} Mode
            </button>
            <h1 className="text-2xl font-bold mb-4">
                Amazon India Product Scraper
            </h1>
            <input
                type="text"
                className={`p-2 border rounded w-full ${
                    darkMode
                        ? "bg-gray-800 text-white"
                        : "bg-gray-100 text-black"
                }`}
                placeholder="Enter Amazon India Product URL"
                onChange={(e) => setUrl(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white p-2 mt-2 rounded cursor-pointer hover:bg-blue-600 disabled:bg-gray-400"
                disabled={loading}
                onClick={handleScrape}
            >
                {loading ? "Scraping..." : "Scrape Data"}
            </button>

            {product && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">
                        {product.productName}
                    </h2>
                    <p>Price: ₹{product.price}</p>
                    <p>Rating: {product.rating}</p>
                    <p>{product.numRatings}</p>
                    <p>Discount: {product.discount}</p>
                    <div>
                        <h3 className="font-semibold mt-2">Offers:</h3>
                        {product.bankOffers && product.bankOffers.length > 0
                            ? product.bankOffers.map((t, i) => (
                                  <p key={i}>
                                      <strong>{t.title}</strong>:{" "}
                                      {t.description}{" "}
                                      {t.offerCount &&
                                          `(${t.offerCount} offers)`}
                                  </p>
                              ))
                            : "Not available"}
                    </div>

                    <h3 className="font-semibold mt-2">About this item:</h3>
                    <p>{product.aboutItem}</p>

                    <div className="p-4 border rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2">
                            Product Information
                        </h3>
                        {product.productInfo ? (
                            formatProductInfo(product.productInfo)
                        ) : (
                            <p>No product information available.</p>
                        )}
                    </div>

                    <h3 className="font-semibold mt-2">Images:</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {product.productImg?.map((imgUrl, idx) => (
                            <img key={idx} src={imgUrl} className="w-full" />
                        ))}
                    </div>

                    <h3 className="font-semibold mt-2">Manufacturer Images:</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {product.manufacturerImg.map((imgUrl, idx) => (
                            <img key={idx} src={imgUrl} className="w-full" />
                        ))}
                    </div>

                    <h3 className="font-semibold mt-2">AI Review Summary:</h3>
                    <div>
                        {product.reviews ? (
                            <ReviewSummary reviewArray={product.reviews} />
                        ) : (
                            "No summary"
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
