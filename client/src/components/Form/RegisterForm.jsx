import { useState } from "react";
import icons from "../../ultils/icon";
import { SSOButton } from "../Button/SSOButton";

export const RegisterForm = ({ onSubmit }) => {
  const { IoEyeOffOutline, IoEyeOutline, FcGoogle, FaFacebook } = icons;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [error, setError] = useState(false);
  const handleShowPw = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const handleShowConfirmPw = (e) => {
    e.preventDefault();
    setshowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(true);
      console.log("Mật khẩu không khớp");
      return;
    }
    onSubmit({ name, phone, password });
  };

  return (
    <form action="" className="py-5">
      <div className="grid gap-6 mb-6 md:grid-cols-1 lg:grid-cols-2">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
            Họ và tên
          </label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nhập họ và tên"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
            Số điện thoại
          </label>
          <input
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nhập số điện thoại"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Mật khẩu
          </label>
          <div className="flex relative justify-center items-center">
            <input
              type={showPassword ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <button className=" absolute right-2 p-1" onClick={handleShowPw}>
              {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </button>
          </div>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nhập lại mật khẩu
          </label>
          <div className="flex relative justify-center items-center">
            <input
              type={showConfirmPassword ? "password" : "text"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className=" relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <button
              className=" absolute right-2 p-1"
              onClick={handleShowConfirmPw}
            >
              {showConfirmPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
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
      <button
        onClick={handleSubmit}
        className="px-4 py-2 my-3 bg-blue-700 w-[100%] text-white rounded hover:bg-blue-800"
      >
        Đăng ký
      </button>
    </form>
  );
};
