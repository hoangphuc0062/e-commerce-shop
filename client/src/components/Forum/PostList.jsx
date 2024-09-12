import { PostDB } from "../../data/Forum/PostDB";

const PostList = () => {
  return (
    <>
      {PostDB.slice(0, 6).map((post) => (
        <div key={post.id} className="bg-white overflow-hidden flex">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-1/3 h-32 object-cover"
          />
          <div className="p-4 w-2/3">
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm text-gray-600">
              {post.author} - {post.date}
            </p>
          </div>
        </div>
      ))}
      <div className="mt-6 flex justify-center">
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">
          Xem thêm
        </button>
      </div>
    </>
  );
};

export default PostList;
