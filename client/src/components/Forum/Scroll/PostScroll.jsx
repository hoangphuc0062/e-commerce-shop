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
        <div className="flex space-x-8">
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
                    className="w-36 h-32 lg:w-1/3 lg:h-44 object-cover rounded-lg"
                  />
                  <div className="pl-4 w-3/4">
                    <h3 className="lg:text-lg text-md font-semibold mb-2 line-clamp-1 lg:line-clamp-2 hover:text-main cursor-pointer">
                      {post.postTitle}
                    </h3>
                    <p
                      className="text-sm text-gray-600 line-clamp-2 lg:line-clamp-3 lg:pt-2"
                      dangerouslySetInnerHTML={{
                        __html: post.shortDescription,
                      }}
                    />
                    <div className="text-sm text-gray-600 flex pt-4 lg:pt-2">
                      <p className="text-main mr-1">{post.author}</p> -
                      <p className="ml-1">{formatDay(post.date)}</p>
                    </div>
                  </div>
                </Link>
              ))}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  className="text-gray-700 capitalize hover:text-main underline"
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
