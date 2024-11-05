// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Link } from "react-router-dom";

export default function SliderBanner() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const imgs = [
    {
      title: "Banner-1",
      descrtiption: "This is banner 1",
      link: "url_1",
      src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/thang-oppo-muon-van-uu-dai-home.jpg",
    },
    {
      title: "Banner-2",
      descrtiption: "This is banner 2",
      link: "url_1",
      src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/s24-ultra-thang-10-home.png",
    },
    {
      title: "Banner-3",
      descrtiption: "This is banner 3",
      link: "url_1",
      src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/s24-ultra-thang-10-home.png",
    },
  ];
  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        // modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        modules={[FreeMode, Navigation, Thumbs]}
        className="contentSwiper "
      >
        {imgs.map((img, index) => (
          <SwiperSlide key={index} style={{ width: "100%" }}>
            <Link to={img.link}>
              <img
                src={img.src}
                alt={img.title}
                className="w-full object-cover"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        // modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        modules={[FreeMode, Navigation, Thumbs]}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        className="bannerSwiper  hidden lg:flex lg:items-center lg:justify-center"
        style={{ height: "120px" }}
      >
        {imgs.map((img, index) => (
          <SwiperSlide
            key={index}
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button className="flex flex-col  justify-center items-center p-2 line-clamp-2 h-full">
              <h1>{img.title}</h1>
              <h6>{img.descrtiption}</h6>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
