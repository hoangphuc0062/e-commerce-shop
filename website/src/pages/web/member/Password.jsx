import { useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

import { changePassword } from "../../../redux/slices/auth";
import { handleToast } from "../../../ultils/toast";

import { Input } from "../../../components/Input/Input";

export default function Password() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const token = Cookies.get("accessToken");
  const validate = () => {
    let tempErrors = {};
    if (!passwordData.newPassword) {
      tempErrors.newPassword = "Mật khẩu mới không được để trống";
    }
    if (passwordData.newPassword.length < 8) {
      tempErrors.newPassword = "Mật khẩu mới phải có ít nhất 8 ký tự";
    }

    if (!passwordData.confirmPassword) {
      tempErrors.confirmPassword = "Xác nhận mật khẩu không được để trống";
    }
    if (passwordData.confirmPassword !== passwordData.newPassword) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(passwordData, token);
    const { currentPassword, newPassword } = passwordData;
    const data = { currentPassword, newPassword };
    dispatch(changePassword(data));
    // console.log(data);

    if (!validate()) {
      handleToast("error", "Vui lòng kiểm tra lại thông tin");
      return;
    }
    // console.log("go here");
    try {
      await dispatch(
        changePassword({ password: passwordData.newPassword })
      ).unwrap();
      handleToast("success", "Đổi mật khẩu thành công");
      setPasswordData({ newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.error("Error updating password:", error);
      handleToast("error", "Đổi mật khẩu thất bại");
    }
  };

  return (
    <div className="space-y-4 mx-auto">
      <h2 className="text-2xl text-center font-semibold">Đổi mật khẩu</h2>
      <form className="flex flex-col gap-5">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-[24px]">
            Mật khẩu hiện tại
          </label>
          {/* Input */}
          <div className="relative mt-1">
            <input
              type="password"
              placeholder="Mật khẩu hiện tại"
              value={passwordData.currentPassword}
              onChange={(e) => handleChange("currentPassword", e.target.value)}
              className={`w-full px-4 py-2 border ${
                errors.currentPassword ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-blue-500 focus:border-blue-500 pr-10`}
            />

            {/* Icon */}
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <i className="hugeicons:edit-01"></i>
            </span>
          </div>

          {/* Error Message */}
          {errors.currentPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.currentPassword}
            </p>
          )}
        </div>

        <Input
          label="Mật khẩu mới"
          type="password"
          value={passwordData.newPassword}
          placeholder="Nhập mật khẩu mới"
          edit
          iconName="hugeicons:edit-01"
          onChange={(e) => handleChange("newPassword", e.target.value)}
        />
        {errors.newPassword && (
          <p className="text-red-500 text-xs">{errors.newPassword}</p>
        )}

        <Input
          label="Xác nhận mật khẩu"
          type="password"
          value={passwordData.confirmPassword}
          placeholder="Nhập lại mật khẩu mới"
          edit
          iconName="hugeicons:edit-01"
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
        )}

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
