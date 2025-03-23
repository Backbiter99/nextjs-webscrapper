import { log } from "console";
import puppeteer from "puppeteer";

export function extractInfo(...elements: any) {
    for (let index = 0; index < elements.length; index++) {
        const element = elements[index].text().trim();

        if (element) {
            return element;
        }
    }

    return {};
}

// export async function extractDynamicInfo(url: string) {
//     try {
//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();

//         await page.goto(url, { waitUntil: "networkidle2" });

//         // const imageUrl = await page.evaluate(() => {
//         //     return Array.from(document.querySelectorAll("img")).map(
//         //         (img) => img.src
//         //     );
//         // });

//         const imageUrl = await page.evaluate(() => {
//             return Array.from(document.querySelectorAll("img"))
//                 .filter((img) => img.src.includes("m.media-amazon.com/images/"))
//                 .map((img) => img.src);
//         });

//         // const imageUrl = await page.$$eval("img.a-button-text", (imgs) =>
//         //     imgs.map(
//         //         (img) =>
//         //             img.getAttribute("data-lazyimage") ||
//         //             img.getAttribute("src")
//         //     )
//         // );

//         const manufacturerImg = await page.evaluate(() => {
//             return Array.from(document.querySelectorAll("#aplus img")).map(
//                 (img) => (img as HTMLImageElement).src
//             );
//         });

//         const reviews = await page.evaluate(() => {
//             return Array.from(document.querySelectorAll(".review-text-content"))
//                 .map((el) => el.textContent?.trim())
//                 .filter(Boolean);
//         });

//         await browser.close();

//         console.log(
//             `imageUrl: ${imageUrl} , manufacturer: ${manufacturerImg}, reviews: ${reviews}`
//         );

//         return { imageUrl, manufacturerImg, reviews };
//     } catch (error) {
//         console.error("Error while extracting dynamic info: ", error);

//         return null;
//     }
// }

// scraper.ts

export async function extractDynamicInfo(url: string) {
    try {
        // Launch browser with anti-bot settings
        const browser = await puppeteer.launch();

        const page = await browser.newPage();

        // Set user agent to mimic a real browser
        await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        );

        // Navigate to the page and ensure content loads
        await page.goto(url, { waitUntil: "domcontentloaded" });

        // Wait for key elements to ensure content is fully loaded
        await page.waitForSelector("#productTitle");

        // Extract reviews
        const reviews = await page.evaluate(() => {
            return Array.from(document.querySelectorAll(".review-text-content"))
                .map((el) => el.textContent?.trim())
                .filter(Boolean);
        });

        // Extract product images (handling lazy loading)
        const productImg = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("img"))
                .map(
                    (img) =>
                        img.getAttribute("data-src") || img.getAttribute("src")
                )
                .filter(
                    (src) =>
                        src &&
                        src.includes("m.media-amazon.com/images/") &&
                        !src.includes("sprite")
                );
        });

        // Extract manufacturer images from A+ content (if present)
        const manufacturerImg = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("#aplus img")).map(
                (img) => (img as HTMLImageElement).src
            );
        });

        // Close the browser
        await browser.close();

        // Return all data as an object
        return {
            reviews,
            productImg,
            manufacturerImg,
        };
    } catch (error) {
        console.error("Error while extracting dynamic info: ", error);
        return null;
    }
}
