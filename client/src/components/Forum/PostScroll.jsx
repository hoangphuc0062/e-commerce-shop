import { PostDB } from "../../data/Forum/PostDB";
import HeadingSection from "./HeadingSection";
const PostScroll = () => {
  return (
    <>
      <div className="space-y-4">
      <HeadingSection title="S-NEWS cuối tuần" />
        {PostDB.slice(0, 3).map((post) => (
          <div key={post.id} className="bg-white overflow-hidden flex">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-1/3 h-32 object-cover"
            />
            <div className="p-4 w-2/3">
              <h3 className="text-sm font-semibold mb-2 line-clamp-2 hover:text-main cursor-pointer">
                {post.title}
              </h3>
              <p className="text-xs text-gray-600">
                {post.author} - {post.date}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-right">
        <a
          href="#"
          className="text-red-500 text-sm font-semibold hover:underline"
        >
          Xem thêm
        </a>
      </div>
    </>
  );
};

export default PostScroll;
