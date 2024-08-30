import React from "react";

export const Contact = ({ icon: IconComponent, title, content = "" }) => {
  return (
    <button className=" hidden lg:flex items-center text-xs">
      <div className="text-2xl">{IconComponent && <IconComponent />}</div>
      <div className="ml-2 text-left">
        <div className="text-[12px] block">{title}</div>
        {content && <div className="block h-4">{content}</div>}
      </div>
    </button>
  );
};
