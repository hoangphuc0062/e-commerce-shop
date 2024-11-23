import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginCustomer } from "../../redux/slices/customer";
import { handleToast } from "../../ultils/toast";
import { useForm } from "react-hook-form";
import { Input } from "../../components/Input/Input";
import { SSOButton } from "../../components/Button/SSOButton";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from "../../context/AuthContext";

export const Login = () => {
  const { login, setCustomerData } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [captchaValue, setCaptchaValue] = useState(null);
  const { handleSubmit, register } = useForm();
  const [errors, setErrors] = useState("");

  const onChange = (value) => {
    setCaptchaValue(value);
  };

  const onSubmit = (data) => {
    if (!captchaValue) {
      handleToast("error", "Vui lòng xác nhận bạn không phải là robot.");
      return;
    }
    // console.log(data);

    dispatch(loginCustomer(data)).then((res) => {
      if (res.type === "customer/login/fulfilled") {
        handleToast("success", "Đăng nhập thành công");
        login();
        setCustomerData(res.payload.customer);

        // Điều hướng về trang trước đó (hoặc trang mặc định)
        const from = location.state?.from || "/";
        navigate(from, { replace: true });
      } else {
        setErrors("Số điện thoại hoặc mật khẩu không đúng");
      }
    });
  };

  return (
    <section className="mx-2 my-4 pt-16">
      <div className="container flex justify-center">
        <div className="flex-1">
          <div>
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
                readOnly={false}
                errorMessage={errors}
                {...register("phone")}
              />

              <Input
                label="Mật khẩu"
                type="password"
                id="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                iconName={"mdi-light:eye"}
                readOnly={false}
                {...register("password")}
                errorMessage={errors}
              />
            </div>
            <Link className="underline py-4" to={"/forget-password"}>
              Bạn quên mật khẩu?
            </Link>
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={onChange}
              className="mt-4"
            />

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
