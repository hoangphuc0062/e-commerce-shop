/* eslint-disable react/prop-types */
export const Button = ({
  icon: IconComponent,
  content = "",
  subContent = "",
}) => {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-md flex items-center justify-center w-full">
      <div className="flex items-center justify-center">
        {IconComponent && (
          <IconComponent className="text-lg sm:text-xl md:text-2xl lg:text-3xl" />
        )}
      </div>
      <div className="ml-2 flex items-center justify-center flex-col">
        {subContent && (
          <div className="block text-xs sm:text-sm md:text-base lg:text-lg">
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
