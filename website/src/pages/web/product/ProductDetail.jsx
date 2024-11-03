import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./ProductDetail.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Icon } from "@iconify/react/dist/iconify.js";

const ProductDetail = () => {
  const { slug } = useParams();

  return (
    <div className="container p-2 sm:p-4 lg:p-8 w-full flex flex-col">
      <div>breadcrumb here</div>
      <section className="block__product flex flex-col gap-3">
        <div className="block__header flex items-center text-[24px]  gap-2">
          <span className=" font-bold">Samsung Galaxy Z Fold6 12GB 256GB</span>
          <span className="flex text-yellow-500">
            <Icon icon="ic:outline-star" />
            <Icon icon="ic:outline-star" />
            <Icon icon="ic:outline-star" />
            <Icon icon="ic:outline-star" />
            <Icon icon="ic:outline-star" />
          </span>
          <span>9 đánh giá</span>
          <button className="outline outline-main text-main p-1 text-lg rounded-lg">
            <Icon
              icon="ic:round-plus"
              width="1rem"
              height="1rem"
              className="inline"
            />
            <span className="inline">So sánh</span>
          </button>
        </div>
        <div className="flex gap-2">
          <div className="block__header--left w-1/2">left here</div>
          <div className="block__header--right flex flex-col gap-2 w-1/2">
            {/* bien the here */}
            <div className="grid grid-cols-3 gap-2">
              <button className="outline outline-gray-300 p-2 text-sm relative">
                <span className="block font-semibold">12GB 1TB </span>
                <span className="text-gray-700">52.990.000 đ</span>
              </button>
              <button className="outline outline-gray-300 p-2 text-sm relative">
                <span className="block font-semibold">12GB 1TB </span>
                <span className="text-gray-700">52.990.000 đ</span>
              </button>
              <button className="outline outline-main p-2 text-sm relative">
                <span className="block font-semibold">12GB 1TB </span>
                <span className="text-gray-700">52.990.000 đ</span>
                <span className=" absolute top-0 right-0 bg-main text-white p-1 text-xs">
                  <Icon
                    icon="akar-icons:check"
                    width="0.8rem"
                    height="0.8rem"
                    className="inline"
                  />
                </span>
              </button>
            </div>
            {/* Biến thể màu sản phẩm */}
            <div className="flex flex-col gap-2">
              <div>Chọn màu sản phẩm</div>
              <div className="grid grid-cols-3 gap-2">
                <button className="outline outline-gray-300 flex items-center gap-2 p-2 text-sm relative">
                  <div>
                    <img
                      src="https://cdn2.cellphones.com.vn/insecure/rs:fill:50:50/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/m/image_1171.png"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold">12GB 1TB </span>
                    <span className="text-gray-700">52.990.000 đ</span>
                  </div>
                </button>
                <button className="outline outline-gray-300 flex items-center gap-2 p-2 text-sm relative">
                  <div>
                    <img
                      src="https://cdn2.cellphones.com.vn/insecure/rs:fill:50:50/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/m/image_1171.png"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold">12GB 1TB </span>
                    <span className="text-gray-700">52.990.000 đ</span>
                  </div>
                </button>
                {/* Active */}
                <button className="outline outline-main flex items-center gap-2 p-2 text-sm relative">
                  <div>
                    <img
                      src="https://cdn2.cellphones.com.vn/insecure/rs:fill:50:50/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/m/image_1171.png"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold">12GB 1TB </span>
                    <span className="text-gray-700">52.990.000 đ</span>
                    <span className=" absolute top-0 right-0 bg-main text-white p-1 text-xs">
                      <Icon
                        icon="akar-icons:check"
                        width="0.8rem"
                        height="0.8rem"
                        className="inline"
                      />
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
