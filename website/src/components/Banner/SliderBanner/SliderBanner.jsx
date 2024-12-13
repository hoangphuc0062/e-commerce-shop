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

// export default function SliderBanner({ data }) {
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);
//   console.log(data);

//   return (
//     <>
//       <Swiper
//         spaceBetween={10}
//         navigation={true}
//         // autoplay={{
//         //   delay: 2500,
//         //   disableOnInteraction: false,
//         // }}
//         thumbs={{
//           swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
//         }}
//         // modules={[FreeMode, Navigation, Thumbs, Autoplay]}
//         modules={[FreeMode, Navigation, Thumbs]}
//         className="contentSwiper "
//       >
//         {data &&
//           data.banner &&
//           data.banner.map((img, index) => (
//             <SwiperSlide key={index} style={{ width: "100%" }}>
//               <Link to={img.link}>
//                 <img
//                   src={img.src}
//                   alt={img.title}
//                   className="w-full object-cover"
//                 />
//               </Link>
//             </SwiperSlide>
//           ))}
//       </Swiper>

//       <Swiper
//         onSwiper={setThumbsSwiper}
//         spaceBetween={10}
//         slidesPerView={4}
//         freeMode={true}
//         watchSlidesProgress={true}
//         // modules={[FreeMode, Navigation, Thumbs, Autoplay]}
//         modules={[FreeMode, Navigation, Thumbs]}
//         // autoplay={{
//         //   delay: 2500,
//         //   disableOnInteraction: false,
//         // }}
//         className="bannerSwiper  hidden lg:flex lg:items-center lg:justify-center"
//         style={{ height: "120px" }}
//       >
//         {data.map((img, index) => (
//           <SwiperSlide
//             key={index}
//             style={{
//               height: "100%",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <button className="flex flex-col  justify-center items-center p-2 line-clamp-2 h-full">
//               <h1>{img.title}</h1>
//               <h6>{img.descrtiption}</h6>
//             </button>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </>
//   );
// }
export default function SliderBanner({ data }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      {/* Main Slider */}
      <Swiper
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="contentSwiper lg:h-[80%]"
      >
        {data &&
          data[0]?.banner &&
          data[0]?.banner?.map((img, index) => (
            <SwiperSlide key={index} style={{ width: "100%" }}>
              <Link to={img.link}>
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-contain"
                />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Thumbnail Slider */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        className="bannerSwiper md:h-[20%] hidden lg:flex lg:items-center lg:justify-center"
      >
        {data &&
          data[0].banner &&
          data[0].banner.map((img, index) => (
            <SwiperSlide
              key={index}
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button className="flex flex-col justify-center items-center p-2 line-clamp-2 w-full h-full hover:bg-slate-100">
                <h1>{img.title}</h1>
                <p>{img.description}</p>
              </button>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
