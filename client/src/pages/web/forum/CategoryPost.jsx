import { Link, useParams } from "react-router-dom";
import { HeadingSection, Sidebar, SlidePost } from "../../../components/Forum";
import { formatDay } from "../../../ultils/helper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPosts } from "../../../redux/slices/post";

const CategoryPost = () => {
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.post.data);
  const { categorySlug } = useParams();
  const [visibleItemCount, setVisibleItemCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleItemCount((prevCount) => prevCount + 6);
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const formattedData = Array.isArray(postData)
    ? postData.map((item) => ({
        status: item.status,
        id: item._id,
        postTitle: item.postTitle,
        shortDescription: item.shortDescription,
        seoKeyWords: item.seoKeyWords,
        content: item.content,
        author: item.author?.name || "Unknown",
        category: item?.category?.name,
        rating: item.rating,
        slug: item.slug,
        date: item.createdAt,
        thumbnail: item.thumbnail,
      }))
    : [];

  const visibleData = formattedData
    .filter((post) => post.category === categorySlug)
    .slice(0, visibleItemCount);

  return (
    <div className="container w-full">
      <div className="flex flex-col md:flex-row w-full pt-16">
        <div className="md:w-1/4 lg:w-1/5 xl:w-1/">
          <Sidebar />
        </div>
        <div className="md:w-3/4 lg:w-4/5 w-full flex flex-col">
          <SlidePost />
          <section className="mb-8 p-4">
            <div className="md:flex md:space-x-8">
              <div className="md:w-1/2">
                <HeadingSection title="tin tức cập nhật" />
                <div className="space-y-4">
                  {visibleData.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white overflow-hidden flex"
                    >
                      <img
                        src={post.thumbnail}
                        alt={post.postTitle}
                        className="w-1/3 h-32 object-cover hover:scale-105 transition duration-300"
                      />
                      <div className="p-4 w-2/3">
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-main cursor-pointer">
                          <Link to={`${post.slug}`}>{post.postTitle}</Link>
                        </h3>
                        <p className="text-sm text-gray-600">
                          {post.author} - {formatDay(post.date)}
                        </p>
                      </div>
                    </div>
                  ))}
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
              </div>
              <div className="md:w-1/2 space-y-8">
                <div>
                  <div className="space-y-4">
                    <HeadingSection title="Xem nhiều tuần qua" />
                    {visibleData.map((post) => (
                      <div
                        key={post.id}
                        className="bg-white overflow-hidden flex"
                      >
                        <img
                          src={post.thumbnail}
                          alt={post.postTitle}
                          className="w-1/3 h-32 object-cover"
                        />
                        <div className="p-4 w-2/3">
                          <h3 className="text-sm font-semibold mb-2 line-clamp-2 hover:text-main cursor-pointer">
                            <Link to={`blog/${post.slug}`}>
                              {post.postTitle}
                            </Link>
                          </h3>
                          <p className="text-xs text-gray-600">
                            {post.author} - {formatDay(post.date)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CategoryPost;
