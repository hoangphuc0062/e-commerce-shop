// import { PostDB } from "../../../data/Forum/PostDB";
import { useState } from "react";
import { formatDay } from "../../../ultils/helper";
import HeadingSection from "../Heading/HeadingSection";
import { Link } from "react-router-dom"; // Added import for Link
const PostScroll = ({ data }) => {
  const [visibleItemCount, setVisibleItemCount] = useState(7);
  const visibleData = data.slice(0, visibleItemCount);
  const handleLoadMore = () => {
    setVisibleItemCount((prevCount) => prevCount + 7);
  };
  return (
    <>
      <section className="mb-8 p-4">
        <div className="md:flex md:space-x-8">
          <div className="w-full ">
            <HeadingSection title="tin tức mới nhất" />
            <div className="space-y-4">
              {visibleData.map((post) => (
                <Link
                  to={`${post.slug}`}
                  key={post.id}
                  className="bg-white overflow-hidden flex"
                >
                  <img
                    src={post.thumbnail}
                    alt={post.postTitle}
                    className="w-1/4 h-48 object-cover hover:scale-105 transition duration-300"
                  />
                  <div className="pl-4 w-3/4">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-main cursor-pointer">
                      {post.postTitle}
                    </h3>
                    <p
                      className="text-sm text-gray-600 line-clamp-3 pt-2"
                      dangerouslySetInnerHTML={{
                        __html: post.shortDescription,
                      }}
                    />
                    <div className="text-sm text-gray-600 flex pt-2">
                      <p className="text-main mr-1">{post.author}</p> -
                      <p className="ml-1">{formatDay(post.date)}</p>
                    </div>
                  </div>
                </Link>
              ))}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  className="text-gray-700 capitalize hover:text-main"
                >
                  Xem thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostScroll;
