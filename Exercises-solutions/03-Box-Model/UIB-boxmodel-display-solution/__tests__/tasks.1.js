const puppeteer = require("puppeteer");
const path = require("path");

const browserOptions = {
  headless: true,
  ignoreHTTPSErrors: true,
};
let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch(browserOptions);
  page = await browser.newPage();
  await page.goto("file://" + path.resolve("./index.html"));
}, 30000);

afterAll((done) => {
  try {
    this.puppeteer.close();
  } catch (e) { }
  done();
});

describe("Linked style sheet", () => {
  it("CSS stylesheet should be linked correctly", async () => {
    const stylesheet = await page.$("link[rel='stylesheet']");
    expect(stylesheet).toBeTruthy();
    const stylesheetLength = await stylesheet.evaluate((el) => el.href.length);
    expect(stylesheetLength).toBeGreaterThan(0);
  });
});

describe("1. Fixme 1", () => {
  it("Image in the div `fixme1` should be displayed `block`", async () => {
    const imgDisplay = await page.$eval(".fixme1 img", (el) => getComputedStyle(el).display);
    expect(imgDisplay).toBe("block");
  });
})

describe("2. Fixme 2", () => {
  it("Image in the class of `fixme2` `div` should be of display `inline`", async () => {
    const imgDisplay = await page.$eval(".fixme2 div", (el) => getComputedStyle(el).display);
    expect(imgDisplay).toBe("inline");
  });
})

describe("3. Inline list items", () => {
  it("List items on Page should be displayed `inline-block`", async () => {
    const listItems = await page.$$("li");
    for (let i = 0; i < listItems.length; i++) {
      const listItemDisplay = await listItems[i].evaluate((el) => getComputedStyle(el).display);
      expect(listItemDisplay).toBe("inline-block");
    }
  });
})