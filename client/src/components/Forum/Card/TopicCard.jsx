import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTags } from "../../../redux/slices/tags";
import { Skeleton } from "@mui/material";

import "../Sidebar/Sidebar.css";

function TopicCard() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.tags.status);
  const tagData = useSelector((state) => state.tags.data);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllTags());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded" && Array.isArray(tagData)) {
      setTimeout(() => {
        setData(
          tagData.map((item) => ({
            status: item.status,
            id: item._id,
            name: item.name,
            image: item.image,
          }))
        );
        setLoading(false);
      }, 500);
    }
  }, [status, tagData]);

  const renderSkeleton = () => {
    return (
      <div className="flex overflow-x-auto space-x-4 py-4 scrollbar-hide">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex-shrink-0 relative w-48 h-32 rounded-lg overflow-hidden cursor-pointer"
          >
            <Skeleton height="100%" width="100%" />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
              <Skeleton width="100%" height="100%" />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {loading ? (
        renderSkeleton()
      ) : (
        <div className="flex overflow-x-auto space-x-4 py-4 scrollbar-hide">
          {data?.map((tags) => (
            <Link
              to={`/forum/tag/${tags.name}`}
              key={tags.id}
              className="flex-shrink-0 relative w-48 h-32 rounded-lg overflow-hidden cursor-pointer hover:underline"
            >
              <img
                src={tags.image}
                alt={tags.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                <h3 className="text-sm font-semibold truncate hover:underline">
                  #{tags.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default TopicCard;
