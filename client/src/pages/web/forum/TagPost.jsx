import { Link, useParams, useNavigate } from "react-router-dom";
import {
  HeadingSection,
  OptionPost,
  Sidebar,
  SlidePostTag,
} from "../../../components/Forum";
import { formatDay } from "../../../ultils/helper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { getPosts } from "../../../redux/slices/post";
import { Helmet } from "react-helmet-async";

const TagPost = () => {
  const dispatch = useDispatch();
  const { tagsName } = useParams();
  const status = useSelector((state) => state.post.status);
  const postData = useSelector((state) => state.post.data);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [visibleItemCount, setVisibleItemCount] = useState(6);
  const [sortOption, setSortOption] = useState("newest");

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (status === "success" && Array.isArray(postData)) {
      const formattedData = postData
        .map((item) => ({
          id: item._id,
          postTitle: item.postTitle,
          shortDescription: item.shortDescription,
          author: item.author?.name || "Unknown",
          category: item?.category?.name,
          rating: item.rating,
          slug: item.slug,
          date: item.createdAt,
          thumbnail: item.thumbnail,
          tags: Array.isArray(item.tags)
            ? item.tags.map((tag) => tag.name)
            : [],
        }))
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      setData(formattedData);
    }
  }, [status, postData]);

  const filteredData = data.filter((post) => post.tags.includes(tagsName));

  useEffect(() => {
    if (status === "success") {
      const allTags = postData
        .flatMap((post) => post.tags)
        .map((tag) => tag.name);
      if (!allTags.includes(tagsName)) {
        navigate("/404");
      }
    }
  }, [status, tagsName, postData, navigate]);

  const sortedData = useMemo(() => {
    const data = [...filteredData];
    switch (sortOption) {
      case "newest":
        return data.sort((a, b) => new Date(b.date) - new Date(a.date));
      case "oldest":
        return data.sort((a, b) => new Date(a.date) - new Date(b.date));
      case "highestRating":
        return data.sort((a, b) => b.totalRating - a.totalRating);
      default:
        return data;
    }
  }, [filteredData, sortOption]);

  const visibleData = sortedData.slice(0, visibleItemCount);

  const handleLoadMore = () => {
    setVisibleItemCount((prevCount) => prevCount + 6);
  };

  return (
    <div className="container w-full mb-8">
      <Helmet>
        <title>Tags | #{tagsName}</title>
      </Helmet>
      <div className="flex flex-col md:flex-row w-full pt-16">
        <div className="md:w-1/4 lg:w-1/5">
          <Sidebar />
        </div>
        <div className="md:w-3/4 lg:w-4/5 w-full flex flex-col">
          <SlidePostTag />
          <section className="w-full">
            <div className="flex justify-between items-center">
              <HeadingSection title="Tin Mới Nhất" />
              <OptionPost onSortChange={handleSortChange} />
            </div>
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
                        <Link to={`/${post.slug}`}>{post.postTitle}</Link>
                      </h3>
                      <div
                        className="text-sm text-gray-600 line-clamp-1 py-1"
                        dangerouslySetInnerHTML={{
                          __html: post.shortDescription,
                        }}
                      />
                      <p className="text-sm text-gray-600">
                        {post.author} - {formatDay(post.date)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600">
                  Không có bài viết nào trong thẻ này.
                </p>
              )}
              {visibleItemCount < filteredData.length && (
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

export default TagPost;
