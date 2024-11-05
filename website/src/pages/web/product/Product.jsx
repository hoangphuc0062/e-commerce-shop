import { useEffect, useState } from "react";

import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/system";
import { faker } from "@faker-js/faker";

import SimpleSlide from "../../../components/Banner/SliderBanner/SimpleSlide";
import ProductCard from "../../../components/FeatureBlockProduct/Card";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const imgs = [
  {
    title: "Banner-1",
    descrtiption: "This is banner 1",
    link: "url_1",
    src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:595:100/q:80/plain/https://dashboard.cellphones.com.vn/storage/sony-10-vi-cate-6-8-2024.jpg",
  },
  {
    title: "Banner-2",
    descrtiption: "This is banner 2",
    link: "url_1",
    src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:595:100/q:80/plain/https://dashboard.cellphones.com.vn/storage/Itel%20P55-Cate.png",
  },
];

function createRandomProduct() {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    image: faker.image.avatar(),
    price: faker.commerce.price(),
    discountPercent: faker.number.int({ min: 0, max: 50 }),
    description: faker.commerce.productDescription(),
    rating: faker.number.int({ min: 1, max: 5 }),
    review: faker.number.int({ min: 0, max: 1000 }),
    discount: faker.number.int({ min: 0, max: 50 }),
    slug: faker.lorem.slug(),
    images: [faker.image.url(300, 300, "tech", true)],
  };
}
const apiProducts = Array.from({ length: 100 }, createRandomProduct);

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [firstLoading, setfirstLoading] = useState(true);
  const [productPerPage, setProductPerPage] = useState(15);
  const [page, setPage] = useState(1);
  const [sortedProducts, setSortedProducts] = useState(products);
  const [sortCriteria, setSortCriteria] = useState("");
  const [activeButton, setactiveButton] = useState("");
  function loading() {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
        {Array.from({ length: 15 }).map((_, index) => (
          <Box sx={{ pt: 0.5 }} key={index}>
            <Skeleton variant="rectangular" height={300} />
            <Skeleton height={40} />
            <Skeleton width="80%" />
            <Skeleton width="60%" />
          </Box>
        ))}
      </div>
    );
  }

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newProducts = [
        ...products,
        ...apiProducts.slice(
          page * productPerPage,
          (page + 1) * productPerPage
        ),
      ];
      setProducts(newProducts);
      if (sortCriteria) {
        handleSort(sortCriteria);
      }
      setIsLoading(false);
      setPage(page + 1);
    }, 2000);
  };
  const handleSort = (criteria) => {
    setSortCriteria(criteria);
    let sorted = [...products];

    if (criteria === "price-high-low") {
      sorted.sort((a, b) => b.price - a.price);
      setactiveButton(1);
    } else if (criteria === "price-low-high") {
      sorted.sort((a, b) => a.price - b.price);
      setactiveButton(2);
    } else if (criteria === "discount") {
      sorted.sort((a, b) => b.discountPercent - a.discountPercent);
      setactiveButton(3);
    } else if (criteria === "views") {
      setactiveButton(4);
      sorted.sort((a, b) => b.views - a.views); // Assuming products have a 'views' property
    }
    setSortedProducts(sorted);
  };
  useEffect(() => {
    setProducts(apiProducts.slice(0, page * productPerPage));
  }, [page]);

  useEffect(() => {
    setTimeout(() => {
      setfirstLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div>breadcrumb here</div>
      <section className="flex gap-1">
        <div className=" h-[100px] hidden w-full md:block md:w-1/2">
          <SimpleSlide imgs={imgs} />
        </div>
        <div className="w-full h-[100px] md:w-1/2">
          <SimpleSlide imgs={imgs} />
        </div>
      </section>
      <section>
        <div className="grid grid-cols-8 gap-3">
          {Array.from({ length: 16 }).map((_, i) => (
            <Link
              key={i}
              className="round-lg outline outline-gray-100"
              to={"/"}
            >
              <img
                src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/tmp/catalog/product/f/r/frame_59.png"
                alt=""
              />
            </Link>
          ))}
        </div>
      </section>
      <section>filter here</section>
      <section>
        <div>
          <h1 className="text-[20px] font-semibold">Sắp xếp theo</h1>
          <div className="flex gap-2">
            <button
              onClick={() => handleSort("price-high-low")}
              className={`flex items-center bg-gray-200 p-2 rounded-lg ${
                activeButton === 1
                  ? "bg-blue-200 outline outline-main text-main"
                  : ""
              }`}
            >
              <Icon icon="proicons:filter" width="1rem" height="1rem" />
              Giá Cao - Thấp
            </button>
            <button
              onClick={() => handleSort("price-low-high")}
              className={`flex items-center bg-gray-200 p-2 rounded-lg ${
                activeButton === 2
                  ? "bg-blue-200 outline outline-main text-main"
                  : ""
              }`}
            >
              <Icon
                icon="proicons:filter"
                width="1rem"
                height="1rem"
                className="rotate-180"
              />
              Giá Thấp - Cao
            </button>
            <button
              onClick={() => handleSort("discount")}
              className={`flex items-center bg-gray-200 p-2 rounded-lg ${
                activeButton === 3
                  ? "bg-blue-200 outline outline-main text-main"
                  : ""
              }`}
            >
              <Icon
                icon="material-symbols-light:percent"
                width="1rem"
                height="1rem"
              />
              Khuyến Mãi Hot
            </button>
            <button
              onClick={() => handleSort("views")}
              className={`flex items-center bg-gray-200 p-2 rounded-lg ${
                activeButton === 4
                  ? "bg-blue-200 outline outline-main text-main"
                  : ""
              }`}
            >
              <Icon icon="iconoir:eye" width="1rem" height="1rem" />
              Xem nhiều
            </button>
          </div>
        </div>
      </section>
      <section>
        {firstLoading ? (
          loading()
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
            {(sortedProducts.length > 0 ? sortedProducts : products).map(
              (product, index) => (
                <ProductCard key={index} data={product} />
              )
            )}
          </div>
        )}

        <div>{isLoading && loading()}</div>
        <div className="flex justify-center my-2">
          <button
            className="bg-main text-white p-2 rounded-lg"
            onClick={handleLoadMore}
          >
            Xem thêm sản phẩm
          </button>
        </div>
      </section>
    </div>
  );
};

export default Product;
