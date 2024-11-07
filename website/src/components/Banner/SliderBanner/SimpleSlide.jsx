import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";

export default function SimpleSlide({ imgs }) {
  return (
    <>
      <Swiper
        pagination={true}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {imgs &&
          imgs[0].banner &&
          imgs[0].banner.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-auto object-contain"
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
