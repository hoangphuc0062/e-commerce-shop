import { useDispatch } from "react-redux";
import { handleToast } from "../../ultils/toast";
import { useForm } from "react-hook-form";
import { Input } from "../../components/Input/Input";
import { SSOButton } from "../../components/Button/SSOButton";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export const ForgetPassoword = () => {
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
    // dispatch(login(data)).then((res) => {
    //   if (res.type === "customer/login/fulfilled") {
    //     handleToast("success", "Đăng nhập thành công");
    //   } else {
    //     setErrors("Số điện thoại hoặc mật khẩu không đúng");
    //   }
    // });
  };

  return (
    <section className="mx-2">
      <div className="container flex justify-center">
        <div className="flex-1">
          <div>
            <h1 className="text-[32px] font-bold">
              Bạn quên mật khẩu của mình
            </h1>
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
            </div>

            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={onChange}
              className="mt-4"
            />

            <button
              type="submit"
              className="px-4 py-2 my-3 bg-blue-700 w-[100%] text-white rounded hover:bg-blue-800"
            >
              Lấy lại mật khẩu
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
