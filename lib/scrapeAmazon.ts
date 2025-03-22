import axios from "axios";
import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { extractDynamicInfo, extractInfo } from "./utils";

export async function scrapeAmazon(url: string) {
    if (!url.includes("amazon.in")) {
        return NextResponse.json({ message: "Incorrect URL" }, { status: 500 });
    }
    try {
        const { data } = await axios.get(url, {
            headers: { "User-Agent": "Mozilla/5.0" },
        });

        const $ = cheerio.load(data);

        const productName = $("#productTitle").text().trim();
        const rating = $("span[data-asin]").attr("aria-label");
        const numRatings = $("#acrCustomerReviewText").text().trim();
        const price = $("span.a-price-whole").first().text().trim();
        const discount = $("span.savingsPercentage").text().trim();
        const bankOffers = $("#promotions_feature_div").text().trim();
        const aboutItem = $("#feature-bullets ul").text().trim();
        let productInfo;
        try {
            const extractProductInfo = extractInfo(
                $("#productDetails_techSpec_section_1")
            );
            productInfo = extractProductInfo;
            // console.log(`productInfo:${productInfo}`);
        } catch (error) {
            console.error("Error while getting productInfo: ", error);
        }

        const dynamicInfo = await extractDynamicInfo(url);
        const productImg = dynamicInfo?.imageUrl;
        const manufacturerImg = dynamicInfo?.manufacturerImg;

        // console.log(`productImg: ${productImg}`);
        console.log(`manufacturerImg: ${manufacturerImg}`);

        return NextResponse.json(
            {
                productName,
                rating,
                numRatings,
                price,
                discount,
                bankOffers,
                aboutItem,
                productInfo,
                productImg,
                manufacturerImg,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "request to amazon failed" },
            { status: 500 }
        );
    }
}
