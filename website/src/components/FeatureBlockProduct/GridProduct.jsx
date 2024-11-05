/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";

import ProductCard from "./Card";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

export default function GridProduct({ data }) {
  const itemsPerPage = 10;
  const pages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = Array.from({ length: pages }, (_, i) =>
    data.slice(i * itemsPerPage, i * itemsPerPage + itemsPerPage)
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold uppercase ">{data[0]?.category}</h1>
        <div className="flex gap-1 overflow-scroll scroll-smooth md:overflow-hidden  ">
          {data &&
            data.slice(0, 10).map((product, index) => (
              <Link
                className="bg-slate-200 text-center p-2  rounded hover:underline"
                key={index}
              >
                {product?.brand}
              </Link>
            ))}
          <Link className="bg-slate-200 text-center p-2  rounded hover:underline">
            Xem tất cả
          </Link>
        </div>
      </div>

      <>
        <Swiper
          slidesPerView={1}
          modules={[Pagination]}
          pagination={{ clickable: true }}
        >
          {paginatedData.map((pageData, pageIndex) => (
            <SwiperSlide key={pageIndex}>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5  gap-4 py-2">
                {pageData.map((item, index) => (
                  <ProductCard key={index} data={item} />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </div>
  );
}
