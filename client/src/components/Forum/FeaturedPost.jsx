import { PostDB } from "../../data/Forum/PostDB";
function FeaturedPost() {
const post = PostDB[0]; 
  return (
    <div className="relative rounded-lg overflow-hidden cursor-pointer" >
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-80 object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 ">
        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
        <p className="text-sm">{post.author} • {post.date}</p>
      </div>
    </div>
  );
}

export default FeaturedPost;
