import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import { Input } from "../../components/Input/Input";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { handleToast } from "../../ultils/toast";
import { registerCustomer } from "../../redux/slices/customer";
import messageConverter from "../../ultils/converMes";
import { useState } from "react";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [captchaValue, setCaptchaValue] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onChange = (value) => {
    setCaptchaValue(value);
  };

  const onSubmit = async (rawData) => {
    if (!captchaValue) {
      handleToast("error", "Vui lòng xác nhận bạn không phải là robot.");
      return;
    }

    const { name, phone, password } = rawData;
    const data = { name, phone, password };

    dispatch(registerCustomer(data)).then((res) => {
      if (res.type === "customer/register/fulfilled") {
        handleToast("success", "Đăng ký thành công");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        const message = messageConverter(res.payload.mes);
        handleToast("error", message);
      }
    });
  };

  return (
    <section className="mx-2 my-4 pt-16 ">
      <div className="container flex justify-center">
        <div className="flex-1">
          <div>
            <h1 className="text-[32px] font-bold">Chào mừng bạn trở lại</h1>
          </div>
          <div>
            <span className="mr-1 text-gray-400">
              Bạn đã có tài khoản đăng nhập?
            </span>
            <span>
              <Link to={"/login"} className="text-main hover:underline">
                Đăng nhập ngay
              </Link>
            </span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="py-5">
            <div className="grid gap-6 mb-6 md:grid-cols-1 lg:grid-cols-2">
              <Input
                label="Họ và tên"
                id="name"
                readOnly={false}
                placeholder="Nhập họ và tên"
                {...register("name", {
                  required: "Bạn cần nhập họ và tên để đăng ký",
                  minLength: { value: 2, message: "Họ và tên quá ngắn" },
                })}
                errorMessage={errors.name?.message}
              />
              <Input
                label="Số điện thoại"
                id="phone"
                type="text"
                readOnly={false}
                placeholder="Nhập số điện thoại"
                {...register("phone", {
                  required: "Bạn cần điên thoại để đăng ký",
                  minLength: { value: 10, message: "Số điện thoại quá ngắn" },
                })}
                errorMessage={errors.phone?.message}
              />

              <Input
                label="Mật khẩu"
                type="password"
                readOnly={false}
                id="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                iconName={"mdi-light:eye"}
                {...register("password", {
                  required: "Bạn cần nhập mật khẩu để đăng ký",
                  minLength: { value: 6, message: "Mật khẩu quá ngắn" },
                })}
                errorMessage={errors.password?.message}
              />
              <Input
                label="Xác nhận mật khẩu"
                type="password"
                id="confirmPassword"
                readOnly={false}
                placeholder="Nhập lại mật khẩu"
                iconName={"mdi-light:eye"}
                {...register("confirmPassword", {
                  required: "Bạn cần xác nhận lại mật khẩu",
                  validate: (value) =>
                    value === watch("password") || "Mật khẩu không khớp",
                })}
                errorMessage={errors.confirmPassword?.message}
              />
            </div>
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={onChange}
            />
            <button
              type="submit"
              className="px-4 py-2 my-3 bg-blue-700 w-[100%] text-white rounded hover:bg-blue-800"
            >
              Đăng ký tài khoản
            </button>
          </form>
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
