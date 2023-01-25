const puppeteer = require("puppeteer");
const path = require('path');
const browserOptions = {
    headless: true,
    ignoreHTTPSErrors: true,
}

let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch(browserOptions);
    page = await browser.newPage();
    await page.goto('file://' + path.resolve('./index.html'));
}, 30000);

afterAll((done) => {
    try {
        this.puppeteer.close();
    } catch (e) { }
    done();
});

describe("IDs and Classes", () => {
    it("`id` attribute is used in the HTML", async () => {
        const idList = await page.evaluate(() => {
            const idList = [];
            const idElements = document.querySelectorAll('[id]');
            for (let i = 0; i < idElements.length; i++) {
                idList.push(idElements[i].id);
            }
            return idList;
        });
        
        expect(idList).toBeTruthy();
    });
    it("`class` attribute is used in the HTML", async () => {
        const classList = await page.evaluate(() => {
            const classList = [];
            const classElements = document.querySelectorAll('[class]');
            for (let i = 0; i < classElements.length; i++) {
                classList.push(classElements[i].className);
            }
            return classList;
        });
        expect(classList).toBeTruthy();
    });
});

describe('Styling', () => {
    it("Blue text color is applied using `id` selector", async () => {
        const idColor = await page.$$eval('[id]', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('color')));
        expect(idColor).toContain('rgb(0, 0, 255)');
    });
    it("Blue text color is applied using `class` selector", async () => {
        const classColor = await page.$$eval('[class]', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('color')));
        expect(classColor).toContain('rgb(0, 0, 255)');
    });
})
