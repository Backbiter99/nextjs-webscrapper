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

export async function extractDynamicInfo(url: string) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(url, { waitUntil: "networkidle2" });

        const imageUrl = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("img")).map(
                (img) => img.src
            );
        });

        const manufacturerImg = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("#aplus img")).map(
                (img) => (img as HTMLImageElement).src
            );
        });

        await browser.close();

        return { imageUrl, manufacturerImg };
    } catch (error) {
        console.error("Error while extracting dynamic info: ", error);

        return null;
    }
}
