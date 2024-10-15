const OptionCard = ({ option, isSelected, onClick, children }) => (
  <div
    className={`p-4 m-2 flex flex-col items-center justify-center border rounded cursor-pointer w-full 
      ${isSelected ? "border-main text-gray-900" : "border-gray-300"}
      sm:w-1/2 md:w-1/3 lg:w-1/4
    `}
    onClick={onClick}
  >
    {children}
  </div>
);

export default OptionCard;
