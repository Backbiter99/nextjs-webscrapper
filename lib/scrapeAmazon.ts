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
        // const rating = $("span[data-asin]").attr("aria-label");
        const rating =
            $(".a-icon-alt").first().text().trim() || // Standard rating
            $(".averageStarRating span").text().trim() || // Backup rating selector
            "No rating found";
        const numRatings = $("#acrCustomerReviewText").first().text().trim();
        const price = $("span.a-price-whole").first().text().trim();
        const discount = $("span.savingsPercentage").text().trim();
        // const bankOffers = $("#promotions_feature_div").text().trim();
        const offers: {
            title: string;
            description: string;
            offerCount: string;
        }[] = [];

        $(".a-carousel-card").each((_, element) => {
            const title = $(element).find(".offers-items-title").text().trim();
            const description = $(element)
                .find(".a-truncate-full")
                .text()
                .trim();
            const offerCount = $(element)
                .find(".vsx-offers-count")
                .text()
                .trim();

            if (title && description) {
                offers.push({
                    title,
                    description,
                    offerCount,
                });
            }
        });

        const bankOffers = Array.from(offers);
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
        const productImg = dynamicInfo?.productImg;
        const manufacturerImg = dynamicInfo?.manufacturerImg;
        const reviews = dynamicInfo?.reviews;

        // console.log(`productImg: ${productImg}`);
        // console.log(`manufacturerImg: ${manufacturerImg}`);

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
                reviews,
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
