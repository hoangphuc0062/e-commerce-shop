/* eslint-disable react/prop-types */

export const Contact = ({ icon: IconComponent, title = "", content = "" }) => {
  return (
    <button className="hidden lg:flex items-center justify-center text-xs hover:bg-hv word-break p-2 rounded">
      <div className="text-2xl">{IconComponent && <IconComponent />}</div>
      <div className="ml-2 text-left">
        {title && <div className="text-[12px] block">{title}</div>}
        {content && <div className="max-w-16">{content}</div>}
      </div>
    </button>
  );
};
