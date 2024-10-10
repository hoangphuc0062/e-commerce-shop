import { products } from "../../data/Product/Products";
import { Link } from "react-router-dom"; // Added import for Link
import Favorites from "../Button/Favorites";
import Ratings from "./Ratings";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import "./ProductSlide.css";
// import required modules
import { Grid, Pagination } from "swiper/modules";
const ProductSlide = () => {
  return (
    <div>
      <Swiper
        modules={[Grid, Pagination]}
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
        className="products-slider"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div>
              <div className="relative rounded-lg shadow-md overflow-hidden">
                <Link to={`/phone/${product.slug}`} className="block">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full object-cover"
                  />
                  {product.discount && (
                    <div className="absolute top-0 left-0 w-24">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/voi-tay-nguyen-datn.appspot.com/o/Nhan_cwuwhd.png?alt=media&token=1c12f273-922f-47db-88d2-09c5b5e0a6fa"
                        alt="Discount Label"
                        className="w-full object-cover"
                      />
                 
                        <span className="absolute flex items-center justify-center text-white font-bold text-sm top-1.5 left-3">
                          Giảm {product.discount}%
                        </span>
                    </div>
                  )}
                  <span className="absolute top-1 right-0 bg-main text-white text-xs font-bold px-1 py-1.5 w-20 h-7 rounded">
                    Trả góp 0%
                  </span>
                  <div className="p-2 text-start">
                    <h2 className="text-sm font-semibold line-clamp-1">
                      {product.name}
                    </h2>
                    <div className="flex items-center gap-1">
                      <p className="text-xs text-muted-foreground border rounded-md p-1 line-clamp-1">
                        {product.screen}
                      </p>
                      <p className="text-xs text-muted-foreground border rounded-md p-1">
                        {product.options[0].ram}
                      </p>
                      <p className="text-xs text-muted-foreground border rounded-md p-1">
                        {product.options[0].rom}
                      </p>
                    </div>
                    <p className="text-md font-bold text-primary pt-1">
                      {product.options[0].salePrice > 0
                        ? `${product.options[0].salePrice.toLocaleString()}đ `
                        : "Giá liên hệ"}
                      {product.options[0].salePrice > 0 && (
                        <span className="line-through text-muted text-sm text-gray-600">
                          {product.options[0].price.toLocaleString()}đ
                        </span>
                      )}
                    </p>
                  </div>
                </Link>
                <div className="flex items-center justify-between p-2">
                  <Ratings />
                  <Favorites />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlide;
