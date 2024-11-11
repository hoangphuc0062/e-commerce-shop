/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";

import ProductCard from "./Card";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCategoryBySlug } from "./../../redux/slices/category";

export default function GridProduct({ data, cat }) {
  const dispatch = useDispatch();
  const itemsPerPage = 10;
  const pages = Math.ceil(data.length / itemsPerPage);
  const [dataCategory, setDataCategory] = useState([]);

  const paginatedData = Array.from({ length: pages }, (_, i) =>
    data.slice(i * itemsPerPage, i * itemsPerPage + itemsPerPage)
  );
  useEffect(() => {
    dispatch(getCategoryBySlug(cat)).then((res) => {
      if (res.type === "category/getBySlug/fulfilled") {
        setDataCategory(res.payload);
      }
    });
  }, [dispatch, cat]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link to={`/${cat}`}>
          {" "}
          <h1 className="text-2xl font-bold uppercase ">{dataCategory.name}</h1>
        </Link>
        <div className="flex gap-1 overflow-scroll scroll-smooth md:overflow-hidden  ">
          {dataCategory?.brand?.map((brand, index) => (
            <Link
              to={`/${cat}/${brand?.slug}`}
              className="bg-slate-200 text-center p-2 rounded hover:underline"
              key={index}
            >
              {brand?.name}
            </Link>
          ))}
          <Link
            className="bg-slate-200 text-center p-2  rounded hover:underline"
            to={`/${data[0]?.category?.slug}`}
          >
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
                {pageData?.map((item, index) => (
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
