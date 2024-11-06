/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { formatCurrency } from "../../utils/helper";

export const FeatureBlockProduct = ({ products }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold uppercase ">
            {products[0].category}
          </h1>
          <Link className=" p-2 rounded hover:underline">Xem tất cả</Link>
        </div>
        <div className="flex gap-1 overflow-scroll scroll-smooth md:overflow-hidden  ">
          {products &&
            products.map((product, index) => (
              <Link
                className="bg-slate-200 text-center p-1  rounded hover:underline"
                key={index}
              >
                {product.brand}
              </Link>
            ))}
        </div>
      </div>
      <div className="">
        <Swiper
          grid={{ rows: 2 }}
          slidesPerView={10}
          spaceBetween={10}
          pagination={{ clickable: true }}
          modules={[Grid, Pagination]}
          className="w-full h-[900px]"
        >
          {products.map((product) => {
            const discountedPrice =
              product.price * (1 - product.discountPercent / 100);

            return (
              <SwiperSlide key={product.id}>
                <div className="relative rounded-lg shadow-md overflow-auto-hidden">
                  {product.discountPercent > 0 && (
                    <div className="absolute top-0 left-0 w-24">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/voi-tay-nguyen-datn.appspot.com/o/Nhan_cwuwhd.png?alt=media&token=1c12f273-922f-47db-88d2-09c5b5e0a6fa"
                        alt="Discount Label"
                        className="w-full object-cover"
                      />
                      <span className="absolute flex items-center justify-center text-white font-bold text-sm top-1.5 left-3">
                        Giảm {product.discountPercent}%
                      </span>
                    </div>
                  )}
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full object-cover"
                    />
                    <div className="p-2 text-start">
                      <h2 className="text-xl font-semibold line-clamp-1">
                        {product.name}
                      </h2>
                      <div className="flex gap-2">
                        <span className="text-main font-bold">
                          {formatCurrency(discountedPrice)}
                        </span>
                        {product.discountPercent > 0 && (
                          <span className="line-through text-gray-500">
                            {product.price.toLocaleString()}đ
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                  <div className="flex items-center justify-between p-2">
                    <div className="flex">
                      {[...Array(product.rating)].map((_, i) => (
                        <Icon
                          key={i}
                          icon="ic:outline-star"
                          width="1.5rem"
                          height="1.5rem"
                          className="text-yellow-500"
                        />
                      ))}
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
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};
