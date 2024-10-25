import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PostDB } from '../../../data/Forum/PostDB';
import SideBar from '../../../components/Forum/Sidebar';
import { FaArrowTrendUp } from "react-icons/fa6";
import HeadingSection from '../../../components/Forum/HeadingSection';
import SmallPost from "../../../components/Forum/SmallPost";


const DetailBlog = () => {
  const [post, setPost] = useState(null);
  const [hoverRating, setHoverRating] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const foundPost = PostDB.find(p => p.id === parseInt(id));
    setPost(foundPost);
  }, [id]);

  if (!post) {
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
            <span className="text-sm flex items-center text-red-500 px-3"><FaArrowTrendUp className="mr-1" /> Xu hướng: </span>
            <a href="" className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 hover:bg-red-500 hover:text-white transition-colors duration-300"> # Apple iOS 18</a>
            <a href="" className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 hover:bg-red-500 hover:text-white transition-colors duration-300"> # Apple iPhone 16 Series</a>
            <a href="" className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 hover:bg-red-500 hover:text-white transition-colors duration-300"> # Black Myth: Wukong</a>
          </div>
          <div className="text-sm text-gray-600 mb-4">
            <a href="/" className="text-red-500">Trang chủ</a> &raquo; <a href="#" className="text-gray-600">{post.category}</a> &raquo; {post.title}
          </div>
          <div className="mb-6">
              <img src={post.imageUrl} alt={post.title} className="w-full h-auto rounded-lg" />
          </div>
          <div className="blog-content">
            <div className="flex items-center justify-between mb-4">
              <div className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm">{post.category}</div>
              <div className="flex items-center">
                {post.tags && post.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs mr-2">{tag}</span>
                ))}
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <img src={post.imageAuthor} alt={post.author} className="w-10 h-10 rounded-full mr-3" />
                <div className="text-sm">
                  <span className="block font-semibold">{post.author}</span>
                  <span className="block text-gray-500">Ngày đăng: {post.date}</span>
                </div>
              </div>
            </div>
            <div className="text-base text-gray-700 leading-relaxed">
              {post.summary}
            </div>
            <div className="text-base text-gray-700 leading-relaxed">
              {post.description}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 mb-6">
            <span className="text-sm font-semibold mr-2 py-2">Thẻ:</span>
            {post.tags ? (
              post.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm cursor-pointer transition-colors duration-300 hover:bg-red-500 hover:text-white"
                >
                  {tag}
                </span>             
              ))
            ) : (
              <>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm cursor-pointer transition-colors duration-300 hover:bg-red-500 hover:text-white flex items-center justify-center">Sony</span>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm cursor-pointer transition-colors duration-300 hover:bg-red-500 hover:text-white flex items-center justify-center">máy chơi game</span>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm cursor-pointer transition-colors duration-300 hover:bg-red-500 hover:text-white flex items-center justify-center">Sony PlayStation 5 Pro</span>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm cursor-pointer transition-colors duration-300 hover:bg-red-500 hover:text-white flex items-center justify-center">Sony PlayStation</span>
              </>
            )}
          </div>
          <div className="flex flex-col items-end">
            <div className="flex flex-col items-center">
              <img 
                src="https://cdn-static.sforum.vn/sforum/_next/static/media/danh-gia-bai-viet.98c2189c.png" 
                alt="Đánh giá bài viết" 
                className="mb-4 w-20 max-w-md"
              />
              <div className="flex flex-col items-center">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-8 h-8 transition-colors duration-200 ${
                        star <= hoverRating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
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
        <div className="mt-8 bg-red-100 p-6 rounded-lg">
            <div className="flex items-start">
              <div className="mr-4">
              <img src={post.imageAuthor} alt={post.author} className="w-10 h-10 rounded-full mr-3 ml-6 mb-2" />
                <div className="flex flex-col items-center mt-2">
                  <span className="font-semibold whitespace-nowrap">{post.author}</span>
                </div>
              </div>
              <div>
                  <p className="text-gray-700 italic">
                    &ldquo;Trải qua hành trình hơn 3 năm trong lĩnh vực viết nội dung về công nghệ, tôi hy vọng rằng những thông tin tôi mang lại sẽ hữu ích cho bất kỳ ai tìm đến.&rdquo;
                  </p>
              </div>
            </div>
        </div>

        <section className="mb-8 p-4">
          <HeadingSection title="Bài viết liên quan" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SmallPost />
            <SmallPost />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetailBlog;
