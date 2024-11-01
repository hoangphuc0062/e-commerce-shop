/* eslint-disable react/prop-types */
import { useState, useRef, forwardRef, useEffect } from "react";
import { Icon } from "@iconify/react";

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
        onChange && onChange({ target: { value: inputValue } });
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
        onChange(e);
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
            ref={inputRef} // Sử dụng inputRef để auto-focus
            readOnly={!isEditing && readOnly}
            {...rest}
          />

          {edit && (
            <button
              className="absolute right-2"
              onClick={handleEdit}
              title="Chỉnh sửa" // Tooltip text for edit button
            >
              {iconName && <Icon icon={iconName} width="24px" height="24px" />}
            </button>
          )}

          {type === "password" && (
            <button
              className="absolute right-2 mr-8"
              onClick={handleShowPassword}
            >
              <Icon
                icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
                width="24px"
                height="24px"
              />
            </button>
          )}
        </div>
      </div>
    );
  }
);

export const CustomInputField = ({
  label,
  name,
  inputValue,
  onChange,
  errorMessage,
  onBlur,
  showPassword,
  id,
  togglePasswordVisibility,
  placeholder,
}) => {
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
          type={
            id === "password" && showPassword
              ? "text"
              : id === "password"
              ? "password"
              : "text"
          }
          name={name}
          placeholder={placeholder}
          value={inputValue}
          onChange={onChange}
          onBlur={onBlur}
          className="w-full p-5 font-medium border rounded-md placeholder:opacity-60"
        />
        {id === "password" && (
          <button
            type="button"
            className="absolute right-2 mr-2"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <Icon icon={"mdi:eye"} width={30} />
            ) : (
              <Icon icon={"mdi:eye-off"} width={30} />
            )}
          </button>
        )}
      </div>

      {errorMessage && (
        <div id={id} className="text-red-600 text-sm">
          {errorMessage}
        </div>
      )}
    </div>
  );
};
