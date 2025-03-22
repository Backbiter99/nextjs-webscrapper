import React, { useState } from "react";
import axios from "axios";

interface ProductInfoProps {
    productInfo: string;
}

export function DisplayProductInfo({ productInfo }: ProductInfoProps) {
    const [infoString, setInfoString] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function fetchProductInfo() {
        try {
            setIsLoading(true);
            setError(null);

            const domain = process.env.DOMAIN || "";
            const response = await axios.post(`${domain}/api/productInfo`, {
                productInfoString: productInfo,
            });

            const productInfoString = response.data.data;
            setInfoString(productInfoString);
            console.log("Product info parsed successfully:", productInfoString);
        } catch (err) {
            console.error("Error parsing product info:", err);
            setError("Failed to parse product information. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <div className="mb-4 flex items-center gap-4">
                <button
                    onClick={fetchProductInfo}
                    disabled={isLoading || !productInfo}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Processing..." : "Parse Product Info"}
                </button>

                {error && <div className="text-red-500">{error}</div>}
            </div>

            {infoString ? (
                <div className="mt-6 border rounded-lg p-4 bg-gray-50">
                    <h2 className="text-xl font-semibold mb-2">
                        Product Information
                    </h2>
                    <pre className="text-gray-700 whitespace-pre-wrap">
                        {infoString}
                    </pre>
                </div>
            ) : (
                <div className="text-gray-500 p-4 border rounded-lg bg-gray-50">
                    Click the "Parse Product Info" button to analyze the product
                    data.
                </div>
            )}
        </div>
    );
}
