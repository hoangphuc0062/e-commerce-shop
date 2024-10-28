import { Link } from "react-router-dom";
import { HagTagDB } from "../../../data/Forum/HagTagDB";
import "../Sidebar/Sidebar.css";
function TopicCard() {
  return (
    <div className="flex overflow-x-auto space-x-4 py-4 scrollbar-hide">
      {HagTagDB.map((item) => (
        <Link
          to={item.link}
          key={item.id}
          className="flex-shrink-0 w-48 h-32 relative rounded-lg overflow-hidden cursor-pointer hover:underline"
        >
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
            <h3 className="text-sm font-semibold truncate hover:underline">
              #{item.name}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
export default TopicCard;
