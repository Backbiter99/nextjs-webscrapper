import axios from "axios";
import { useState } from "react";

export default function ReviewSummary({
    reviewArray,
}: {
    reviewArray: string[];
}) {
    const reviews = reviewArray;
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGenerateSummary = async () => {
        setLoading(true);
        setError("");
        try {
            const domain = process.env.DOMAIN || "";

            const response = await axios.post(`${domain}/api/summary`, {
                reviews,
            });

            setSummary(response.data.summary);
        } catch (err) {
            console.error("Failed to fetch summary:", err);
            setError("Failed to generate summary. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <button
                onClick={handleGenerateSummary}
                disabled={loading}
                className="mt-2 p-2 bg-blue-500 text-white rounded cursor-pointer"
            >
                {loading ? "Generating..." : "Generate Summary"}
            </button>

            {summary && (
                <div className="mt-4 p-2 border rounded">{summary}</div>
            )}
            {error && <div className="mt-4 text-red-500">{error}</div>}
        </div>
    );
}
