import Sidebar from "../../../components/Profile/SidebarProfile";
import { VscSaveAs } from "react-icons/vsc";
import { useState } from "react";
import { useSelector } from "react-redux";

const AccountUser = () => {
  const customerData = useSelector((state) => state.customer.data);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Nguyễn Sỹ");
  const [gender, setGender] = useState("Nam");
  const [showGenderOptions, setShowGenderOptions] = useState(false);

  const handleIconClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleGenderChange = (newGender) => {
    setGender(newGender);
    setShowGenderOptions(false);
  };

  return (
    <div className="container mx-auto p-2 md:flex">
      {/* Sidebar */}
      <div className="md:w-1/4 lg:w-1/5 xl:w-1/6 mb-4 md:mb-0">
        <Sidebar />
      </div>
      {/* End Sidebar */}

      <div className="md:w-3/4 lg:w-4/5 xl:w-5/6 bg-white p-6 rounded-lg shadow-lg">
        <div className="text-center mb-4">
          <img
            src={customerData?.avatar}
            width="90"
            height="90"
            alt={customerData?.name}
            className="mx-auto mb-2"
          />
          <h2 className="text-2xl font-bold text-gray-500">
            {customerData?.name}
          </h2>
        </div>
        <div className="space-y-4 mx-auto max-w-[750px]">
          <div className="flex items-center justify-between border-b border-gray-300 pb-2 w-full">
            <div className="w-full">
              {isEditing ? (
                <input
                  type="text"
                  value={customerData?.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="border-b border-red-500 focus:outline-none w-full"
                  autoFocus
                />
              ) : (
                <p className="text-gray-600 font-light w-full">
                  Họ và tên: {customerData?.name}
                </p>
              )}
            </div>
            <VscSaveAs
              className="text-gray-500 cursor-pointer"
              onClick={handleIconClick}
            />
          </div>
          <div className="border-b border-gray-300 pb-4 mb-2">
            <p className="text-gray-600 font-light">
              Email: ntanh1612k3@gmail.com
            </p>
          </div>
          <div className="border-b border-gray-300 pb-4 mb-2 flex justify-between items-center">
            <p className="text-gray-600 font-light">Giới tính: {gender}</p>
            <VscSaveAs
              className="text-gray-500 cursor-pointer"
              onClick={() => setShowGenderOptions(!showGenderOptions)}
            />
          </div>
          {showGenderOptions && (
            <div className="border-b border-gray-300 pb-2">
              <p
                className="text-gray-600 font-light cursor-pointer"
                onClick={() => handleGenderChange("Nam")}
              >
                Nam
              </p>
              <p
                className="text-gray-600 font-light cursor-pointer"
                onClick={() => handleGenderChange("Nữ")}
              >
                Nữ
              </p>
            </div>
          )}
          <div className="border-b border-gray-300 pb-4 mb-2">
            <p className="text-gray-600 font-light">
              Số điện thoại: 0344484162
            </p>
          </div>
          <div className="border-b border-gray-300 pb-4 mb-2">
            <p className="text-gray-600 font-light">Sinh nhật: 7/11/2004</p>
          </div>
          <div className="border-b border-gray-300 pb-4 mb-2">
            <p className="text-gray-600 font-light">Ngày tham gia: 8/9/2024</p>
          </div>
          <div className="border-b border-gray-300 pb-4 mb-2">
            <p className="text-gray-600 font-light">Tổng tiền tích lũy: 0đ</p>
          </div>
          <div className="border-b border-gray-300 pb-4 mb-2">
            <p className="text-gray-600 font-light">Tổng tiền đã mua sắm: 0đ</p>
          </div>
          <div className="border-b border-gray-300 pb-4 mb-2 flex justify-between items-center">
            <p className="text-gray-600 font-light">
              Địa chỉ: 129 Thôn 5, Xã Ea Bar, Huyện Buôn Đôn, Đắk Lắk
            </p>
            <VscSaveAs className="text-gray-500 cursor-pointer" />
          </div>
          <div className="border-b border-gray-300 pb-4 mb-2 cursor-pointer">
            <p className="text-gray-600 font-light">Đổi mật khẩu</p>
          </div>
          <div className="flex justify-center mt-4 max-w-[600px] mx-auto ">
            <button className="bg-main text-white font-semibold py-2 px-4 rounded hover:bg-main">
              Cập nhật thông tin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountUser;
