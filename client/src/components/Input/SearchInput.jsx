import React from "react";
import icons from "../../ultils/icon";
export const SearchInput = () => {
  const { AiOutlineSearch } = icons;
  return (
    <form class="mx-auto w-full min-w-3">
      <label
        for="default-search"
        class="text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Bạn muốn mua gì ?
      </label>
      <div class="relative">
        <input
          type="search"
          id="default-search"
          class="block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Bạn muốn tìm kiếm gì"
        />
        <button
          type="submit"
          class="text-white absolute end-3 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <AiOutlineSearch />
        </button>
      </div>
    </form>
  );
};
