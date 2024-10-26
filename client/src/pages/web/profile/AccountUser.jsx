import { VscSaveAs } from "react-icons/vsc";
import { useState } from "react";
import { useSelector } from "react-redux";
import { formatDay, formatCurrency } from "../../../ultils/helper";

const AccountUser = () => {
  const customerData = useSelector((state) => state.customer.data);
  const [isEditing, setIsEditing] = useState(false);

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
      <div className="md:w-3/4 lg:w-4/5 xl:w-5/6 bg-white p-6 rounded-lg shadow-lg">

        <div className="space-y-4 mx-auto max-w-[750px]">
          <div className="flex items-center justify-between border-b border-gray-300 pb-2 w-full">
            <div className="w-full">

              {isEditing ? (
                <input
                  type="text"
                  value={customerData?.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="border-b border-red-500 focus:outline-none"
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
              Email: {customerData?.email ? customerData?.email : "Trống"}
            </p>
          </div>
          <div className="border-b border-gray-300 pb-4 mb-2 flex justify-between items-center">
            <p className="text-gray-600 font-light">
              Giới tính: {customerData?.sex}
            </p>
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
              Số điện thoại: {customerData?.phone}
            </p>
          </div>
          <div className="border-b border-gray-300 pb-4 mb-2">
            <p className="text-gray-600 font-light">
              Sinh nhật: {customerData?.birthday || "01/01/1999"}
            </p>
          </div>
          <div className="border-b border-gray-300 pb-4 mb-2">
            <p className="text-gray-600 font-light">
              Ngày tham gia: {formatDay(customerData?.createdAt)}
            </p>
          </div>
          <div className="border-b border-gray-300 pb-4 mb-2">
            <p className="text-gray-600 font-light">
              Tổng tiền tích lũy: {formatCurrency(customerData?.stackMoney)}
            </p>
          </div>
          <div className="border-b border-gray-300 pb-4 mb-2">
            <p className="text-gray-600 font-light">
              Tổng tiền đã mua sắm:
              {formatCurrency(customerData?.totalPurchasePrice)}
            </p>
          </div>
          <div className="border-b border-gray-300 pb-4 mb-2 flex justify-between items-center">
            <p className="text-gray-600 font-light">
              Địa chỉ: {customerData?.address}
            </p>

            <VscSaveAs className="text-gray-500 cursor-pointer" />
          </div>
          <div className="border-b border-gray-300 pb-2 cursor-pointer">
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
