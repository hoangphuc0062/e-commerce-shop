import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./SliderPost.css";
import { formatDay } from "../../../ultils/helper";

const SliderPost = ({ category, data }) => {
  const sliderRef = useRef(null);

  // Cấu hình cho Slider
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  // Lọc các bài viết theo danh mục nếu có, nếu không sẽ hiển thị tất cả
  const filteredPosts = data?.filter((post) => post.category === category);

  return (
    <div className="w-full">
      <Slider ref={sliderRef} {...settings}>
        {filteredPosts?.map((post) => (
          <Link to={`${post.slug}`} key={post.id} className="px-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={post.thumbnail}
                alt={post.postTitle}
                className="w-full h-36 object-cover lg:h-40 sm:h-28 cursor-pointer"
              />
              <div className="p-3">
                <div
                  className="text-base font-semibold mb-1 line-clamp-2 cursor-pointer hover:text-main"
                >
                  {post.postTitle}
                </div>
                <div
                  className="text-xs text-blue-500 pb-1 cursor-pointer"
                >
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
