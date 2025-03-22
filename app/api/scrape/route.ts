import { NextRequest, NextResponse } from "next/server";
import { scraper } from "@/lib/scraper";

export async function POST(request: NextRequest) {
    const reqBody = await request.json(); //{url:"amazon.in/"}
    const url: string = reqBody.url;

    const response = await scraper(url);

    return response;
}
