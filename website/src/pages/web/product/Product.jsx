import { useEffect, useState } from "react";

import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/system";
import { faker } from "@faker-js/faker";

import SimpleSlide from "../../../components/Banner/SliderBanner/SimpleSlide";
import ProductCard from "../../../components/FeatureBlockProduct/Card";

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
      setProducts([
        ...products,
        ...apiProducts.slice(0, page * productPerPage),
      ]);
      setIsLoading(false);
    }, 2000);
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
    <div>
      <div>breadcrumb here</div>
      <section className="flex gap-1">
        <div className=" h-[100px] hidden w-full md:block md:w-1/2">
          <SimpleSlide imgs={imgs} />
        </div>
        <div className="w-full h-[100px] md:w-1/2">
          <SimpleSlide imgs={imgs} />
        </div>
      </section>
      <section>brands here</section>
      <section>filter here</section>
      <section>sort here</section>
      <section>
        {firstLoading ? (
          loading()
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
            {products.map((product, index) => (
              <ProductCard key={index} data={product} />
            ))}
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
