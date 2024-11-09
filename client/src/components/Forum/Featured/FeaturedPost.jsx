import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeadingSection from "../Heading/HeadingSection";
import PropTypes from "prop-types";
import { formatDay } from "../../../ultils/helper";
import { Skeleton } from "@mui/material";

function FeaturedPost({ data }) {
  const featuredPost = data[0];

  return (
    <section className="mb-8">
      <HeadingSection title="Nổi bật nhất" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full rounded-lg overflow-hidden">
          <Link to={`${featuredPost?.slug}`} className="relative">
            <img
              src={featuredPost?.thumbnail}
              alt={featuredPost?.thumbnail}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-main">
                {featuredPost?.postTitle}
              </h3>
              <p className="text-sm">
                {featuredPost?.author} • {formatDay(featuredPost?.date)}
              </p>
            </div>
          </Link>
        </div>
        <div className="space-y-4">
          <div className="space-y-4 md:space-y-6">
            {data?.slice(1, 4).map((post) => (
              <Link
                to={`${post.slug}`}
                key={post?.id}
                className="flex space-x-4 cursor-pointer"
              >
                <img
                  src={post?.thumbnail}
                  alt={post?.postTitle}
                  className="w-32 lg:w-48 object-cover rounded"
                />
                <div className="flex flex-col">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold hover:text-main line-clamp-2">
                    {post?.postTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {post?.author} • {formatDay(post?.date)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

FeaturedPost.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      thumbnail: PropTypes.string,
      postTitle: PropTypes.string,
      author: PropTypes.string,
      date: PropTypes.string,
      imageUrl: PropTypes.string,
      title: PropTypes.string,
      slug: PropTypes.string.isRequired,
    })
  ),
};

export default FeaturedPost;
