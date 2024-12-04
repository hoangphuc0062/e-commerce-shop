import { useEffect, useState } from "react";

export const ViewOrder = () => {
  const [data, setData] = useState();

  //   useEffect(() => {
  //     console.log(data);
  //   }, [data]);

  return (
    <div className="flex flex-col justify-center items-center min-h-[400px] gap-2">
      <h1 className="text-[32px]">Tra cứu đơn hàng</h1>
      <div className="w-full p-2">
        <div className="relative flex w-full gap-2">
          <input
            type="search"
            id="default-search"
            className="block w-full  p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
      <div className="flex flex-col md:flex-row items-start text-left gap-3 w-full p-2 ">
        <div className="flex w-full md:w-2/3">
          <div className="bg-white w-full p-4 rounded-md shadow-md">
            <h2 className="text-lg font-bold border-b pb-2 mb-4">
              DANH SÁCH SẢN PHẨM
            </h2>
            <div className="flex items-center">
              <img
                src=""
                alt="Sản phẩm"
                className="w-24 h-24 object-cover mr-4"
              />
              <div>
                <p className="font-semibold">
                  Vintas Flannel - High Top - Cement
                </p>
                <p>Giá: 720.000 VNĐ</p>
                <p>Size: 38</p>
                <p>Số lượng: 1</p>
              </div>
            </div>
            <p className="text-right font-bold mt-4">720.000 VNĐ</p>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-1/3 gap-1 shadow-lg rounded-lg">
          <div className="bg-white w-full px-4 ">
            <h2 className="text-lg font-bold border-b pb-2 mb-4">
              THÔNG TIN GIAO NHẬN
            </h2>
            <p>Họ tên: Nguyễn Dương Hoàng Phúc</p>
            <p>Điện thoại: 0773440062</p>
            <p>Email: bmtck0000@gmail.com</p>
            <p>Địa chỉ: hẻm 189 Trần Quý Cáp</p>
            <p>Phường/xã: Phường Tự An</p>
            <p>Quận/Huyện: Thành phố Buôn Ma Thuột</p>
            <p>Thành phố/Tỉnh: Đắk Lắk</p>
          </div>
          <div className="bg-white px-4">
            <h2 className="text-lg font-bold border-b pb-2 mb-4">THANH TOÁN</h2>
            <div className="flex justify-between">
              <p>Trị giá đơn hàng:</p>
              <p>720.000 VNĐ</p>
            </div>
            <div className="flex justify-between">
              <p>Phương thức thanh toán:</p>
              <p>Thanh toán VNPAY</p>
            </div>
            <div className="flex justify-between">
              <p>Giảm giá:</p>
              <p>0 VNĐ</p>
            </div>
            <div className="flex justify-between">
              <p>Phí giao hàng:</p>
              <p>30.000 VNĐ</p>
            </div>
            <div className="flex justify-between">
              <p>Phí thanh toán:</p>
              <p>0 VNĐ</p>
            </div>
            <div className="border-t my-2"></div>
            <div className="flex justify-between font-bold py-2">
              <p>Tổng thanh toán:</p>
              <p>750.000 VNĐ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
