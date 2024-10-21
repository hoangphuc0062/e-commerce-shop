import { useState, useEffect, useRef } from "react";
import icons from "../../ultils/icon";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import MenuTree from "../MenuTree/MenuTree";

const Category = () => {
  const { TbCategoryPlus } = icons;
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black opacity-30" />}
      <Menu as="div" className="relative inline-block text-left" ref={menuRef}>
        <div>
          <MenuButton
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex justify-center gap-x-1 rounded-md bg-hv px-4 py-3 font-semibold text-white"
          >
            <TbCategoryPlus className="w-6 h-6" />
            Danh mục
          </MenuButton>
        </div>

        <MenuItems
          className={`absolute right-[151px] top-[69px] z-10 mt-2 w-60 rounded-md shadow-lg text-gray-900 bg-white ${
            isOpen ? "" : "hidden"
          }`}
        >
          <MenuTree />
        </MenuItems>
      </Menu>
    </>
  );
};

export default Category;
