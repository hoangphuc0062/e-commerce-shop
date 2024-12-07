import { Icon } from "@iconify/react";
export default function SSOButton({ name, fw, iconName, colorIcon, handle }) {
  return (
    <button
      className={`flex items-center justify-center px-4 py-2 my-3 text-black border border-gray-300 rounded hover:bg-gray-100 ${
        fw ? "w-[100%]" : ""
      }`}
      onClick={handle}
    >
      {iconName && (
        <Icon
          icon={iconName}
          width={30}
          style={colorIcon && { color: colorIcon }}
        />
      )}
      {/* Đảm bảo iconName hợp lệ */}
      <span className="ml-3">{name}</span>
    </button>
  );
}
