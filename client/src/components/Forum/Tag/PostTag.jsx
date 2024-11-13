import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton"; // Skeleton từ Material UI

const PostTag = ({ category, data }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Thời gian chờ 2 giây

    return () => clearTimeout(timer);
  }, []);

  const filteredPosts = data?.filter((post) => post.category === category);
  const postsToDisplay = filteredPosts.slice(0, 3);

  return (
    <div className="flex-shrink-0 bg-white dark:bg-card overflow-x-auto w-full md:w-[320px]">
      {loading
        ? Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={`border-b ${index === 2 ? "border-b-0" : ""} p-4`}
            >
              {index === 0 && (
                <Skeleton variant="rectangular" width="100%" height={192} />
              )}
              <Skeleton variant="text" width="80%" height={24} />
              <Skeleton variant="text" width="60%" height={20} />
            </div>
          ))
        : postsToDisplay.map((post, index) => (
            <div
              key={post.id}
              className={`border-b ${
                index === postsToDisplay.length - 1 ? "border-b-0" : ""
              }`}
            >
              {index === 0 && (
                <img
                  src={post.thumbnail}
                  alt={post.postTitle}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
              <div className="p-4">
                <Link to={`${post.slug}`}>
                  <h2
                    className={`text-lg ${
                      index === 0
                        ? "font-semibold text-primary"
                        : "text-md font-thin"
                    } line-clamp-2 hover:text-main cursor-pointer`}
                  >
                    {post.postTitle}
                  </h2>
                </Link>
              </div>
            </div>
          ))}
    </div>
  );
};

export default PostTag;
