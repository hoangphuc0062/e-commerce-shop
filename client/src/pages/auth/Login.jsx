import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/customer";
import { handleToast } from "../../ultils/toast";
import { useForm } from "react-hook-form";
import { Input } from "../../components/Input/Input";
import { SSOButton } from "../../components/Button/SSOButton";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

export const Login = () => {
  const { handleSubmit, register } = useForm();
  const [errors, setErrors] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    // console.log(data);
    dispatch(login(data)).then((res) => {
      if (res.type === "customer/login/fulfilled") {
        handleToast("success", "Đăng nhập thành công");
      } else {
        setErrors("Số điện thoại hoặc mật khẩu không đúng");
      }
    });
  };

  return (
    <section className="mx-2">
      <div className="container flex justify-center">
        <div className="flex-1">
          <div>
            <h1>Logo here</h1>
            <h1 className="text-[32px] font-bold">Chào mừng bạn trở lại</h1>
          </div>
          <div>
            <span className="mr-1 text-gray-400">
              Bạn đã có tài khoản đăng nhập.
            </span>
            <span>
              <Link to={"/register"} className="text-main hover:underline">
                Đăng Ký
              </Link>
            </span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} action="" className="py-5">
            <div className="grid gap-6 mb-6 grid-flow-col-1 ">
              <Input
                label="Số điện thoại"
                id="phone"
                type="text"
                placeholder="Nhập số điện thoại"
                errorMessage={errors}
                {...register("phone")}
              />

              <Input
                label="Mật khẩu"
                type="password"
                id="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                iconName={"mdi-light:eye"}
                {...register("password")}
                errorMessage={errors}
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 my-3 bg-blue-700 w-[100%] text-white rounded hover:bg-blue-800"
            >
              Đăng nhập
            </button>
          </form>
          <div className="flex w-full items-center">
            <div className="h-[0.5px] w-[100%] bg-gray-700 mx-2"></div>
            <span>Hoặc</span>
            <div className="h-[0.5px] w-[100%] bg-gray-700 mx-2"></div>
          </div>
          <SSOButton name="Đăng nhập với Google" icon={FcGoogle} fw />
        </div>
        <div className="hidden lg:flex flex-1 justify-center ">
          <img
            src="https://res.cloudinary.com/dgthe0zuj/image/upload/v1725432318/illustration_atsn9q.png"
            alt="login-img"
          />
        </div>
      </div>
    </section>
  );
};
