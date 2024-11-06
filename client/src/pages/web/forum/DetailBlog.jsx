import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowTrendUp } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { GetBySlug } from "../../../redux/slices/post";
import { Sidebar } from "../../../components/Forum";
import { formatDay } from "../../../ultils/helper";
const DetailBlog = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState(null); // Use null as initial state

  // Lấy trạng thái và dữ liệu bài viết từ Redux
  const status = useSelector((state) => state.post.getBySlugStatus);
  const post = useSelector((state) => state.post.data);

  useEffect(() => {
    dispatch(GetBySlug(slug));
  }, [slug, dispatch]);

  useEffect(() => {
    if (status === "success") {
      setData({
        status: post?.status,
        id: post?._id,
        postTitle: post?.postTitle,
        shortDescription: post?.shortDescription,
        seoKeyWords: post?.seoKeyWords,
        content: post?.content,
        author: post?.author?.name || "Unknown",
        authorImageUrl: post?.author?.imageUrl || "/path/to/default-image.jpg",
        category: post?.category?.name || "Unknown",
        categorySlug: post?.category?.slug || "Unknown",
        rating: post?.rating,
        slug: post?.slug,
        date: post?.createdAt,
        thumbnail: post?.thumbnail,
        tags: post?.tags?.map((tag) => tag.name) || [],
      });
    }
  }, [status, post]);
  if (status !== "success" || !data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col md:flex-row w-full pt-16">
      <div className="md:w-1/4 lg:w-1/5 xl:w-1/6">
        <Sidebar />
      </div>
      <div className="md:w-3/4 lg:w-4/5 w-full">
        <div className="bg-gray-100 min-h-screen p-4">
          <div className="flex items-center mb-4 overflow-x-auto whitespace-nowrap">
            <span className="text-sm flex items-center text-main px-3">
              <FaArrowTrendUp className="mr-1" /> Xu hướng:
            </span>
            {/* Render trending tags dynamically if needed */}
            {data?.tags?.map((tag, index) => (
              <Link
                key={index}
                to={`/forum/tag/${tag}`}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 hover:bg-main hover:text-white transition-colors duration-300"
              >
                #{tag}
              </Link>
            ))}
          </div>
          {/* Đường dẫn breadcrumb */}
          <div className="text-sm mb-4">
            <Link to="/forum" className="text-main">
              Trang chủ
            </Link>{" "}
            &raquo;{" "}
            <Link
              to={`/forum/category/${data?.categorySlug}`}
              className="text-gray-600"
            >
              {data?.category}
            </Link>{" "}
            &raquo; {data.postTitle}
          </div>
          {/* Hình ảnh bài viết */}
          <div className="mb-6">
            <img
              src={data.thumbnail}
              alt={data.postTitle}
              className="w-full max-h-[400px] rounded-lg object-cover"
            />
          </div>
          <div className="blog-content">
            <div className="flex items-center justify-between mb-4">
              <div className="inline-block bg-main text-white px-3 py-1 rounded-full text-sm">
                {data.category}
              </div>
            </div>

            {/* Tiêu đề bài viết */}
            <h1 className="text-2xl font-bold mb-4">{data.postTitle}</h1>

            {/* Thông tin tác giả và ngày đăng */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <img
                  src={data.thumbnail}
                  alt={data.thumbnail}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div className="text-sm">
                  <span className="block font-semibold">{data.author}</span>
                  <span className="block text-gray-500">
                    Ngày đăng: {formatDay(data.date)}
                  </span>
                </div>
              </div>
            </div>

            {/* Nội dung bài viết */}
            <div className="text-base text-gray-700">
              <div dangerouslySetInnerHTML={{ __html: data.content }} />
            </div>
          </div>
          {/* Thẻ */}
          <div className="flex flex-wrap gap-2 mt-4 mb-6">
            <span className="text-sm font-semibold mr-2 py-2">Thẻ:</span>
            {Array.isArray(data.tags) &&
              data.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center transition-colors duration-300 hover:bg-main hover:text-white"
                >
                  #{tag}
                </span>
              ))}
          </div>
          {/* Đánh giá bài viết */}{" "}
          <div className="flex flex-col items-end">
            <div className="flex flex-col items-center">
              <img
                src="https://cdn-static.sforum.vn/sforum/_next/static/media/danh-gia-bai-viet.98c2189c.png"
                alt="Đánh giá bài viết"
                className="mb-4 w-20 max-w-md"
              />
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-8 h-8 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="text-sm text-gray-500 mt-2">
                (0 lượt đánh giá - 0/5)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBlog;
