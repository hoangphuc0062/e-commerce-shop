/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";

import ProductCard from "./Card";
import { Pagination } from "swiper/modules";

export default function SingleProduct({ data }) {
  const itemsPerPage = 5;
  const pages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = Array.from({ length: pages }, (_, i) =>
    data.slice(i * itemsPerPage, i * itemsPerPage + itemsPerPage)
  );

  return (
    <div>
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
