import Slider from "react-slick";
// import { PostDB } from "../../data/Forum/PostDB";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./SliderPost.css";
import { formatDay } from "../../../ultils/helper";

const SliderPost = ({ category, data }) => {
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
          slidesToShow: 3,
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

  const filteredPosts = data?.filter((post) => post.category === category);

  return (
    <div className="w-full">
      <Slider ref={sliderRef} {...settings}>
        {filteredPosts?.map((post) => (
          <div key={post.id} className="px-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={post.thumbnail}
                alt={post.postTitle}
                className="w-full h-36 object-cover md:h-48 lg:h-60 cursor-pointer"
              />
              <div className="p-3">
                <Link key={post.id} to={`blog/${post.slug}`}>
                  <h3 className="text-base font-semibold mb-1 line-clamp-2 cursor-pointer hover:text-main">
                    {post.postTitle}
                  </h3>
                </Link>
                <Link to={`blog/${post.slug}`}>
                  <p className="text-xs text-blue-500 pb-1 cursor-pointer">
                    {post.author}
                  </p>
                </Link>
                <p className="text-xs text-gray-600 cursor-pointer">
                  {formatDay(post.date)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

SliderPost.propTypes = {
  category: PropTypes.string.isRequired,
};

export default SliderPost;
