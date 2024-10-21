import { useState } from "react";
import { Input } from "../Input/Input";
export const RegisterForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit({ name, phone, password });
  };

  return (
    <form action="" className="py-5">
      <div className="grid gap-6 mb-6 md:grid-cols-1 lg:grid-cols-2">
        <Input
          label="Họ và tên"
          id="name"
          placeholder="Nhập họ và tên"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Số điện thoại"
          id="phone"
          type="text"
          placeholder="Nhập số điện thoại"
          onChange={(e) => setPhone(e.target.value)}
        />

        <Input
          label="Mật khẩu"
          type="password"
          id="confirmPassword"
          placeholder="Nhập lại mật khẩu"
          iconName={"mdi-light:eye"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          label="Xác nhận mật khẩu"
          type="password"
          id="confirmPassword"
          placeholder="Nhập lại mật khẩu"
          iconName={"mdi-light:eye"}
        />
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="px-4 py-2 my-3 bg-blue-700 w-[100%] text-white rounded hover:bg-blue-800"
      >
        Đăng ký tài khoản
      </button>
    </form>
  );
};
