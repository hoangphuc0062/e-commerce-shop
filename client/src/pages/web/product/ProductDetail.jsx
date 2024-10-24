import { products } from "../../../data/Product/Products";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Compare } from "../../../components/Button/Compare";
import { Button } from "../../../components/Button/Button";
import AddToCart from "../../../components/Button/AddToCart";
import ProductInfo from "../../../components/Products/ProductInfo";
import StoreList from "../../../components/Products/StoreList";
import QnASection from "../../../components/Form/QnAForm";
import Heading from "../../../components/Heading/Heading";
import Ratings from "../../../components/Products/Ratings";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./ProductDetail.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import ProductSpecifications from "../../../components/Products/ProductSpecifications";
import ProductDecripton from "../../../components/Products/ProductDecripton";
import ProductOptions from "../../../components/Products/ProductOptions";
import ProductColors from "../../../components/Products/ProductColors";
import Reviews from "../../../components/Products/Reviews";
import WarrantyProduct from "../../../components/Products/WarrantyProduct";
import { reviewProducts } from "../../../data/Product/ReviewProducts";
import { SmallPost } from "../../../components/Forum";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { slug } = useParams();
  useEffect(() => {
    const foundProduct = products.find((product) => product.slug === slug);
    setProduct(foundProduct);
  }, [slug]);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="container p-2 sm:p-4 lg:p-8 w-full flex flex-col">
      {/* Title and Ratings */}
      <div className="flex flex-row flex-wrap items-center gap-2 mb-4">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold flex-1">
          {product?.name}
        </h2>
        <Ratings />
        <Compare />
      </div>

      <div className="flex flex-col lg:flex-row bg-card">
        {/* Product Images and Info Sections */}
        <div className="w-full flex flex-col lg:flex-row gap-4">
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <Swiper
              spaceBetween={10}
              navigation={true}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="product-slide"
            >
              {product?.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`${product?.name} ${index + 1}`}
                    className="product-slide"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnail Navigation */}
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={3} // Mobile View
              breakpoints={{
                640: { slidesPerView: 4 }, // Small Tablet
                768: { slidesPerView: 5 }, // Tablet View
                1024: { slidesPerView: 11 }, // Laptop View
                1440: { slidesPerView: 11 }, // Large Screens
              }}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="product-slide-thumbs mt-2"
            >
              {product?.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image} alt={`${product?.name} ${index + 1}`} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Store List and Product Info */}
            <div className="flex flex-col md:flex-row pt-4 gap-2 w-full">
              <StoreList />
              <ProductInfo />
            </div>
          </div>
          {/* Product Info Section */}
          <div className="w-full lg:w-1/2">
            {/* Product Options */}
            <ProductOptions options={product?.options} />
            <ProductColors options={product?.options} />
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 mt-4 w-full">
              <Button
                subContent="Mua ngay"
                content="Giao hàng nhanh từ 2 giờ hoặc nhận tại cửa hàng"
              />
              <AddToCart />
            </div>
            <WarrantyProduct />
          </div>
        </div>
      </div>
      {/* Product Description and Specifications */}
      <div className="flex gap-4 w-full lg:flex-row flex-col lg:w-full">
        <ProductDecripton product={product} />
        <ProductSpecifications product={product} />
      </div>

      <div className="flex gap-4 w-full lg:flex-row flex-col lg:w-full">
        <Reviews reviews={reviewProducts} product={product} />

        {/* Tin Tức */}
        <div className="p-4 rounded-lg shadow-md w-full lg:w-[30%] lg:flex hidden flex-col gap-4">
          <Heading title="Tin Tức Về Sản Phẩm" />
          <SmallPost />
        </div>
      </div>
      <div className="w-full pt-4">
        <QnASection />
      </div>
    </div>
  );
};

export default ProductDetail;
