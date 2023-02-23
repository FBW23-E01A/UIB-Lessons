const puppeteer = require("puppeteer");
const path = require('path');
const { expect } = require("@jest/globals");
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

describe('Markup', () => {
    it('Page should have a title', async () => {
        const title = await page.title();
        expect(title).not.toBe('');
    });
    it('Page header is defined as `header` element', async () => {
        const header = await page.$('header');
        expect(header).toBeTruthy();
    });
    it('The header should be fixed at the top of the page', async () => {
        const positions = await page.$$eval('*', els => els.map(el => getComputedStyle(el).position));
        expect(positions).toContain('fixed');
    });
    it('Page should have a `nav` for navigation', async () => {
        const nav = await page.$('nav');
        expect(nav).toBeTruthy()
    });
    it('Navigation should contain links', async () => {
        const navLinks = await page.$$eval('nav a', e => e.map(a => a.innerHTML));
        // should be more then 2 links
        expect(navLinks.length).toBeGreaterThan(2);
    });
    it('Navigation items should have hover effect', async () => {
        // set viewport to desktop
        await page.setViewport({ width: 1280, height: 720 });
        // get default style
        const defaultStyle = await page.evaluate(() => {
            return window.getComputedStyle(document.querySelector('nav a:nth-child(1)')).borderBottom;
        });
        //await page.waitForTimeout(1000);
        // wait for the first link to be hovered
        await page.hover('nav a:nth-child(1)');
        // get the style of the first link after hovering
        const navLinkStyle = await page.evaluate(() => {
            return window.getComputedStyle(document.querySelector('nav a:nth-child(1)')).borderBottom ;
        });
        // change style to string
        const defaultStyleString = JSON.stringify(defaultStyle).replace(/(\r\n|\n|\r|\\|\,|\"|\ )/gm," ");
        const navLinkStyleString = JSON.stringify(navLinkStyle).replace(/(\r\n|\n|\r|\\|\,|\"|\ )/gm," ");
        // expect the style to be changed
        expect(defaultStyleString).not.toBe(navLinkStyleString);
    })
});
describe('Layout and Responsiveness', () => {
    let flexContainerCount

    it('On desktop screen, the first products should be aranged in three columns', async () => {
        // set viewport to desktop
        await page.setViewport({ width: 1280, height: 720 });

        const threeColumnLayouts = await page.$$eval('*', els => els.filter(el => {
            const styles = getComputedStyle(el)
            if(styles.display != 'flex' || styles.flexDirection != 'row' || el.children.length < 3) return false
            return el.children[0].offsetTop == el.children[1].offsetTop && el.children[0].offsetTop == el.children[2].offsetTop
        }));

        flexContainerCount = threeColumnLayouts.length

        expect(threeColumnLayouts.length).toBeGreaterThan(0)
    })
    it('On mobile screen, the products should be arranged in a single column', async () => {
        // set viewport to mobile
        await page.setViewport({ width: 300, height: 480 });

        const threeColumnLayouts = await page.$$eval('*', els => els.filter(el => {
            const styles = getComputedStyle(el)
            if(styles.display != 'flex' || styles.flexDirection != 'row' || el.children.length < 3) return false
            return el.children[0].offsetTop == el.children[1].offsetTop && el.children[0].offsetTop == el.children[2].offsetTop
        }));

        expect(threeColumnLayouts.length).toBeLessThan(flexContainerCount)
    });
    it('Page should not have horizontal overflow on mobile devices', async () => {
        // set viewport to mobile
        await page.setViewport({ width: 320, height: 480 });
        // try to scroll horizontally
        await page.evaluate(() => {
            window.scrollBy(100, 0);
        });
        // get the scroll position
        const scrollPosition = await page.evaluate(() => {
            return window.scrollY;
        });
        // expect the scroll position to be 0
        expect(scrollPosition).toBe(0);

    })
})

