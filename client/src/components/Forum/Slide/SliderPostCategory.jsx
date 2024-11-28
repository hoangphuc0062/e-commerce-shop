import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { formatDay } from "../../../ultils/helper";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../../redux/slices/post";
import HeadingSection from "../Heading/HeadingSection";

const SliderPostCategory = () => {
  const settings = {
    dots: true,
    mobileFirst: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const dispatch = useDispatch();
  const { categorySlug } = useParams();
  const status = useSelector((state) => state.post.status);
  const postData = useSelector((state) => state.post.data);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (status === "success" && Array.isArray(postData)) {
      setData(
        postData
          .map((item) => ({
            status: item.status,
            id: item._id,
            postTitle: item.postTitle,
            shortDescription: item.shortDescription,
            seoKeyWords: item.seoKeyWords,
            content: item.content,
            author: item.author?.name || "Unknown",
            category: item?.category?.name,
            categorySlug: item?.category?.slug,
            rating: item.rating,
            slug: item.slug,
            date: item.createdAt,
            totalRating: item.totalRating,
            thumbnail: item.thumbnail,
          }))
          .sort((a, b) => b.totalRating - a.totalRating)
      );
    }
  }, [status, postData]);

  // Lọc dữ liệu theo categorySlug
  const filteredData = data.filter(
    (post) => post.categorySlug === categorySlug
  );
  return (
    <div className="w-full">
      <HeadingSection title="Nổi bật nhất" />
      <Slider {...settings} className="slider-container">
        {filteredData.length > 0 ? (
          filteredData.slice(0, 4).map((post) => (
            <div key={post.id} className="px-1">
              <div className="bg-white overflow-hidden flex lg:flex-row flex-col">
                <img
                  src={post.thumbnail}
                  alt={post.postTitle}
                  className="lg:h-48 h-36 object-cover rounded-md"
                />
                <div className="p-3">
                  <Link
                    to={`/${post.slug}`}
                    className="text-base font-semibold mb-1 lg:line-clamp-2 line-clamp-1 cursor-pointer hover:text-main"
                  >
                    {post.postTitle}
                  </Link>
                  <span className="text-md lg:line-clamp-3 line-clamp-2 text-gray-500">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: post.shortDescription,
                      }}
                    />
                  </span>
                  <div className="flex items-center justify-start lg:pt-16 pt-4">
                    <span className="text-sm">
                      Ngày đăng {formatDay(post.date)}
                    </span>
                    <Link
                      to={`/forum/category/${post.categorySlug}`}
                      className="text-main pl-5"
                    >
                      {post.category}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4">
            Không có bài viết nào trong danh mục này.
          </div>
        )}
      </Slider>
    </div>
  );
};

export default SliderPostCategory;
