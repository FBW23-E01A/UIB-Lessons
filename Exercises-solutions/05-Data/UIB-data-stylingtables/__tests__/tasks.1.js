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

describe('Table Structure', () => {
    it("Table tag exists", async () => {
        const table = await page.$('table');
        expect(table).toBeTruthy();
    });
    it("Table Should have 3 columns", async () => {
        const td = await page.$$('table tr:first-child > td, table tr:first-child > th');
        expect(td.length).toBe(3);
    });
    it("Table Should contain rows", async () => {
        const table = await page.$('table');
        const rows = await table.$$('tr');
        expect(rows.length).toBeGreaterThan(4);
    });
});
describe('Table Borders', () => {
    it("table should be styled with #c0c0c0, #cc181b, #449d45 as `border-left` colors", async () => {
        const borderColor = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('border-left')));
        expect(borderColor.some(e => e.match(/rgb\(192, 192, 192\)/))).toBeTruthy();
        expect(borderColor.some(e => e.match(/rgb\(204, 24, 27\)/))).toBeTruthy();
        expect(borderColor.some(e => e.match(/rgb\(68, 157, 69\)/))).toBeTruthy();
    });
}); 
