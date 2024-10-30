/* eslint-disable react/prop-types */
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { useState, useRef, forwardRef, useEffect } from "react";

// eslint-disable-next-line react/display-name
export const Input = forwardRef(
  (
    {
      label,
      type,
      value,
      id,
      placeholder,
      iconName,
      edit,
      onChange,
      errorMessage,
      readOnly = true, // Default to readOnly
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const inputRef = useRef(null);

    const handleShowPassword = (e) => {
      e.preventDefault();
      setShowPassword(!showPassword);
    };

    const handleEdit = (e) => {
      e.preventDefault();
      if (isEditing && edit) {
        onChange && onChange(inputValue);
      }
      setIsEditing(!isEditing);
    };

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    useEffect(() => {
      if (isEditing && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isEditing]);

    const handleChange = (e) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      if (onChange) {
        onChange(e); // Để react-hook-form có thể quản lý onChange
      }
    };

    return (
      <div className="flex flex-col w-full gap-2">
        <div className="flex justify-between">
          <label htmlFor={id} className="font-semibold capitalize">
            {label}
          </label>
        </div>
        <div className="flex relative justify-center items-center">
          <input
            id={id}
            value={inputValue}
            type={type === "password" && showPassword ? "text" : type}
            className={`w-full p-5 font-medium border rounded-md placeholder:opacity-60 ${
              errorMessage
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300"
            } ${isEditing ? "focus:outline-blue-700 outline-blue-700" : ""}`}
            placeholder={placeholder}
            onChange={handleChange}
            ref={ref} // Để react-hook-form có thể quản lý ref
            readOnly={!isEditing && readOnly} // Đúng cách để xử lý readOnly
            {...rest}
          />
          {iconName && type === "password" && (
            <button className="absolute right-2" onClick={handleShowPassword}>
              <Icon
                icon={showPassword ? "mdi:eye-off" : iconName}
                width="24px"
                height="24px"
              />
            </button>
          )}
          {iconName && edit && (
            <button className="absolute right-2" onClick={handleEdit}>
              <Icon
                icon={iconName}
                width="24px"
                height="24px"
                className="p-3"
              />
            </button>
          )}
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    );
  }
);
