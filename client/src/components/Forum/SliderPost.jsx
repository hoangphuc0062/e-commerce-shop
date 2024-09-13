import Slider from "react-slick";
import { PostDB } from "../../data/Forum/PostDB";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";

const SliderPost = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  return (
    <div className="relative">
      <Slider ref={sliderRef} {...settings}>
        {PostDB.map((post) => (
          <div key={post.id} className="px-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-36 object-cover md:h-48 lg:h-60"
              />
              <div className="p-3">
                <h3 className="text-base font-semibold mb-1 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-600">
                  {post.author} - {post.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-1 transform -translate-y-1/2 bg-red-500 text-white w-8 h-8 rounded-full shadow-md flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-red-500 text-white w-8 h-8 rounded-full shadow-md flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default SliderPost;
