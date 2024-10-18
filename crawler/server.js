const puppeteer = require("puppeteer");
const fs = require("fs");
(async () => {
  const browser = await puppeteer.launch({ headless: false }); // Đặt headless thành false để thấy quá trình
  const page = await browser.newPage();

  const allProducts = [];

  // Truy cập trang web và lặp qua các trang
  for (let i = 1; i <= 10; i++) {
    await page.goto(`https://www.thegioididong.com/dtdd#c=42&o=13&pi=${i}`, {
      waitUntil: "networkidle2",
    });

    // Đợi để trang tải đầy đủ sản phẩm (nếu có lazy loading, có thể cần thời gian chờ)

    // Crawl dữ liệu sản phẩm sau khi trang đã tải đầy đủ
    const products = await page.evaluate(() => {
      const productList = [];
      const productElements = document.querySelectorAll(".item"); // Chọn tất cả các sản phẩm trên trang

      productElements.forEach((product) => {
        const name = product.querySelector("h3")?.innerText || "N/A"; // Lấy tên sản phẩm
        const price =
          product.querySelector(".price strong")?.innerText || "N/A"; // Lấy giá sản phẩm
        const imageUrl =
          product.querySelector("img")?.getAttribute("src") || "N/A"; // Lấy URL ảnh
        const ref = product.querySelector("a")?.getAttribute("href") || "N/A"; // Lấy URL ảnh
        productList.push({
          name,
          price,
          imageUrl,
          ref,
        });
      });

      return productList;
    });

    // Kết hợp sản phẩm từ trang hiện tại vào danh sách tất cả sản phẩm
    allProducts.push(...products);
  }

  // In kết quả ra console
  console.log(allProducts);
  //   fs.writeFileSync("data.json", JSON.stringify(allProducts, null, 2));
  // Đóng trình duyệt sau khi hoàn thành
  await browser.close();
})();
