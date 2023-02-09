const puppeteer = require("puppeteer");
const path = require('path');

const browserOptions = {
    headless: true,
    ignoreHTTPSErrors: true,
    defaultViewport: null,
    devtools: false,
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
    } catch (e) 
    {} 
    done();
});

describe("Text styling", () => {
    it("Body should have a custom text color", async () => {
        const bodyColor = await page.$eval('body', el => getComputedStyle(el).color);
        expect(bodyColor).not.toBe('rgb(0, 0, 0)');
    });

    it("Body should have a custom font, including a fallback", async () => {
        const bodyFontFamily = await page.$eval('body', el => getComputedStyle(el).fontFamily);
        expect(bodyFontFamily.split(',').length).toBeGreaterThan(2);
    });

    it("H1 tag should be 3x(times) the size of the base font-size", async () => {
        const h1FontSize = await page.$eval('h1', el => getComputedStyle(el).fontSize);
        expect(parseInt(h1FontSize)).toBeGreaterThan(2 * parseInt(await page.$eval('body', el => getComputedStyle(el).fontSize))); // results in 48px which is 3em    
    });

    it("H3 tag should be 1.5x(times) the size of the base font-size", async () => {
        const h3FontSize = await page.$eval('h3', el => getComputedStyle(el).fontSize);
        expect(parseInt(h3FontSize)).toBeGreaterThan(1.4 * parseInt(await page.$eval('body', el => getComputedStyle(el).fontSize))); // results in 24px which is 1.5em
    });
    it("The Blockquote element should be italic", async () => {
        const blockquoteStyle = await page.$eval('blockquote', el => getComputedStyle(el).fontStyle);
        expect(blockquoteStyle).toBe('italic');
    });

    it("The `span` element should be striked through", async () => {
        const spanStyle = await page.$eval('span', el => getComputedStyle(el).textDecoration);
        expect(spanStyle).toContain('line-through');
    });

    it("The text inside the em tags should start with capital letters", async () => {
        const emCapitalize = await page.$eval('em', el => getComputedStyle(el).textTransform);
        expect(emCapitalize).toBe('capitalize');

    });

    it("The `strong` element Should be capitalized and bold", async () => {
        const bold = await page.$eval('strong', el => getComputedStyle(el).fontWeight);
        const upperCase = await page.$eval('strong', el => getComputedStyle(el).textTransform);
        expect(bold).toBe('700');
        expect(upperCase).toBe('uppercase');
    });

    it("The link tag's color should be changed and it should not be underlined", async () => {
        const anchorColor = await page.$eval('a', el => getComputedStyle(el).color);
        const anchorUnderline = await page.$eval('a', el => getComputedStyle(el).textDecoration);
        expect(anchorColor).not.toBe('rgb(0, 0, 238)'); // default blue
        expect(anchorUnderline).not.toBe('underline');

    })

});