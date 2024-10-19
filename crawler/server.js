const puppeteer = require("puppeteer");
const fs = require("fs");

const key = "man-hinh";

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const connect = await page.goto(`https://fptshop.com.vn/${key}`, {
      waitUntil: "networkidle2",
    });

    connect ? console.log("Connected") : console.log("Not connected");

    const getProducts = await page.evaluate(() => {
      const products = document.querySelectorAll(
        ".ProductCard_cardDefault__km9c5"
      );

      const productArray = [];

      products.forEach((product) => {
        const productObj = {
          name: product.querySelector(".ProductCard_cardTitle__HlwIo")
            .innerText,
          price: parseInt(
            product
              .querySelector(".Price_currentPrice__PBYcv")
              .innerText.replace(/\D/g, "")
          ),
          thumbnail: product.querySelector("img").src,
          images: product.querySelector("img").src,
        };

        productArray.push(productObj);
      });
      return productArray;
    });

    fs.writeFileSync(`${key}.json`, JSON.stringify(getProducts, null, 2));
  } catch (error) {
    console.error("Error:", error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();
