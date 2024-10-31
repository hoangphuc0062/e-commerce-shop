import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { formatDay } from "../../../ultils/helper";
import HeadingSection from "../Heading/HeadingSection";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../../redux/slices/post";

const SlidePost = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const dispatch = useDispatch();
  const status = useSelector((state) => state.post.status);
  const postData = useSelector((state) => state.post.data);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (status === "success" && Array.isArray(postData)) {
      setData(
        postData.map((item) => ({
          status: item.status,
          id: item._id,
          postTitle: item.postTitle,
          shortDescription: item.shortDescription,
          seoKeyWords: item.seoKeyWords,
          content: item.content,
          author: item.author?.name || "Unknown",
          category: item.category,
          rating: item.rating,
          slug: item.slug,
          date: item.createdAt,
          thumbnail: item.thumbnail,
        }))
      );
    }
  }, [status, postData]);

  return (
    <div className="w-full">
      <HeadingSection title="Nổi bật nhất" />
      <Slider {...settings}>
        {data?.map((post) => (
          <div key={post.id} className="px-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={post.thumbnail}
                alt={post.postTitle}
                className="w-full h-36 object-cover md:h-48 lg:h-60 cursor-pointer"
              />
              <div className="p-3">
                <Link
                  to={`${post.slug}`}
                  className="text-base font-semibold mb-1 line-clamp-2 cursor-pointer hover:text-main"
                >
                  {post.postTitle}
                </Link>
                <Link
                  to={`${post.slug}`}
                  className="text-xs text-blue-500 pb-1 cursor-pointer"
                >
                  {post.author}
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

export default SlidePost;
