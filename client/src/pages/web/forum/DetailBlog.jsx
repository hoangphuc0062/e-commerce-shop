import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowTrendUp } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { GetBySlug } from "../../../redux/slices/post";
import { HeadingSection, Sidebar, Votebar } from "../../../components/Forum";
import { formatDay, renderStarFromNumber } from "../../../ultils/helper";
import he from "he";

const DetailBlog = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);

  // Lấy trạng thái và dữ liệu bài viết từ Redux
  const status = useSelector((state) => state.post.getBySlugStatus);
  const slugData = useSelector((state) => state.post.slugData);

  useEffect(() => {
    dispatch(GetBySlug(slug));
  }, [slug, dispatch]);

  useEffect(() => {
    if (status === "success" && slugData) {
      setData({
        status: slugData?.status,
        id: slugData?._id,
        postTitle: slugData?.postTitle,
        shortDescription: slugData?.shortDescription,
        seoKeyWords: slugData?.seoKeyWords,
        content: slugData?.content,
        author: slugData?.author?.name || "Unknown",
        avatar:
          slugData?.author?.avatar ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcazeHuAcZDzv4_61fPLT-S00XnaKXch2YWQ&s",
        category: slugData?.category?.name || "Unknown",
        categorySlug: slugData?.category?.slug || "Unknown",
        rating: {
          averageStar: slugData?.rating?.star || 0, // Average star rating
          totalRatings: slugData?.totalRatings || 0,
          reviews:
            slugData?.rating?.map((review) => ({
              customer: review.customer,
              star: review.star,
              comment: review.comment,
            })) || [],
        },
        slug: slugData?.slug,
        date: slugData?.createdAt,
        thumbnail: slugData?.thumbnail,
        tags: slugData?.tags?.map((tag) => tag.name) || [],
      });
    }
  }, [status, slugData]);

  if (status !== "success" || !data) {
    return null;
  }
  return (
    <div className="flex flex-col md:flex-row w-full pt-16 container">
      <Helmet>
        <title>{data.postTitle || "Chi tiết bài viết"}</title>
        <meta name="description" content={he.decode(data.shortDescription)} />
        <meta name="keywords" content={data.seoKeyWords} />
      </Helmet>
      <div className="md:w-1/4 lg:w-1/5 xl:w-1/6">
        <Sidebar />
      </div>
      <div className="md:w-3/4 lg:w-4/5 w-full">
        <div className="min-h-screen p-4">
          <div className="flex items-center mb-4 overflow-x-auto whitespace-nowrap">
            <span className="text-sm flex items-center text-main px-3">
              <FaArrowTrendUp className="mr-1" /> Xu hướng:
            </span>
            {/* Render trending tags dynamically if needed */}
            {data?.tags?.map((tag, index) => (
              <Link
                key={index}
                to={`/tag/${tag}`}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 hover:bg-main hover:text-white transition-colors duration-300 cursor-pointer"
              >
                #{tag}
              </Link>
            ))}
          </div>
          {/* Đường dẫn breadcrumb */}
          <div className="text-sm mb-4 flex items-center gap-1 overflow-x-auto whitespace-nowrap">
            <Link to="/forum" className="text-main">
              Trang chủ
            </Link>
            <p className="text-gray-600"> &raquo;</p>
            <Link
              to={`/category/${data?.categorySlug}`}
              className="text-gray-600"
            >
              {data?.category}
            </Link>
            <p className="text-gray-600"> &raquo;</p>
            <div className="text-gray-600 line-clamp-1">{data.postTitle}</div>
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
            <h1 className="text-2xl font-semibold mb-4">{data.postTitle}</h1>

            {/* Thông tin tác giả và ngày đăng */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <img
                  src={data.avatar}
                  alt={data.author}
                  className="w-10 h-10 rounded-full mr-3 object-cover"
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
            <div className="text-base text-gray-700 ">
              <div dangerouslySetInnerHTML={{ __html: data.content }} />
            </div>
          </div>
          {/* Thẻ */}
          <div className="flex flex-wrap gap-2 mt-4 mb-6">
            <span className="text-sm font-semibold mr-2 py-2">Thẻ:</span>
            {Array.isArray(data.tags) &&
              data.tags.map((tag, index) => (
                <Link
                  key={index}
                  to={`/tag/${tag}`}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center transition-colors duration-300 hover:bg-main hover:text-white"
                >
                  #{tag}
                </Link>
              ))}
          </div>

          <div className="pt-4">
            {/* Đánh giá bài viết */}
            <HeadingSection title={`Đánh giá: ${data.postTitle}`} />
            <div className="flex p-4">
              <div className="flex-4 flex items-center justify-center flex-col">
                <span className="text-3xl font-semibold">{`${data.rating.averageStar}/5`}</span>
                <span className="flex items-center gap-1">
                  {(renderStarFromNumber(data.rating.averageStar) || []).map(
                    (el, index) => (
                      <span key={index}>{el}</span>
                    )
                  )}
                </span>
                <span className="text-sm">
                  {data.rating.totalRatings} đánh giá
                </span>
              </div>
              <div className="flex-6 p-4 flex flex-col gap-2">
                {Array.from(Array(5).keys())
                  .reverse()
                  .map((el) => (
                    <Votebar
                      key={el}
                      number={el + 1}
                      ratingCount={2}
                      ratingTotal={5}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBlog;
