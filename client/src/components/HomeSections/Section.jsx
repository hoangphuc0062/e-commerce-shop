// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import "./SectionGrid.css";

// import required modules
import { Grid, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

export default function Section() {
  const datas = [
    {
      title: "Điện thoại nổi bật",
      brands: ["Apple", "Samsung", "Oppo", "Xiaomi", "Vivo", "Realme"],
      products: [
        {
          name: "Iphone 12 Pro Max",
          price: 30000000,
          imageUrl:
            "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png",
        },
        {
          name: "Iphone 13 Pro Max",
          price: 15000000,
          imageUrl:
            "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png",
        },
      ],
    },
    {
      title: "Laptop nổi bật",
      brands: ["Dell", "Asus", "MSI", "HP", "Acer", "Lenovo"],
    },
  ];
  return (
    <>
      {datas &&
        datas.map((data, index) => (
          <section key={index}>
            <div className="block__featured--product">
              <div className="product__list--title">
                <h1>{data?.title}</h1>
              </div>
              <div className="product__list--category">
                <ul>
                  {data?.brands.map((brand, index) => (
                    <Link
                      key={index}
                      className="category__child  bg-grayColor w-3 p-2 mx-2 rounded hover:underline"
                    >
                      {brand}
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
            <div className="product__list--product">
              <Swiper
                slidesPerView={3}
                grid={{
                  rows: 2,
                }}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                modules={[Grid, Pagination]}
                className="grid__swiper"
              >
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide>
              </Swiper>
            </div>
          </section>
        ))}
    </>
  );
}
