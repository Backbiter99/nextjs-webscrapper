import * as cheerio from "cheerio";

export function extractInfo(...elements: any) {
    for (let index = 0; index < elements.length; index++) {
        const element = elements[index].text().trim();

        if (element) {
            return element;
        }
    }

    return {};
}
