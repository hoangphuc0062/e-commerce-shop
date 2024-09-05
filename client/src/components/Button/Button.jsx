/* eslint-disable react/prop-types */
export const Button = ({ icon: IconComponent, content = "" }) => {
  return (
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md flex items-center justify-center">
    <div className="flex items-center justify-center">
      {IconComponent && <IconComponent className="text-2xl" />}
    </div>
    <div className="ml-2 flex items-center justify-center">
      {content && <div className="block text-sm sm:text-base md:text-lg lg:text-xl">{content}</div>}
    </div>
  </button>

  );
};