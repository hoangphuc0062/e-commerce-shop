import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const PromotionSlider = () => {
  const sliderRef = React.useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const slides = [
    {
      img: 'https://cdn-media.sforum.vn/storage/app/media/trannghia/mo-ban-xiaomi-pad-6s-pro.jpg',
      title: 'CellphoneS mở bán Xiaomi Pad 6S Pro',
      description: 'CellphoneS mở bán Xiaomi Pad 6S Pro với ưu đãi giảm giá 1 triệu đồng kèm nhiều quà tặng hấp dẫn khác, chốt đơn ngay!!!',
    },
    {
      img: 'https://cdn-media.sforum.vn/storage/app/media/trannghia/IMG_8113.JPG',
      title: 'Trả hàng iPhone 16 Series tại CellphoneS',
      description: 'Các siêu phẩm mới nhất đến từ nhà Apple - iPhone 16 Series đã nhận được rất nhiều sự quan tâm từ người dùng và thu hút rất đông người tham gia đặt trước sản phẩm từ ngày 20/9 đến 26/9.',
    },
    {
      img: 'https://cdn-media.sforum.vn/storage/app/media/nhatquang519/hotsale-it-cuoi-thang-9/hotsale-it-cuoi-thang-9-99.jpg',
      title: 'Hotsale IT cuối tháng 9',
      description: 'Hotsale IT cuối tháng 9: Chuột văn phòng xả giá khó tin, combo phím chuột "bánh bèo" chỉ ngang 3 ly trà sữa',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 relative">
      <h2 className="text-xl font-bold mb-6">Tin tức khuyến mại</h2>
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="px-2">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img src={slide.img} alt={slide.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{slide.title}</h3>
                <p className="text-gray-600">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Nút Prev Arrow
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full cursor-pointer hover:bg-gray-600"
      onClick={onClick}
    >
      <FaArrowLeft />
    </div>
  );
};

// Nút Next Arrow
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full cursor-pointer hover:bg-gray-600"
      onClick={onClick}
    >
      <FaArrowRight />
    </div>
  );
};

export default PromotionSlider;
