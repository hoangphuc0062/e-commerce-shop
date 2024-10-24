import { PostDB } from "../../data/Forum/PostDB";

function SmallPost() {
  return (
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
  );
}

export default SmallPost;
