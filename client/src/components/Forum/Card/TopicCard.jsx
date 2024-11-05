import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTags } from "../../../redux/slices/tags";

import "../Sidebar/Sidebar.css";
function TopicCard() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.tags.status);
  const tagData = useSelector((state) => state.tags.data);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getAllTags());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded" && Array.isArray(tagData)) {
      setData(
        tagData.map((item) => ({
          status: item.status,
          id: item._id,
          name: item.name,
        }))
      );
    }
  }, [status, tagData]);
  return (
    <div className="flex overflow-x-auto space-x-4 py-4 scrollbar-hide">
      {data?.map((tags) => (
        <Link
          to={`/forum/tag/${tags.id}`}
          key={tags.id}
          className="flex-shrink-0 relative w-48 h-32 rounded-lg overflow-hidden cursor-pointer hover:underline"
        >
          {/*khi có hình ảnh thì thêm: w-48 h-32 */}
          {/* <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          /> */}
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
            <h3 className="text-sm font-semibold truncate hover:underline">
              #{tags.name}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
export default TopicCard;
