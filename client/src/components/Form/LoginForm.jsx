/* eslint-disable react/prop-types */
import { useState } from "react";
import icons from "../../ultils/icon";
import { SSOButton } from "../Button/SSOButton";
import { Link } from "react-router-dom";

export const LoginForm = ({ onSubmit }) => {
  const { IoEyeOffOutline, IoEyeOutline, FcGoogle } = icons;

  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const handleShowPw = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit({ phone, password });
  };
  return (
    <form action="" className="py-5">
      <div className="grid gap-6 mb-6 md:grid-cols-1 lg:grid-cols-2">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
            Số điện thoại
          </label>
          <input
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="example@gmail.com"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Mật khẩu
          </label>
          <div className="flex relative justify-center items-center">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "password" : "text"}
              className=" relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <button className=" absolute right-2 p-1" onClick={handleShowPw}>
              {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </button>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center">
        <div className="h-[0.5px] w-[100%] bg-gray-700 mx-2"></div>
        <span>Hoặc</span>
        <div className="h-[0.5px] w-[100%] bg-gray-700 mx-2"></div>
      </div>
      <SSOButton name="Đăng nhập với Google" icon={FcGoogle} fw />

      <div className="flex justify-between">
        <div>
          <input type="checkbox" className="mx-2 transform scale-150 p-2" />
          <span>Nhớ mật khẩu</span>
        </div>
        <div>
          <Link className="text-main hover:underline">Quên mật khẩu ?</Link>
        </div>
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="px-4 py-2 my-3 bg-blue-700 w-[100%] text-white rounded hover:bg-blue-800"
      >
        Đăng nhập
      </button>
    </form>
  );
};
