/* eslint-disable  */
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";

export default function SimpleSlide({ imgs }) {
  const banners = imgs[0]?.banner || [];

  return (
    <Swiper
      pagination={{ clickable: true }}
      modules={[Pagination, Autoplay]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    >
      {banners.map((img, index) => (
        <SwiperSlide key={index}>
          <img
            src={img.src}
            alt={img.title || "Slide image"}
            className="w-full h-auto object-contain"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
