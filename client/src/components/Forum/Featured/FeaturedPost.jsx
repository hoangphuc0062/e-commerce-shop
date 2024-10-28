import { Link } from "react-router-dom";
import HeadingSection from "../Heading/HeadingSection";
import PropTypes from "prop-types";
import { formatDay } from "../../../ultils/helper";

function FeaturedPost({ data }) {
  const featuredPost = data[0];

  return (
    <section className="mb-8">
      <HeadingSection title="Nổi bật nhất" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full">
          <Link
            to={`blog/${featuredPost?.slug}`}
            className="relative rounded-lg overflow-hidden cursor-pointer h-full"
          >
            <img
              src={featuredPost?.thumbnail}
              alt={featuredPost?.postTitle}
              className="w-full h-80 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-main">
                {featuredPost?.postTitle}
              </h3>
              <p className="text-sm">
                {featuredPost?.author} • {formatDay(featuredPost?.date)}
              </p>
            </div>
          </Link>
        </div>
        <div className="space-y-4">
          <div className="space-y-4 md:space-y-6">
            {data?.slice(1, 4).map((post) => (
              <div
                key={post?.id}
                className="flex posts-center space-x-4 md:space-x-6 cursor-pointer"
              >
                <img
                  src={post?.thumbnail}
                  alt={post?.postTitle}
                  className="w-20 h-20 object-cover rounded sm:w-24 sm:h-24 md:w-32 md:h-32"
                />
                <div className="flex flex-col">
                  <Link to={`blog/${post.slug}`}>
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold hover:text-main line-clamp-2">
                      {post?.postTitle}
                    </h3>
                  </Link>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {post?.author} • {formatDay(post?.date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

FeaturedPost.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      thumbnail: PropTypes.string,
      postTitle: PropTypes.string,
      author: PropTypes.string,
      date: PropTypes.string,
      imageUrl: PropTypes.string,
      title: PropTypes.string,
      slug: PropTypes.string.isRequired,
    })
  ),
};

export default FeaturedPost;
