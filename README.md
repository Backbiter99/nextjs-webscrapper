# Amazon Scraper Project

This project uses Puppeteer to scrape data from Amazon product pages.

## Getting Started

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd <your-project-directory>
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Run the Scraper

```bash
npm run dev # or node your_main_script.js
```

## Troubleshooting

### Chrome Not Found Error

You might encounter the following error or something similar:

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

This error indicates that Puppeteer cannot find a compatible Chrome browser installation.

### Solutions

1. **Install Chrome for Puppeteer**

    Run the following command to download and install a compatible version of Chrome:

    ```bash
    npx puppeteer browsers install chrome
    ```

2. **Manual Install of Chrome using Puppeteer's Install Script**

    In some cases, the above command may fail. As a workaround, navigate to the node_modules directory, and run Puppeteer's install script directly.

    ```bash
    node node_modules/puppeteer/install.mjs
    ```

3. **Check Cache Path**

    If you have a custom cache path, ensure it's correctly configured.

    Refer to the official Puppeteer configuration guide for more information:
    https://pptr.dev/guides/configuration
