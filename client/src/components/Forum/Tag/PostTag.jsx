import { Link } from "react-router-dom";
// import { PostDB } from "../../../data/Forum/PostDB";

const PostTag = ({ category, data }) => {
  // Lọc bài viết theo category
  const filteredPosts = data?.filter((post) => post.category === category);
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
                src={post.thumbnail}
                alt={post.postTitle}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <Link to={`blog/${post.slug}`}  >
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
        ))
      ) : (
        <p className="p-4">Không có bài viết nào trong danh mục này.</p>
      )}
    </div>
  );
};

export default PostTag;
