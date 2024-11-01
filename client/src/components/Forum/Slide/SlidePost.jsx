import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { formatDay } from "../../../ultils/helper";
import HeadingSection from "../Heading/HeadingSection";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../../redux/slices/post";

const SlidePost = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const dispatch = useDispatch();
  const status = useSelector((state) => state.post.status);
  const postData = useSelector((state) => state.post.data);
  const [data, setData] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (status === "success" && Array.isArray(postData)) {
      setData(
        postData.map((item) => ({
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
      );
    }
  }, [status, postData]);

  const filteredData = data.filter((post) => post.category === categoryFilter);
  
  return (
    <div className="w-full">
      <HeadingSection title="Nổi bật nhất" />
      <Slider {...settings}>
        {filteredData?.map((post) => (
          <div key={post.id} className="px-1">
            <div className="bg-white rounded-lg overflow-hidden flex">
              <img
                src={post.thumbnail}
                alt={post.postTitle}
                className="w-full h-full lg:max-w-[180px] lg:max-h-[180px] object-cover"
              />
              <div className="p-3">
                <Link
                  to={`${post.slug}`}
                  className="text-base font-semibold mb-1 line-clamp-2 cursor-pointer hover:text-main"
                >
                  {post.postTitle}
                </Link>
                <span className="text-md line-clamp-3">
                  {post.shortDescription}
                </span>
                <div className="flex items-center pt-16">
                  <span className="text-sm">
                    Ngày đăng {formatDay(post.date)}
                  </span>
                  <Link className="text-main pl-5">{post.category}</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlidePost;
