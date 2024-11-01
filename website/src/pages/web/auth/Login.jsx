import { useContext, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { handleToast } from "../../../ultils/toast";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SSOButton } from "../../../components/Button";
import { CustomInputField } from "../../../components/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { login, resetState } from "../../../redux/slices/auth";
import { UserContext } from "../../../context/AuthContext";

export default function Login() {
  const { setUser, setLoginAuth } = useContext(UserContext);
  const dispatch = useDispatch();
  const [captchaValue, setCaptchaValue] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .required("Vui lòng nhập số điện thoại hoặc email.")
        .matches(/^[0-9]*$/, "Số điện thoại không hợp lệ. Vui lòng nhập lại."),
      password: Yup.string()
        .required("Vui lòng nhập mật khẩu.")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
    }),
    onSubmit: async (values) => {
      if (!captchaValue) {
        handleToast("error", "Vui lòng xác nhận bạn không phải là robot.");
        return;
      }
      dispatch(login(values));
    },
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);
  const data = useSelector((state) => state.auth.data.rs);
  useEffect(() => {
    if (status === "success") {
      handleToast("success", "Đăng nhập thành công.");
      setLoginAuth(true);
      setUser(data);
      dispatch(resetState({ key: "status", value: "idle" }));
    }
    if (status === "failed") {
      handleToast("error", error.mes);
    }
  }, [status, error, data, setUser, setLoginAuth, dispatch]);

  return (
    <section className="mx-2 my-4">
      <div className="container flex justify-center">
        <div className="flex-1 max-w-md">
          <h1 className="text-[32px] font-bold">Chào mừng bạn trở lại</h1>
          <div>
            <span className="mr-1 text-gray-400">
              Bạn đã có tài khoản đăng nhập.
            </span>
            <Link to="/register" className="text-main hover:underline">
              Đăng Ký
            </Link>
          </div>
          <form className="py-5" onSubmit={formik.handleSubmit}>
            <div className="grid gap-6 mb-6">
              <div>
                <CustomInputField
                  id={"phone"}
                  label={"Số điện thoại hoặc email"}
                  name={"phone"}
                  inputValue={formik.values.phone}
                  onChange={formik.handleChange}
                  errorMessage={formik.errors.phone}
                  onBlur={formik.handleBlur}
                  placeholder={"Số điện thoại hoặc email"}
                />
              </div>
              <div>
                <CustomInputField
                  label={"Mật khẩu"}
                  name={"password"}
                  inputValue={formik.values.password}
                  onChange={formik.handleChange}
                  errorMessage={formik.errors.password}
                  onBlur={formik.handleBlur}
                  id={"password"}
                  placeholder={"Mật khẩu"}
                  type={"password"}
                  showPassword={showPassword}
                  togglePasswordVisibility={togglePasswordVisibility}
                />
              </div>
            </div>
            <Link className="underline py-4" to="/forget-password">
              Bạn quên mật khẩu?
            </Link>
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={(value) => setCaptchaValue(value)}
              className="mt-4"
            />
            <button
              type="submit"
              className="px-4 py-2 my-3 bg-blue-700 w-full text-white rounded hover:bg-blue-800"
            >
              Đăng nhập
            </button>
          </form>
          <div className="flex w-full items-center">
            <div className="h-[0.5px] w-full bg-gray-700 mx-2"></div>
            <span>Hoặc</span>
            <div className="h-[0.5px] w-full bg-gray-700 mx-2"></div>
          </div>
          <SSOButton
            name={"Đăng nhập với Google"}
            iconName={"flat-color-icons:google"}
            fw
            handle={() => console.log("Google")}
          />
        </div>
        <div className="hidden lg:flex flex-1 justify-center">
          <img
            src="https://res.cloudinary.com/dgthe0zuj/image/upload/v1725432318/illustration_atsn9q.png"
            alt="login-img"
            className="max-w-xs"
          />
        </div>
      </div>
    </section>
  );
}
