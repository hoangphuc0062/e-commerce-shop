import { faker } from "@faker-js/faker";
import SimpleSlide from "../../../components/Banner/SliderBanner/SimpleSlide";
import ProductCard from "../../../components/FeatureBlockProduct/Card";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import Skeleton from "@mui/material/Skeleton";

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

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProducts(Array.from({ length: 15 }, createRandomProduct));
      setIsLoading(false);
    }, 15000);
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
      <section className="grid grid-cols-2 lg:grid-cols-5 gap-2">
        {isLoading
          ? Array.from({ length: 15 }).map((_, index) => (
              <Box sx={{ pt: 0.5 }} key={index}>
                <Skeleton variant="rectangular" height={300} />
                <Skeleton height={40} />
                <Skeleton width="80%" />
                <Skeleton width="60%" />
              </Box>
            ))
          : products.map((product, index) => (
              <ProductCard key={index} data={product} />
            ))}
      </section>
    </div>
  );
};

export default Product;
