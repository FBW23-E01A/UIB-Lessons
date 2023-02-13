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

describe("Html structure", () => {
    it("`index.html` file should contain appropriate meta tags", async () => {
        const metaTags = await page.$$('meta');
        expect(metaTags.length).toBeGreaterThan(1);
    });
    it("`index.html` file Should contain a title tag that is not empty", async () => {
        const title = await page.$eval('title', el => el.innerHTML);
        expect(title).toBeTruthy()
    });
    it("Semantic HTML tags should be used, i.e section, article, header, footer", async () => {
        const section = await page.$eval('section', el => el.tagName);
        const article = await page.$eval('article', el => el.tagName);
        const header = await page.$eval('header', el => el.tagName);
        const footer = await page.$eval('footer', el => el.tagName);
        expect(section).toBeTruthy();
        expect(article).toBeTruthy();
        expect(header).toBeTruthy();
        expect(footer).toBeTruthy();
    });
});

describe("CSS Reset", () => {
    it("CSS Reset rules should be applied to the page", async () => {
        const box = await page.$eval('*', el => getComputedStyle(el).boxSizing);
        const margin = await page.$eval('*', el => getComputedStyle(el).margin);
        expect(box).toBe('border-box');
        expect(margin).toBe('0px');
    })
});

describe("Styling", () => {
    it("`padding` and `margin` should be used on the page", async () => {
        const padding = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('padding')));
        const margin = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('margin')));
        expect(padding.some(p => p !== '0px')).toBeTruthy();
        expect(margin.some(m => m !== '0px')).toBeTruthy();
    });
});

describe('Background images', () => {
    it("Banner image inside the header tag should be set as a `background image` using css", async () => {
        const headerImage = await page.$$eval('img[src*="header.jpg"]', el => el.length);
        const bgProperty = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('background-image')));
        expect(headerImage).toBe(0);
        expect(bgProperty).toEqual(expect.arrayContaining([expect.stringContaining('header.jpg')]));
    });
});

describe("Contact Page", () => {
    it("The 'Drop me a line' link Should redirect to `contact.html` page", async () => {
        const targetBlank = await page.$eval('a[href="contact.html"]', el => el.hasAttribute('target'));
        if (targetBlank === true) {
            const [newPage] = await Promise.all([
                new Promise(x => browser.once('targetcreated', target => x(target.page()))),
                page.click('a[href="contact.html"]'),
            ]);
            const url = await newPage.url();
            expect(url).toMatch(/contact.html/);
        } else {
            const [samePage] = await Promise.all([
                page.waitForNavigation(),
                page.click('a[href="contact.html"]'),
            ]);
            const url = await samePage.url();
            expect(url).toMatch(/contact.html/);
        }
    });
    it("Contact Page Should contain a 'go back' link to index.html", async () => {
        await page.goto('file://' + path.resolve('./contact.html'));
        const targetBlank = await page.$eval('a[href="index.html"]', el => el.hasAttribute('target'));
        if (targetBlank === true) {
            const [newPage] = await Promise.all([
                new Promise(x => browser.once('targetcreated', target => x(target.page()))),
                page.click('a[href="index.html"]'),
            ]);
            const url = await newPage.url();
            expect(url).toMatch(/index.html/);
        } else {
            const [samePage] = await Promise.all([
                page.waitForNavigation(),
                page.click('a[href="index.html"]'),
            ]);
            const url = await samePage.url();
            expect(url).toMatch(/index.html/);
        }
    });
    it("Contact page exists", async () => {
        await page.goto('file://' + path.resolve('./contact.html'));
        expect(page.url()).toBe('file://' + path.resolve('./contact.html'));
        const body = await page.$eval('body', el => el.innerHTML);
        expect(body).toBeTruthy();
    });
});