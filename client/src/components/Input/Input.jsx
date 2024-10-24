/* eslint-disable react/prop-types */
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { useState, forwardRef } from "react";

// eslint-disable-next-line react/display-name
export const Input = forwardRef(
  (
    { label, type, id, placeholder, iconName, onChange, errorMessage, ...rest },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = (e) => {
      e.preventDefault();
      setShowPassword(!showPassword);
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
            type={type === "password" && showPassword ? "text" : type}
            className={`w-full p-5 font-medium border rounded-md placeholder:opacity-60 ${
              errorMessage
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300"
            }`}
            placeholder={placeholder}
            onChange={onChange}
            ref={ref}
            {...rest}
          />
          {iconName && type === "password" && (
            <button className="absolute right-2 " onClick={handleShowPassword}>
              <Icon
                icon={showPassword ? "mdi:eye-off" : iconName}
                width="24px"
                height="24px"
              />
            </button>
          )}
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    );
  }
);
