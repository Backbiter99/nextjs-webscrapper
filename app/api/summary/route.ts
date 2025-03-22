import axios from "axios";

export async function POST(req: Request) {
    try {
        const { reviews } = await req.json();

        const apiKey = process.env.HUGGINGFACE_API_KEY || "";

        const response = await axios.post(
            "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
            {
                inputs: reviews.join(" "),
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const summary =
            response.data[0]?.summary_text || "No summary generated.";

        return Response.json({ summary });
    } catch (error) {
        console.error("Error:", error);
        return Response.json(
            { error: "Failed to generate summary." },
            { status: 500 }
        );
    }
}
