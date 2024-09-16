// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./style.css";

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function SliderBanner() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const imgs = [
    {
      title: "Banner-1",
      descrtiption: "This is banner 1",
      src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/fold-6-km-moi-home-30-8.png",
      link: "url_1",
    },
    {
      title: "Banner-2",
      descrtiption: "This is banner 2",
      link: "url_1",
      src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/roi-iphone16-sliding.jpg",
    },
    {
      title: "Banner-1",
      descrtiption: "This is banner 1",
      link: "url_1",
      src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/thang-oppo-muon-van-uu-dai-home.jpg",
    },
    {
      title: "Banner-1",
      descrtiption: "This is banner 1",
      link: "url_1",
      src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/thang-oppo-muon-van-uu-dai-home.jpg",
    },
    {
      title: "Banner-1",
      descrtiption: "This is banner 1",
      link: "url_1",
      src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/thang-oppo-muon-van-uu-dai-home.jpg",
    },
  ];
  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {imgs.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img.src} alt={img.title} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        {imgs.map((img, index) => (
          <SwiperSlide key={index}>
            <button className="p-2 ">
              <h1>{img.title}</h1>
              <h6>{img.descrtiption}</h6>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
