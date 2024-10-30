// import { PostDB } from "../../../data/Forum/PostDB";
import { formatDay } from "../../../ultils/helper";
import HeadingSection from "../Heading/HeadingSection";
import { Link } from "react-router-dom"; // Added import for Link
const PostScroll = ({ data }) => {
  return (
    <>
      <section className="mb-8 p-4">
        <div className="md:flex md:space-x-8">
          <div className="md:w-1/2">
            <HeadingSection title="tin tức mới nhất" />
            <div className="space-y-4">
              {data.slice(0, 6).map((post) => (
                <div key={post.id} className="bg-white overflow-hidden flex">
                  <img
                    src={post.thumbnail}
                    alt={post.postTitle}
                    className="w-1/3 h-32 object-cover hover:scale-105 transition duration-300"
                  />
                  <div className="p-4 w-2/3">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-main cursor-pointer">
                      <Link to={`${post.slug}`}>{post.postTitle}</Link>
                    </h3>
                    <p className="text-sm text-gray-600">
                      {post.author} - {formatDay(post.date)}
                    </p>
                  </div>
                </div>
              ))}
              <div className="mt-6 flex justify-center">
                <button className="bg-main text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">
                  Xem thêm
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 space-y-8">
            <div>
              <div className="space-y-4">
                <HeadingSection title="S-new Cuối Tuần" />
                {data?.slice(0, 3).map((post) => (
                  <div key={post.id} className="bg-white overflow-hidden flex">
                    <img
                      src={post.thumbnail}
                      alt={post.postTitle}
                      className="w-1/3 h-32 object-cover"
                    />
                    <div className="p-4 w-2/3">
                      <h3 className="text-sm font-semibold mb-2 line-clamp-2 hover:text-main cursor-pointer">
                        <Link to={`blog/${post.slug}`}>{post.postTitle}</Link>
                      </h3>
                      <p className="text-xs text-gray-600">
                        {post.author} - {formatDay(post.date)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-right">
                <a
                  href="#"
                  className="text-main text-sm font-semibold hover:underline"
                >
                  Xem thêm
                </a>
              </div>
            </div>
            <div>
              <HeadingSection title="khám phá - TRENDING" />
              <div className="space-y-4">
                {data?.slice(0, 3).map((post) => (
                  <div key={post.id} className="bg-white overflow-hidden flex">
                    <img
                      src={post.thumbnail}
                      alt={post.postTitle}
                      className="w-1/3 h-32 object-cover"
                    />
                    <div className="p-4 w-2/3">
                      <h3 className="text-sm font-semibold mb-2 line-clamp-2 hover:text-main cursor-pointer">
                        <Link to={`blog/${post.slug}`}>{post.postTitle}</Link>
                      </h3>
                      <p className="text-xs text-gray-600">
                        {post.author} - {formatDay(post.date)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-right">
                <a
                  href="#"
                  className="text-main text-sm font-semibold hover:underline"
                >
                  Xem thêm
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostScroll;
