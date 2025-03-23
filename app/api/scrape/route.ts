import { NextRequest, NextResponse } from "next/server";
import { scraper } from "@/lib/scraper";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json(); //{url:"amazon.in/"}
        const url: string = reqBody.url;

        const response = await scraper(url);

        return response;
    } catch (error) {
        console.error("Error at /api/scrape:, ", error);
        return NextResponse.json(
            { message: "Request Failed" },
            { status: 401 }
        );
    }
}
