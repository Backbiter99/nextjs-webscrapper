import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const productInfoString = reqBody.productInfo;

        if (!productInfoString) {
            return NextResponse.json(
                { error: "Product info string is required." },
                { status: 400 }
            );
        }

        // New prompt for a clean, formatted display output
        const prompt = `Task: Format the following product information string into a clean, human-readable text block for display.

Input:
"""
${productInfoString}
"""

Instructions:
- Extract all key-value pairs from the input.
- Format each pair as: "Key: Value"
- Return the final output as a neat, multi-line, readable string — no JSON, markdown, or extra formatting.

Output example:
Brand: Samsung
Model: Galaxy S24
Color: Phantom Black
Storage: 256GB

`;

        // Call the Hugging Face Inference API
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
            {
                inputs: prompt,
                parameters: {
                    max_new_tokens: 200,
                    temperature: 0.1,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        // Ensure response is valid
        if (!response.data || !response.data[0]?.generated_text) {
            return NextResponse.json(
                { error: "Failed to get a valid response from Hugging Face." },
                { status: 500 }
            );
        }

        // Extract the result and clean up
        const formattedText = response.data[0].generated_text.trim();

        return NextResponse.json(
            { success: true, data: formattedText },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error parsing with Hugging Face:", error);

        if (axios.isAxiosError(error)) {
            const statusCode = error.response?.status || 500;
            const errorMessage =
                error.response?.data?.error ||
                "Something went wrong with the API call.";
            return NextResponse.json(
                { error: errorMessage },
                { status: statusCode }
            );
        }

        return NextResponse.json(
            { error: "Internal server error." },
            { status: 500 }
        );
    }
}
