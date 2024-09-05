import React from "react";

export const SSOButton = ({
  name,
  fw,
  icon: IconComponent,
  colorIcon,
  handle,
}) => {
  return (
    <button
      className={`flex items-center justify-center px-4 py-2 my-3 text-black border border-gray-300 rounded hover:bg-gray-100  ${
        fw ? "w-[100%]" : ""
      }  `}
      onClick={handle}
    >
      {IconComponent && (
        <IconComponent className={`mx-2 ${colorIcon || "text-blue-500"}`} />
      )}
      <span>{name}</span>
    </button>
  );
};
