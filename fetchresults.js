const puppeteer = require('puppeteer');
const fs = require('fs');
const RESULTS_ID = "comp-kvwl551f3";
const TAHASH_RESULTS_URL = "https://tuvistone.wixsite.com/website/%D7%AA%D7%95%D7%A6%D7%90%D7%95%D7%AA/";
const SCORES_FILE_PATH = "results.json";

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto(TAHASH_RESULTS_URL);
    
    // Find results element
    const results = await page.evaluate((ID) => {
        const parent = document.querySelector(`#${ID}`);
        console.log(parent);
        
        let output = [];

        const results_collection = parent.children;
        for (let i = 0; i < results_collection.length; i++) {
            const child = results_collection[i];
            const inner = child.innerText.trimStart();
            console.log({ event_scores: inner });
            output.push(inner);
        }

        return output;
    }, RESULTS_ID);

    console.log(results);
    fs.writeFileSync(SCORES_FILE_PATH, JSON.stringify(results), "utf8");

    await browser.close();
})();