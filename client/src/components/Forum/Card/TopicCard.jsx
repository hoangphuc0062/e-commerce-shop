import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTags } from "../../../redux/slices/tags";
import { Skeleton } from "@mui/material";

import "./TopicCard.css";

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
          tagData
            .map((item) => ({
              status: item.status,
              id: item._id,
              name: item.name,
              image: item.image,
              createdAt: item.createdAt,
            }))
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
        setLoading(false);
      }, 2000);
    }
  }, [status, tagData]);

  return (
    <div>
      {loading ? (
        <div className="flex space-x-4 py-4 overflow-x-auto custom-scrollbar scroll-smooth">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className={`flex-shrink-0 w-48 h-32 relative p-4`}>
              <Skeleton
                variant="rectangular"
                width={192}
                height={128}
                className="absolute rounded-lg bg-slate-200"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex space-x-4 py-4 overflow-x-auto custom-scrollbar scroll-smooth">
          {data?.map((tags) => (
            <Link
              to={`/tag/${tags.name}`}
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
