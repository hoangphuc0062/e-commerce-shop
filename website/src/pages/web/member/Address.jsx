import { Icon } from "@iconify/react";
import { useState } from "react";

export default function Address() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleAddAddress = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseDialog();
    }
  };
  const handleOverlayClickEdit = (e) => {
    if (e.target === e.currentTarget) {
      setIsEditDialogOpen(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center p-2">
        <h1 className="text-2xl text-center font-semibold md:text-lg">
          Địa chỉ của tôi
        </h1>
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
            <button
              className="text-main text-lg mr-3 "
              title="Cập nhật"
              onClick={() => setIsEditDialogOpen(true)}
            >
              <Icon
                icon="akar-icons:edit"
                width="1.5rem"
                height="1.5rem"
                className="inline"
              />
            </button>
          </div>
        </div>
      </div>
      <hr />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 sm:py-2 px-3 sm:px-4 rounded-md mt-2 md:mt-0 text-sm flex items-center justify-center w-full"
        onClick={handleAddAddress}
      >
        <Icon
          icon="mdi-light:plus"
          width="1.5rem"
          height="1.5rem"
          className="inline"
        />
        <span className="ml-2">Thêm địa chỉ mới</span>
      </button>
      {isDialogOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-white p-8 rounded-md w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Thêm địa chỉ mới</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Tên</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Số điện thoại</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Địa chỉ</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                  onClick={handleCloseDialog}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isEditDialogOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClickEdit}
        >
          <div className="bg-white p-8 rounded-md w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Edit Address</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
