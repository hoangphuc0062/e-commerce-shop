import { useState, useEffect } from "react";
import { formatDay } from "../../../ultils/helper";
import HeadingSection from "../Heading/HeadingSection";
import { Link } from "react-router-dom";
import PostSkeleton from "../Skeleton/PostSkeleton";

const PostScroll = ({ data }) => {
  const [visibleItemCount, setVisibleItemCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const combinedData = [...data, ...fetchedData];
  const visibleData = combinedData.slice(0, visibleItemCount);

  const handleLoadMore = () => {
    if (visibleItemCount >= combinedData.length) return;

    setLoadingMore(true);
    setTimeout(() => {
      const newItems = data.slice(visibleItemCount, visibleItemCount + 6);
      setFetchedData((prevData) => [...prevData, ...newItems]);

      setVisibleItemCount((prevCount) => prevCount + 6);
      setLoadingMore(false);
    }, 2000);
  };

  const noMorePosts = visibleItemCount >= combinedData.length;

  return (
    <section className="mb-8 pl-4">
      <div className="flex space-x-8">
        <div className="w-full">
          <HeadingSection title="Tin tức mới nhất" />
          <div className="space-y-4">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <PostSkeleton key={index} />
                ))
              : visibleData.map((post) => (
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
            <div className="mt-6 flex flex-col space-y-4 items-center w-full">
              {!noMorePosts &&
                (loadingMore ? (
                  Array.from({ length: 6 }).map((_, index) => (
                    <PostSkeleton key={index} className="w-full" />
                  ))
                ) : (
                  <button
                    onClick={handleLoadMore}
                    className="text-gray-700 capitalize hover:text-main underline"
                  >
                    Xem thêm
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostScroll;
