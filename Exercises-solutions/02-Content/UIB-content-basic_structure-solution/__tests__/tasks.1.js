const fs = require("fs");
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

describe("Excersie I", () => {
    
    test('index.html file should exist', () => {
        expect(fs.existsSync(path.join(__dirname, '../index.html'))).toBeTruthy();
    });
    test("`index.html` should have `charset` meta tag set to `utf-8`", async () => {
        const metaElement = await page.$('meta[charset]')
        const charset = await page.$eval('meta[charset]', el => el.getAttribute('charset'))
        expect(metaElement).toBeTruthy()
        expect(charset).toMatch(/utf-8/i);
    });
    test("`index.html` should have `author` meta tag containing author name", async () => {
        const metaElement = await page.$('meta[name="author"]')
        const author = await page.$eval('meta[name="author"]', el => el.getAttribute('content'))
        expect(metaElement).toBeTruthy()
        expect(author).toBeTruthy()
    });
    test("`index.html` should have `title` meta tag", async () => {
        const metaElement = await page.$('title')
        const title = await page.$eval('title', el => el.innerText)
        expect(metaElement).toBeTruthy()
        expect(title).toBeTruthy()
    });
    test("`index.html` should have `body` element", async () => {
        const fileContent = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf-8')
        expect(fileContent).toMatch(/<body/i)
    });
    test("`index.html` should have `lang` attribute set with valid value", async () => {
        const lang = await page.$eval('html', el => el.getAttribute('lang'))
        expect(lang).toBeTruthy()
    });
});
describe('Exercise II`', () => {
    test('Appropriate heading tags should be used', async () => {
        const htmlElement = await page.$eval('h1', el => el.innerText);
        expect(htmlElement).toBeTruthy();
        const htmlElement2 = await page.$eval('h2', el => el.innerText);
        expect(htmlElement2).toBeTruthy();
        const htmlElement3 = await page.$eval('h3', el => el.innerText);
        expect(htmlElement3).toBeTruthy();
    });
});
describe('Exercise III', () => {
    test('Each heading should contain additional info that is displayed on hover', async () => {
        const headings = await page.$$('h1, h2, h3')
        headings.forEach(async h => {
            expect(await page.evaluate(el => el.getAttribute('title'), h)).toBeTruthy()
        })
    })
})
describe('Exercise IV', () => {
    test('Document should contain brief comments about each HTML tag', async () => {
        const comments = await page.evaluate(() => {
            const findComments = (el) => {
                const arr = [];
                for (let i = 0; i < el.childNodes.length; i++) {
                    const node = el.childNodes[i];
                    if (node.nodeType === 8) {
                        arr.push(node);
                    } else {
                        arr.push.apply(arr, findComments(node));
                    }
                }
                return arr;
            };
            return findComments(document.body)
        })
        expect(comments.length).toBeGreaterThanOrEqual(4);
    });
});

describe('Exercise V', () => {
    test('Each heading should be followed by a paragraph', async () => {
        const afterH1 = await page.$eval('h1', el => el.nextElementSibling.tagName.toUpperCase())
        expect(afterH1).toBe('P');
        const afterH2 = await page.$eval('h2', el => el.nextElementSibling.tagName.toUpperCase())
        expect(afterH1).toBe('P');
        const afterH3 = await page.$eval('h3', el => el.nextElementSibling.tagName.toUpperCase())
        expect(afterH1).toBe('P');
    });
});

describe('Exercise VI', () => {
    test('Document should contain a `pre` tag with provided text content', async () => {
        const pre = await page.$eval('pre', el => el.innerText)
        const logoText = fs.readFileSync(path.join(__dirname, '../assets/logo.txt'), 'utf8');
        expect(pre.replace(/\s/g, "")).toMatch(logoText.replace(/\s/g, ""));
    });
});