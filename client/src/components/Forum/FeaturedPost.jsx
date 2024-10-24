import { PostDB } from "../../data/Forum/PostDB";
import HeadingSection from "./HeadingSection";
function FeaturedPost({ data }) {
  const post = PostDB[1];
  return (
    <section className="mb-8">
      <HeadingSection title="Nổi bật nhất" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full">
          <div className="relative rounded-lg overflow-hidden cursor-pointer h-full">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-80 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 ">
              <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-main">
                {post.title}
              </h3>
              <p className="text-sm">
                {post.author} • {post.date}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-4 md:space-y-6">
            {PostDB.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 md:space-x-6 cursor-pointer"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded sm:w-24 sm:h-24 md:w-32 md:h-32"
                />
                <div className="flex flex-col">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold hover:text-main line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {item.author} • {item.date}
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

export default FeaturedPost;
