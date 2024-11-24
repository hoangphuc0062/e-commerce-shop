import { useEffect, useState } from "react";

export const ViewOrder = () => {
  const [data, setData] = useState();

  //   useEffect(() => {
  //     console.log(data);
  //   }, [data]);

  return (
    <div className="flex flex-col justify-center items-center min-h-[400px] ">
      <h1 className="text-[32px]">Tra cứu đơn hàng</h1>
      <div className="w-full p-2">
        <div className="relative flex w-full gap-2">
          <input
            type="search"
            id="default-search"
            className="block w-full  p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nhập mã đơn hàng ?"
            onChange={(e) => setData(e.target.value)}
          />
          <button
            className="bg-main text-white p-2 rounded"
            onClick={() => console.log(data)}
          >
            Tra cứu đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
};
