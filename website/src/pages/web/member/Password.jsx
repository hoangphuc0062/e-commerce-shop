import { useState } from "react";
import { Input } from "../../../components/Input/Input";
import { useDispatch } from "react-redux";
import { updatePassword } from "../../../redux/slices/auth";
import { handleToast } from "../../../ultils/toast";

export default function Password() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

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
    console.log(passwordData);
    // if (!validate()) {
    //   handleToast("error", "Vui lòng kiểm tra lại thông tin");
    //   return;
    // }
    // console.log("go here");
    //   try {
    //       await dispatch(
    //         updatePassword({ password: passwordData.newPassword })
    //       ).unwrap();
    //       handleToast("success", "Đổi mật khẩu thành công");
    //       setPasswordData({ newPassword: "", confirmPassword: "" });
    //     }
    //     catch (error) {
    //       console.error("Error updating password:", error);
    //       handleToast("error", "Đổi mật khẩu thất bại");
    //     }
  };

  return (
    <div className="space-y-4 mx-auto">
      <h2 className="text-2xl text-center font-semibold">Đổi mật khẩu</h2>
      <form className="flex flex-col gap-5">
        <Input
          label="Mậu khẩu hiện tại"
          type="password"
          value={passwordData.currentPassword}
          placeholder="Mậu khẩu hiện tại"
          edit
          iconName="hugeicons:edit-01"
          onChange={(e) => handleChange("currentPassword", e.target.value)}
        />
        {errors.currentPassword && (
          <p className="text-red-500 text-xs">{errors.currentPassword}</p>
        )}

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
