import { NextResponse } from "next/server";
import { scrapeAmazon } from "./scrapeAmazon";

export async function scraper(url: string) {
    try {
        if (!url)
            return NextResponse.json(
                { message: "url not sent" },
                { status: 500 }
            );
        const response = await scrapeAmazon(url);
        return response;
    } catch (error) {
        console.error("Error at /lib/scraper:, ", error);
        return NextResponse.json(
            { message: "Request Failed" },
            { status: 402 }
        );
    }
}
