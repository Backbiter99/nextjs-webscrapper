"use client";

import axios from "axios";
import { log } from "console";
import { useEffect, useRef, useState } from "react";

interface IProduct {
    productName: string;
    rating: string;
    numRatings: string;
    price: string;
    discount: string;
    bankOffers: string;
    aboutItem: string;
    productInfo: string;
    productImg?: string[];
    manufacturerImg: string[];
    reviewSummary?: string;
}

export default function Home() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState<IProduct>();

    const handleScrape = async () => {
        setLoading(true);

        console.log(`url: ${url}`);

        try {
            const res = await axios.post(`http://localhost:3000/api/scrape`, {
                url: url,
            });
            setProduct(res.data);
        } catch (error) {
            console.error("Failed to scrape data:", error);
            alert("Failed to scrape product details!");
        }
        setLoading(false);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                Amazon India Product Scraper
            </h1>
            <input
                type="text"
                className="p-2 border rounded w-full"
                placeholder="Enter Amazon India Product URL"
                onChange={(e) => setUrl(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white p-2 mt-2 rounded cursor-pointer"
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
                    <p>Offers: {product.bankOffers}</p>
                    <h3 className="font-semibold mt-2">About this item:</h3>
                    <p>{product.aboutItem}</p>

                    {/* <h3 className="font-semibold mt-2">Product Information:</h3>
                    <ul>
                        {Object.entries(product.productInfo).map(
                            ([key, value]) => (
                                <li key={key}>
                                    <strong>{key}:</strong> {value}
                                </li>
                            )
                        )}
                    </ul> */}

                    <h3 className="font-semibold mt-2">Images:</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {product.productImg &&
                            product.productImg.map(
                                (imgUrl: string, idx: number) => (
                                    <img
                                        key={idx}
                                        src={imgUrl}
                                        className="w-full"
                                    />
                                )
                            )}
                    </div>

                    <h3 className="font-semibold mt-2">Manufacturer Images:</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {product.manufacturerImg.map(
                            (imgUrl: string, idx: number) => (
                                <img
                                    key={idx}
                                    src={imgUrl}
                                    className="w-full"
                                />
                            )
                        )}
                    </div>

                    <h3 className="font-semibold mt-2">AI Review Summary:</h3>
                    <p>
                        {product.reviewSummary
                            ? product.reviewSummary
                            : "No summary"}
                    </p>
                </div>
            )}
        </div>
    );
}
