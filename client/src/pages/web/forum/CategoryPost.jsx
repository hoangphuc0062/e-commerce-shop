import { Link, useParams, useNavigate } from "react-router-dom";
import {
  HeadingSection,
  Sidebar,
  SlidePostCategory,
} from "../../../components/Forum";
import { formatDay } from "../../../ultils/helper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { getPosts } from "../../../redux/slices/post";
import Skeleton from "@mui/material/Skeleton";

const CategoryPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categorySlug } = useParams();
  const postData = useSelector((state) => state.post.data);
  const [visibleItemCount, setVisibleItemCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const observerRef = useRef();

  useEffect(() => {
    setLoading(true);
    dispatch(getPosts()).then(() => setLoading(false));
  }, [dispatch]);

  const formattedData = useMemo(() => {
    return Array.isArray(postData)
      ? postData
          .filter((item) => item.category?.slug === categorySlug)
          .map((item) => ({
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
          .sort((a, b) => new Date(b.date) - new Date(a.date))
      : [];
  }, [postData, categorySlug]);

  const visibleData = formattedData.slice(0, visibleItemCount);
  const handleLoadMore = () => {
    setVisibleItemCount((prevCount) => prevCount + 6);
  };

  useEffect(() => {
    if (formattedData.length === 0) {
      navigate("/404");
    }
  }, [formattedData, navigate]);

  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading]
  );

  const hasMorePosts = visibleItemCount < formattedData.length;

  return (
    <div className="container w-full mb-8">
      <div className="flex flex-col md:flex-row w-full pt-16">
        <div className="md:w-1/4 lg:w-1/5">
          <Sidebar />
        </div>
        <div className="md:w-3/4 lg:w-4/5 w-full flex flex-col">
          <SlidePostCategory />
          <section className="w-full">
            <HeadingSection title="Tin Mới Nhất" />
            <div className="space-y-4">
              {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="flex flex-row space-x-4">
                    <Skeleton variant="rectangular" width="25%" height={120} />
                    <div className="w-3/4 space-y-2">
                      <Skeleton variant="text" width="100%" height={30} />
                      <Skeleton variant="text" width="80%" />
                      <Skeleton variant="text" width="50%" />
                    </div>
                  </div>
                ))
              ) : visibleData.length > 0 ? (
                visibleData.map((post, index) => (
                  <div
                    key={post.id}
                    ref={index === visibleData.length - 1 ? lastPostRef : null}
                    className="bg-white overflow-hidden flex flex-row"
                  >
                    <img
                      src={post.thumbnail}
                      alt={post.postTitle}
                      className="object-cover transition duration-300 rounded-md w-1/4 lg:h-48 h-32"
                    />
                    <div className="p-4 w-2/3">
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-main cursor-pointer">
                        <Link to={`/forum/${post.slug}`}>{post.postTitle}</Link>
                      </h3>
                      <h3 className="text-sm text-gray-600 line-clamp-1 py-1">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: post.shortDescription,
                          }}
                        />
                      </h3>
                      <p className="text-sm text-gray-600">
                        {post.author} - {formatDay(post.date)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600">
                  Không có bài viết nào trong danh mục này.
                </p>
              )}
            </div>

            {/* Hiển thị nút "Xem thêm" nếu còn bài viết để tải thêm */}
            {hasMorePosts && (
              <div className="flex justify-center mt-4">
                {loading ? (
                  <Skeleton variant="rectangular" width={120} height={40} />
                ) : (
                  <button
                    onClick={handleLoadMore}
                    className="px-4 py-2 bg-main text-white rounded-md hover:bg-blue-600"
                  >
                    Xem thêm
                  </button>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default CategoryPost;
