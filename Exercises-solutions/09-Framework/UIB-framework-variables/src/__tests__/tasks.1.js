const puppeteer = require("puppeteer");
const path = require('path');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

let browser;
let page;

beforeAll(async () => {
    await exec('npm run build-for-test:styles');
    browser = await puppeteer.launch({ headless: true })
    page = await browser.newPage();
    await page.goto('file://' + path.resolve('./src/index.html'));
}, 30000);

afterAll((done) => {
    try {
        this.puppeteer.close();
    } catch (e) { }
    done();
});

describe('Sass', () => {
    it("SCSS should be compiled into CSS in the file `/src/styles/main.css`", async () => {
        const cssStylesheet = fs
            .readFileSync(path.resolve('./src/styles/main.css'))
            .toString("utf-8");
        expect(cssStylesheet).toContain("images/mountain");
    });
});

describe('Navigation', () => {
    it("Link tags in `nav` should use the text color `#016690`", async () => {
        const nav = await page.$eval('nav a', el => getComputedStyle(el).color);
        expect(nav).toBe('rgb(14, 116, 158)');
    });
});

describe('Cards', () => {
    it("`.card` should have background color `#e0ddb2`", async () => {
        const cards = await page.$eval('.card', el => getComputedStyle(el).backgroundColor);
        expect(cards).toBe('rgb(224, 221, 178)');
    });
});
describe('Cards and aside', () => {
    it("`.card` should have border color `#dad6ab`", async () => {
        const cardsAndAside = await page.$eval('.card', el => getComputedStyle(el).border);
        expect(cardsAndAside).toMatch(/rgb\(224, 221, 178\)/);
    });
    it("`aside` should have border color `#dad6ab`", async () => {
        const cardsAndAside = await page.$eval('aside', el => getComputedStyle(el).border);
        expect(cardsAndAside).toMatch(/rgb\(224, 221, 178\)/);
    });
});

describe('Images', () => {
    it("Page should use the background images provided in the `src/images` folder", async () => {
        const images = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('background-image')));
        expect(images.some(e => e.match(/images\/mountain/))).toBe(true);
    });
});

describe('Responsivity', () => {
    it("On 768px Breakpoint and and above `.card` should have its `width` property set to `80%`", async () => {
        await page.setViewport({
            width: 780,
            height: 1024
        });
        const cards = await page.$eval('.card', el => getComputedStyle(el).width);
        expect(cards).toBe('624px');
    });
    it("On 1025px Breakpoint and and above `.cards` container should have its `justify-content` property set to `center`", async () => {
        await page.setViewport({
            width: 1030,
            height: 1024
        });
        const cards = await page.$eval('.cards', el => getComputedStyle(el).justifyContent);
        expect(cards).toMatch(/center/);
    });
});
