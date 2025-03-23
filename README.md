Here’s your content neatly formatted in Markdown:

````markdown
# 🛠️ Amazon Scraper Project

This project uses **Puppeteer** to scrape data from Amazon product pages.

---

## 🚀 Getting Started

### 🔧 Step 1: Clone the Repository

```bash
git clone https://github.com/Backbiter99/nextjs-webscrapper.git
cd nextjs-webscraper
```
````

---

### 🔧 Step 2: Install Dependencies

```bash
pnpm install
```

---

### 🔧 Step 3: Set Environment Variables

Create a `.env` file:

```bash
touch .env
```

Add your **Huggingface API Key** to the file:

```
HUGGINGFACE_API_KEY=<YOUR API KEY>
```

👉 Replace `<YOUR API KEY>` with your actual API key.

---

### 🔧 Step 4: Run the Scraper

```bash
pnpm run dev # or node your_main_script.js
```

---

## 🔍 Troubleshooting

### ❗ Chrome Not Found Error

You might encounter an error like this:

```
Error: Could not find Chrome (ver. 134.0.6998.35). This can occur if either
 1. you did not perform an installation before running the script (e.g. `npx puppeteer browsers install chrome`) or
 2. your cache path is incorrectly configured (which is: /home/prajwal/.cache/puppeteer).
For (2), check out our guide on configuring puppeteer at https://pptr.dev/guides/configuration.
    at async extractDynamicInfo (lib/utils.ts:17:24)
    at async scrapeAmazon (lib/scrapeAmazon.ts:35:28)
    at async scraper (lib/scraper.ts:7:21)
    at async POST (app/api/scrape/route.ts:8:21)
  15 | export async function extractDynamicInfo(url: string) {
  16 |     try {
> 17 |         const browser = await puppeteer.launch();
     |                        ^
  18 |         const page = await browser.newPage();
  19 |
  20 |         await page.goto(url, { waitUntil: "networkidle2" });
```

This error means Puppeteer can't find a compatible Chrome browser.

---

### 🛠️ Solutions

#### 🔹 1. Install Chrome for Puppeteer

Run this command to install Chrome:

```bash
npx puppeteer browsers install chrome
```

---

#### 🔹 2. Manual Chrome Install via Puppeteer Script

If the above command fails, try this as a fallback:

```bash
node node_modules/puppeteer/install.mjs
```

---

#### 🔹 3. Check Cache Path

Ensure your cache path is set up correctly.

Refer to the official Puppeteer configuration guide:  
👉 [Puppeteer Configuration Guide](https://pptr.dev/guides/configuration)

---

Happy scraping! 🚀✨
