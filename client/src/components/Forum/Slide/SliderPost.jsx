import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Skeleton from "@mui/material/Skeleton";
import "./SliderPost.css";
import { formatDay } from "../../../ultils/helper";

const SliderPost = ({ category, data }) => {
  const sliderRef = useRef(null);
  const [loading, setLoading] = useState(true);

  // Hiển thị loading trong 2 giây
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Cấu hình cho Slider
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Lọc các bài viết theo danh mục nếu có, nếu không sẽ hiển thị tất cả
  const filteredPosts = data?.filter((post) => post.category === category);

  return (
    <div className="w-full">
      <Slider ref={sliderRef} {...settings} className="slider-container">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="px-1">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Skeleton variant="rectangular" width="100%" height={160} />
                  <div className="p-3">
                    <Skeleton variant="text" width="80%" height={24} />
                    <Skeleton variant="text" width="60%" height={20} />
                    <Skeleton variant="text" width="40%" height={20} />
                  </div>
                </div>
              </div>
            ))
          : filteredPosts?.map((post) => (
              <Link to={`${post.slug}`} key={post.id} className="px-1">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={post.thumbnail}
                    alt={post.postTitle}
                    className="w-full h-28 object-cover lg:h-40 sm:h-28 cursor-pointer"
                  />
                  <div className="p-3">
                    <div className="text-base font-semibold mb-1 line-clamp-1 lg:line-clamp-2 cursor-pointer hover:text-main">
                      {post.postTitle}
                    </div>
                    <div className="text-xs text-blue-500 pb-1 cursor-pointer">
                      {post.author}
                    </div>
                    <p className="text-xs text-gray-600 cursor-pointer">
                      {formatDay(post.date)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
      </Slider>
    </div>
  );
};

SliderPost.propTypes = {
  category: PropTypes.string,
  data: PropTypes.array.isRequired,
};

export default SliderPost;
