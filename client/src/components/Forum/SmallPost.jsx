import { PostDB } from "../../data/Forum/PostDB";
function SmallPost() {
  return (
    <div className="space-y-4">
      {PostDB.slice(0, 3).map((item) => (
        <div key={item.id} className="flex items-center space-x-4 cursor-pointer" >
          <img src={item.imageUrl} alt={item.title} className="w-24 h-24 object-cover rounded" />
          <div>
            <h3 className="text-lg font-semibold hover:text-red-500">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.author} • {item.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SmallPost;
