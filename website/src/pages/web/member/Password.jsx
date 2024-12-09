import { useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

import { changePassword } from "../../../redux/slices/auth";
import { handleToast } from "../../../ultils/toast";

export default function Password() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const dispatch = useDispatch();
  const token = Cookies.get("accessToken");

  const validate = () => {
    let tempErrors = {};
    if (!passwordData.currentPassword) {
      tempErrors.currentPassword = "Mật khẩu hiện tại không được để trống";
    }
    if (!passwordData.newPassword) {
      tempErrors.newPassword = "Mật khẩu mới không được để trống";
    } else if (passwordData.newPassword.length < 8) {
      tempErrors.newPassword = "Mật khẩu mới phải có ít nhất 8 ký tự";
    }
    if (!passwordData.confirmPassword) {
      tempErrors.confirmPassword = "Xác nhận mật khẩu không được để trống";
    } else if (passwordData.confirmPassword !== passwordData.newPassword) {
      tempErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setPasswordData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const toggleShowPassword = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Kiểm tra dữ liệu nhập
    if (!validate()) {
      handleToast("error", "Vui lòng kiểm tra lại thông tin");
      return;
    }
  
    const { currentPassword, newPassword } = passwordData;
    const payload = { currentPassword, newPassword }; // Dữ liệu gửi lên server
  
    try {
      // Gửi yêu cầu đổi mật khẩu lên server qua Redux
      await dispatch(changePassword(payload)).unwrap();
  
      // Xử lý khi đổi mật khẩu thành công
      handleToast("success", "Đổi mật khẩu thành công");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      // Xử lý khi đổi mật khẩu thất bại
      console.error("Error updating password:", error);
      handleToast("error", error.message || "Đổi mật khẩu thất bại");
    }
  };
  

  return (
    <div className="space-y-4 mx-auto">
      <h2 className="text-2xl text-center font-semibold">Đổi mật khẩu</h2>
      <form className="flex flex-col gap-5">
        {/* Mật khẩu hiện tại */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-[24px]">
            Mật khẩu hiện tại
          </label>
          <div className="relative mt-1">
            <input
              type={showPassword.currentPassword ? "text" : "password"}
              placeholder="Mật khẩu hiện tại"
              value={passwordData.currentPassword}
              onChange={(e) =>
                handleChange("currentPassword", e.target.value)
              }
              className={`w-full px-6 py-4 border ${
                errors.currentPassword ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-blue-500 focus:border-blue-500 pr-10`}
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={() => toggleShowPassword("currentPassword")}
            >
              {showPassword.currentPassword ? "🙈" : "👁️"}
            </span>
          </div>
          {errors.currentPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.currentPassword}
            </p>
          )}
        </div>

        {/* Mật khẩu mới */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-[24px]">
            Mật khẩu mới
          </label>
          <div className="relative mt-1">
            <input
              type={showPassword.newPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu mới"
              value={passwordData.newPassword}
              onChange={(e) => handleChange("newPassword", e.target.value)}
              className={`w-full px-6 py-4 border ${
                errors.newPassword ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-blue-500 focus:border-blue-500 pr-10`}
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={() => toggleShowPassword("newPassword")}
            >
              {showPassword.newPassword ? "🙈" : "👁️"}
            </span>
          </div>
          {errors.newPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
          )}
        </div>

        {/* Xác nhận mật khẩu */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-[24px]">
            Xác nhận mật khẩu
          </label>
          <div className="relative mt-1">
            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              placeholder="Nhập lại mật khẩu mới"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                handleChange("confirmPassword", e.target.value)
              }
              className={`w-full px-6 py-4 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-blue-500 focus:border-blue-500 pr-10`}
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={() => toggleShowPassword("confirmPassword")}
            >
              {showPassword.confirmPassword ? "🙈" : "👁️"}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md w-1/4"
          >
            Cập nhật
          </button>
          <button
            type="button"
            className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md w-1/4"
            onClick={() =>
              setPasswordData({ newPassword: "", confirmPassword: "" })
            }
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
