import { Icon } from "@iconify/react/dist/iconify.js";

export default function Address() {
  return (
    <div>
      <div className="flex justify-between items-center p-2">
        <h1 className="text-2xl text-center font-semibold">Địa chỉ của tôi</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-md">
          <Icon
            icon="mdi-light:plus"
            width="2rem"
            height="2rem"
            className="inline"
          />
          <span>Thêm địa chỉ mới</span>
        </button>
      </div>
      <hr />
      {/* Address */}
      <div className="flex justify-between items-center p-2 mb-2">
        <div>
          <div>
            <span className="text-lg font-bold">Nguyễn Dương Hoàng Phúc</span>
            <span className="text-gray-500 ">| 0773440062 </span>
          </div>
          <div className="text-gray-500 ">
            <div>Hẻm 189 Trần Quý Cáp</div>
            <div>P.Tự An, Tp.Buôn Ma Thuột, Đắk Lắk</div>
          </div>
          <div className="outline outline-main text-main w-fit p-2 mt-2 rounded-sm">
            Mặc định
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div>
            <button className="text-main text-lg mr-3">Cập nhật</button>
            <button className="text-main text-lg mr-3">Xóa</button>
          </div>
          <div>
            <button className="text-gray-700 text-lg text-center outline outline-gray-700 p-1 rounded-sm">
              Thiết lập mặc định
            </button>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
