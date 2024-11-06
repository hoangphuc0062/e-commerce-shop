import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { formatDay } from "../../../ultils/helper";
import HeadingSection from "../Heading/HeadingSection";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../../redux/slices/post";

const SliderPostTag = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const dispatch = useDispatch();
  const { tagName } = useParams();
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
            thumbnail: item.thumbnail,
            tagsName: item?.tags?.name,
          }))
          .sort((a, b) => new Date(b.date) - new Date(a.date))
      );
    }
  }, [status, postData]);

  // Lọc bài viết theo tag name
  const filteredData = data.filter((post) =>
    post.tagsName?.some((tag) => tag === tagName)
  );

  return (
    <div className="w-full">
      <HeadingSection title="Nổi bật nhất" />
      <Slider {...settings}>
        {filteredData?.length > 0 ? (
          filteredData?.map((post) => (
            <div key={post?.id} className="px-1">
              <div className="bg-white overflow-hidden flex">
                <img
                  src={post?.thumbnail}
                  alt={post?.postTitle}
                  className="max-w-[180px] max-h-[180px] object-cover rounded-md"
                />
                <div className="p-3">
                  <Link
                    to={`/forum/${post.slug}`}
                    className="text-base font-semibold mb-1 line-clamp-2 cursor-pointer hover:text-main"
                  >
                    {post?.postTitle}
                  </Link>
                  <span className="text-md line-clamp-3 text-gray-500">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: post?.shortDescription,
                      }}
                    />
                  </span>
                  <div className="flex items-center justify-start pt-16">
                    <span className="text-sm">
                      Ngày đăng {formatDay(post?.date)}
                    </span>
                    <Link
                      to={`/forum/category/${post?.categorySlug}`}
                      className="text-main pl-5"
                    >
                      {post?.category}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4">
            Không có bài viết nào trong thẻ này.
          </div>
        )}
      </Slider>
    </div>
  );
};

export default SliderPostTag;
