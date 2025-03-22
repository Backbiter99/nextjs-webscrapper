import { NextResponse } from "next/server";
import { scrapeAmazon } from "./scrapeAmazon";

export async function scraper(url: string) {
    if (!url)
        return NextResponse.json({ message: "url not sent" }, { status: 500 });
    const response = await scrapeAmazon(url);
    return response;
}
