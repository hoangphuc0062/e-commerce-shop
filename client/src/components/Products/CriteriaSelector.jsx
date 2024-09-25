import { useState, useEffect, useRef } from "react";
import { criteriaData } from "../../data/Product/Criteria";

const CriteriaSelector = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const dropdownRefs = useRef([]); // Store refs for each dropdown

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRefs.current.every((ref) => ref && !ref.contains(event.target))
    ) {
      setOpenIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-wrap gap-2">
      {/* For larger screens (flex wrap layout) */}
      <div className="hidden md:flex md:flex-wrap gap-2">
        {criteriaData.map((criterion, index) => (
          <div
            key={criterion.value}
            className="relative"
            ref={(el) => (dropdownRefs.current[index] = el)}
          >
            <button
              className={`${
                openIndex === index
                  ? "border-main border bg-blue-50 text-gray-800 rounded-md px-3 py-2 flex items-center w-full sm:w-full"
                  : "bg-gray-100 border border-gray-200 text-gray-800 rounded-md px-3 py-2 flex items-center w-full sm:w-full"
              }`}
              onClick={() => toggleDropdown(index)}
            >
              <span className="mr-2">{criterion.text}</span>
            </button>
            {openIndex === index && (
              <div className="absolute top-full left-0 z-10 bg-white shadow-lg rounded-lg mt-2 p-4 w-full sm:w-[300px] grid grid-cols-2 gap-2">
                {criterion.options.map((option) => (
                  <div
                    key={option.value}
                    className="bg-gray-50 border border-gray-300 text-gray-600 rounded-lg px-3 py-1 text-center cursor-pointer"
                  >
                    {option.text}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* For smaller screens (horizontal scrolling) */}
      <div className="md:hidden bg-white p-2 overflow-x-auto whitespace-nowrap cursor-pointer">
        {criteriaData.map((criterion, index) => (
          <div
            key={criterion.value}
            className="relative inline-block"
            ref={(el) => (dropdownRefs.current[index] = el)}
          >
            <button
              className="bg-gray-100 border border-gray-300 text-gray-800 rounded px-4 py-2 flex items-center mr-2"
              onClick={() => toggleDropdown(index)}
            >
              <span className="mr-2">{criterion.text}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CriteriaSelector;
