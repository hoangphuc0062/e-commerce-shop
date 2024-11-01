import { Link } from "react-router-dom";
import { PostDB } from "../../data/Forum/PostDB";
import PropTypes from "prop-types";

const PostTag = ({ category }) => {
  // Lọc bài viết theo category
  const filteredPosts = PostDB.filter((post) => post.category === category);
  // Giới hạn số lượng bài viết tối đa là 3
  const postsToDisplay = filteredPosts.slice(0, 3);

  return (
    <div className="flex-shrink-0 bg-white dark:bg-card rounded-lg shadow-md overflow-hidden w-full md:w-[370px]">
      {postsToDisplay.length > 0 ? (
        postsToDisplay.map((post, index) => (
          <div
            key={post.id}
            className={`border-b ${
              index === postsToDisplay.length - 1 ? "border-b-0" : ""
            }`}
          >
            {index === 0 && (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <Link to={`/post/${post.id}`}>
                <h2
                  className={`text-lg ${
                    index === 0
                      ? "font-semibold text-primary"
                      : "text-md font-thin"
                  } line-clamp-2 hover:text-main cursor-pointer`}
                >
                  {post.title}
                </h2>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className="p-4">Không có bài viết nào trong danh mục này.</p>
      )}
    </div>
  );
};

PostTag.propTypes = {
  category: PropTypes.string.isRequired,
};

export default PostTag;
