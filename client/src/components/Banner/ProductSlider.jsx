import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Autoplay, Navigation } from "swiper/modules";

const ProductSlider = ({ images }) => {
  return (
    <Swiper
      spaceBetween={10}
      navigation={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Navigation]}
      breakpoints={{
        640: {

        },
      }}
      className="mySwiper2"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <img src={img.src} alt={img.title} className="w-full h-auto" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSlider;
