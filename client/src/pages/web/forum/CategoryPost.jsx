import { Link, useParams } from "react-router-dom";
import {
  HeadingSection,
  Sidebar,
  SlidePostCategory,
} from "../../../components/Forum";
import { formatDay } from "../../../ultils/helper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPosts } from "../../../redux/slices/post";

const CategoryPost = () => {
  const dispatch = useDispatch();
  const { categorySlug } = useParams();
  const postData = useSelector((state) => state.post.data);
  const [visibleItemCount, setVisibleItemCount] = useState(6);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const formattedData = Array.isArray(postData)
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

  const visibleData = formattedData.slice(0, visibleItemCount);

  const handleLoadMore = () => {
    setVisibleItemCount((prevCount) => prevCount + 6);
  };

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
              {visibleData.length > 0 ? (
                visibleData.map((post) => (
                  <div
                    key={post.id}
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
              {visibleItemCount < formattedData.length && (
                <div className="mt-6 flex justify-center">
                  <button
                    className="text-main text-md font-semibold underline"
                    onClick={handleLoadMore}
                  >
                    Xem thêm
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CategoryPost;
