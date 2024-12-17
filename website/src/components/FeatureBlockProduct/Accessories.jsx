/* eslint-disable  */
import React from "react";
import { Link } from "react-router-dom";

export const Accessories = ({ title, datas }) => {
  return (
    <div>
      <Link
        to={""}
        className="font-semibold text-xl sm:text-2xl leading-snug sm:leading-relaxed text-gray-800 uppercase cursor-pointer"
      >
        {title}
      </Link>
      <div className="grid grid-cols-3 md:grid-cols-9 md:flex-wrap gap-2 justify-start w-full  overflow-x-auto">
        {datas.map((item) => (
          <Link
            to={item.link}
            key={item.id}
            className=" relative rounded-lg overflow-hidden cursor-pointer hover:underline"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full object-cover"
            />
            <div className="absolute top-0 left-0 right-0 bg-opacity-50 text-white p-2">
              <h3 className="text-sm font-semibold">{item.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
