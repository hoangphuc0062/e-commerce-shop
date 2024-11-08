import { useState, useEffect } from "react";
import { formatDay } from "../../../ultils/helper";
import HeadingSection from "../Heading/HeadingSection";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import PostSkeleton from "../Skeleton/PostSkeleton";

const PostScroll = ({ data }) => {
  const [visibleItemCount, setVisibleItemCount] = useState(7); // Số lượng bài viết hiển thị ban đầu
  const [loading, setLoading] = useState(true); // Trạng thái loading khi khởi tạo
  const [loadingMore, setLoadingMore] = useState(false); // Trạng thái loading khi nhấn "Xem thêm"
  const [fetchedData, setFetchedData] = useState([]); // Dữ liệu đã tải thêm

  useEffect(() => {
    // Giả lập thời gian loading ban đầu
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  // Kết hợp dữ liệu props `data` và `fetchedData`
  const combinedData = [...data, ...fetchedData];
  const visibleData = combinedData.slice(0, visibleItemCount);

  const handleLoadMore = () => {
    // Tránh tải thêm dữ liệu nếu đã đủ bài viết
    if (visibleItemCount >= combinedData.length) return;

    setLoadingMore(true);
    setTimeout(() => {
      // Giả lập việc tải thêm bài viết
      const newItems = data.slice(visibleItemCount, visibleItemCount + 6);
      setFetchedData((prevData) => [...prevData, ...newItems]);

      // Tăng số lượng bài viết hiển thị
      setVisibleItemCount((prevCount) => prevCount + 6);
      setLoadingMore(false);
    }, 1000); // Giả lập thời gian loading
  };

  // Kiểm tra xem có còn bài viết nào để tải thêm không
  const noMorePosts = visibleItemCount >= combinedData.length;

  return (
    <section className="mb-8 p-4">
      <div className="flex space-x-8">
        <div className="w-full ">
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
            <div className="mt-6 flex justify-center">
              {!noMorePosts &&
                (loadingMore ? (
                  <Skeleton variant="rectangular" width="100%" height={20} />
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
