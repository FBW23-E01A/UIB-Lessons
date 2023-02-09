const puppeteer = require("puppeteer");
const path = require('path');

let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto('file://' + path.resolve('./index.html'));
}, 30000);

afterAll((done) => {
    try {
        this.puppeteer.close();
    } catch (e) { }
    done();
});

describe('HTML - Inline elements', () => {
    it("Inline elements should be present on page", async () => {
        const semantic = await page.$('em, strong');
        expect(semantic).toBeTruthy();
    });
});

describe('Navigation Bar', () => {
    it("Page should contain a Navigtion Bar", async () => {
        const nav = await page.$('nav');
        expect(nav).toBeTruthy();
    });
    it("Anchor tags on page should like to corresponding sections", async () => {
        const anchors = await page.$$eval('a', el => Array.from(el).map(a => a.href));
        expect(anchors.some(a => a.includes('#'))).toBeTruthy();
    });
});

describe('Background Image', () => {
    it("Page should contain the provided `background image`", async () => {
        const allBackgroundProperties = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('background-image')));
        expect(allBackgroundProperties.some(e => e.includes('img/bg.jpg'))).toBeTruthy();
    });
});

describe('Links', () => {
    it("Page should link to external resources", async () => {
        const anchors = await page.$$eval('a', el => Array.from(el).map(a => a.href));
        expect(anchors.some(a => a.includes('https://'))).toBeTruthy();
    });

    it("All links on page should change color on hover", async () => {
        const allLinks = await page.$$('a');
        for (let i = 0; i < allLinks.length; i++) {
            const link = allLinks[i];
            const linkColor = await page.evaluate(el => getComputedStyle(el).getPropertyValue('color'), link);
            await link.hover();
            const linkHoverColor = await page.evaluate(el => getComputedStyle(el).getPropertyValue('color'), link);
            const linkText = await page.evaluate(el => el.innerText, link)
            //console.log(linkText, linkColor, linkHoverColor)
            expect(linkColor).not.toBe(linkHoverColor);
        }
    });
});

describe('CSS', () => {
    it("Page should be styled with `line-heigth`, `letter-spacing` css properties", async () => {
        const lineHeight = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('line-height')));
        expect(lineHeight.some(e => e !== 'normal')).toBeTruthy(); // normal is the default value
        const letterSpacing = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('letter-spacing')));
        expect(letterSpacing.some(e => e !== 'normal')).toBeTruthy();
    });
    it("Page should be styled with different `fonts`", async () => {
        const fontFamily = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('font-family')));
        expect(new Set(fontFamily).size).toBeGreaterThan(2);
    });
});
