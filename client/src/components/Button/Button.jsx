/* eslint-disable react/prop-types */
export const Button = ({ icon: IconComponent, content = "", subContent = "" }) => {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md flex items-center justify-center">
      <div className="flex items-center justify-center">
        {IconComponent && <IconComponent className="text-2xl" />}
      </div>
      <div className="ml-2 flex items-center justify-center flex-col">
        {subContent && (
          <div className="block text-sm sm:text-base md:text-lg lg:text-xl">
            {subContent}
          </div>
        )}
        {content && (
          <div className="block text-xs sm:text-sm md:text-base lg:text-lg">
            {content}
          </div>
        )}
      </div>
    </button>
  );
};