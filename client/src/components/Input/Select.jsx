import { useState } from "react";

// eslint-disable-next-line react/prop-types
export const Select = ({ label, values = [], onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold capitalize">{label}</label>
      <select
        className="w-full p-5 font-medium border rounded-md placeholder:opacity-60"
        value={inputValue}
        onChange={handleChange}
      >
        {values.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};
