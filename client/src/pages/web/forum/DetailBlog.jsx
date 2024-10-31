import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SideBar from '../../../components/Forum/Sidebar';
import { FaArrowTrendUp } from "react-icons/fa6";
import HeadingSection from '../../../components/Forum/HeadingSection';
import SmallPost from "../../../components/Forum/SmallPost";
import { useDispatch, useSelector } from 'react-redux';
import { GetBySlug } from "../../../redux/slices/post";

const DetailBlog = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState(null); // Use null as initial state

  // Lấy trạng thái và dữ liệu bài viết từ Redux
  const status = useSelector((state) => state.postReducer.getBySlugStatus);
  const post = useSelector((state) => state.postReducer.data);

  useEffect(() => {
    dispatch(GetBySlug(slug));
  }, [slug, dispatch]);

  useEffect(() => {
    if (status === "success" && post) {
      setData({
        id: post.id,
        postTitle: post.title,
        shortDescription: post.shortDescription,
        seoKeyWords: post.seoKeyWords,
        content: post.content,
        author: post.author?.name || "Unknown",
        authorImageUrl: post.author?.imageUrl || "/path/to/default-image.jpg",
        category: post.category.name,
        rating: post.rating,
        slug: post.slug,
        date: post.createdAt,
        thumbnail: post.thumbnail,
        tags: post.tags || []
      });
    }
  }, [status, post]);


  
 
  if (status !== "success" || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row w-full pt-16">
      <div className="md:w-1/4 lg:w-1/5 xl:w-1/6">
        <SideBar />
      </div>
      <div className="md:w-3/4 lg:w-4/5 w-full">
        <div className="bg-gray-100 min-h-screen p-4">
          <div className="flex items-center mb-4 overflow-x-auto whitespace-nowrap">
            <span className="text-sm flex items-center text-red-500 px-3">
              <FaArrowTrendUp className="mr-1" /> Xu hướng:
            </span>
            {/* Render trending tags dynamically if needed */}
            <a href="#" className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 hover:bg-red-500 hover:text-white transition-colors duration-300"># Apple iOS 18</a>
            <a href="#" className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 hover:bg-red-500 hover:text-white transition-colors duration-300"># Apple iPhone 16 Series</a>
            <a href="#" className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 hover:bg-red-500 hover:text-white transition-colors duration-300"># Black Myth: Wukong</a>
          </div>

          {/* Đường dẫn breadcrumb */}
          <div className="text-sm text-gray-600 mb-4">
            <a href="/" className="text-red-500">Trang chủ</a> &raquo; <a href="#" className="text-gray-600">{data.category}</a> &raquo; {data.postTitle}
          </div>

          {/* Hình ảnh bài viết */}
          <div className="mb-6">
            <img src={data.thumbnail} alt={data.postTitle} className="w-full h-auto rounded-lg" />
          </div>

          <div className="blog-content">
            <div className="flex items-center justify-between mb-4">
              <div className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm">{data.category}</div>
              <div className="flex items-center">
                {data.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs mr-2">{tag}</span>
                ))}
              </div>
            </div>

            {/* Tiêu đề bài viết */}
            <h1 className="text-2xl font-bold mb-4">{data.postTitle}</h1>

            {/* Thông tin tác giả và ngày đăng */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <img src={data.thumbnail} alt={data.thumbnail} className="w-10 h-10 rounded-full mr-3" />
                <div className="text-sm">
                  <span className="block font-semibold">{data.author}</span>
                  <span className="block text-gray-500">Ngày đăng: {data.date}</span>
                </div>
              </div>
            </div>

            {/* Nội dung bài viết */}
            <div className="text-base text-gray-700 leading-relaxed">{data.content}</div>
          </div>

          {/* Thẻ */}
          <div className="flex flex-wrap gap-2 mt-4 mb-6">
            <span className="text-sm font-semibold mr-2 py-2">Thẻ:</span>
            {data?.tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm cursor-pointer transition-colors duration-300 hover:bg-red-500 hover:text-white">
                {tag}
              </span>
            ))}
          </div>

          {/* Đánh giá bài viết */}
          <div className="flex flex-col items-end">
            <div className="flex flex-col items-center">
              <img src="https://cdn-static.sforum.vn/sforum/_next/static/media/danh-gia-bai-viet.98c2189c.png" alt="Đánh giá bài viết" className="mb-4 w-20 max-w-md" />
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="text-sm text-gray-500 mt-2">(0 lượt đánh giá - 0/5)</div>
            </div>
          </div>

          {/* Thông tin tác giả */}
          <div className="mt-8 bg-red-100 p-6 rounded-lg">
            <div className="flex items-start">
              <div className="mr-4">
                <img src={data.authorImageUrl} alt={data.author} className="w-10 h-10 rounded-full mr-3" />
              </div>
              <div>
                <p className="text-gray-700 italic">
                  &ldquo;Trải qua hành trình hơn 3 năm trong lĩnh vực viết nội dung về công nghệ, tôi hy vọng rằng những thông tin tôi mang lại sẽ hữu ích cho bất kỳ ai tìm đến.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Bài viết liên quan */}
          <section className="mb-8 p-4">
            <HeadingSection title="Bài viết liên quan" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SmallPost />
              <SmallPost />
              </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DetailBlog;
