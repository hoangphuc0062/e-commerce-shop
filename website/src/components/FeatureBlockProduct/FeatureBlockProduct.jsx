import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import { Grid, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

export const FeatureBlockProduct = (products) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold uppercase">
          Điện thoại nổi bật nhất
        </h1>
        <div className="flex gap-2 ">
          <Link className="bg-slate-200 p-2 rounded hover:underline">
            Apple
          </Link>
          <Link className="bg-slate-200 p-2 rounded hover:underline">
            Xem tất cả
          </Link>
        </div>
      </div>
      <Swiper
        breakpoints={{
          1440: {
            slidesPerView: 5,
            spaceBetween: 25,
            grid: { rows: 2 },
            height: 840,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
            grid: { rows: 2 },
            height: 500,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
            grid: { rows: 2 },
            height: 400,
          },
          425: {
            slidesPerView: 2,
            spaceBetween: 10,
            height: 100,
            grid: { rows: 2 },
          },
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
            height: 100,
            grid: { rows: 2 },
          },
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Pagination]}
        className="w-full h-[900px] "
      >
        <SwiperSlide>
          <div className="relative rounded-lg shadow-md overflow-hidden">
            <div className="absolute top-0 left-0 w-24">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/voi-tay-nguyen-datn.appspot.com/o/Nhan_cwuwhd.png?alt=media&token=1c12f273-922f-47db-88d2-09c5b5e0a6fa"
                alt="Discount Label"
                className="w-full object-cover"
              />

              <span className="absolute flex items-center justify-center text-white font-bold text-sm top-1.5 left-3">
                Giảm 10%
              </span>
            </div>
            <Link to={``}>
              <img
                src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/b/_/b_c_1_9.png"
                alt=""
                className="w-full object-cover"
              />

              {/* <span className="absolute top-1 right-0 bg-main text-white text-xs font-bold px-1 py-1.5 w-20 h-7 rounded text-center">
                    Trả góp 0%
                  </span> */}
              <div className="p-2 text-start">
                <h2 className="text-xl font-semibold line-clamp-1">
                  Iphone 15 Pro Max
                </h2>
                <div className="flex gap-2">
                  <span className="text-main font-bold ">10.000.000đ</span>
                  <span className="line-through text-gray-500">
                    12.000.000đ
                  </span>
                </div>
              </div>
            </Link>
            <div className="flex items-center justify-between p-2">
              <div className="flex">
                <Icon
                  icon="ic:outline-star"
                  width="1.5rem"
                  height="1.5rem"
                  className="text-yellow-500"
                />
              </div>
              <div>
                <Icon
                  icon="mdi-light:heart"
                  width="2rem"
                  height="2rem"
                  className="text-blue-800"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};
