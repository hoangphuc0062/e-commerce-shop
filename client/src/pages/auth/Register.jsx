import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useContext, useState } from "react";
import { handleToast } from "../../ultils/toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CustomInputField } from "../../components/Input/Input";
import { register, resetState } from "../../redux/slices/auth";
import { UserContext } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";
const Register = () => {
  const { setLoginAuth } = useContext(UserContext);

  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [captchaValue, setCaptchaValue] = useState(null);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập họ và tên."),
      email: Yup.string()
        .required("Vui lòng nhập số điện thoại hoặc email.")
        .email("Email không hợp lệ."),

      password: Yup.string()
        .required("Vui lòng nhập mật khẩu.")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
    }),
    onSubmit: async (values) => {
      if (!captchaValue) {
        handleToast("error", "Vui lòng xác nhận bạn không phải là robot.");
        return;
      }
      dispatch(register(values)).then((res) => {
        if (res.type === "auth/register/fulfilled") {
          handleToast(
            "success",
            "Vui lòng kiểm tra email để xác nhận tài khoản."
          );
          setLoginAuth(true);
          dispatch(resetState({ key: "statusRegister", value: "idle" }));
        }
      });
    },
  });

  const onChange = (value) => {
    setCaptchaValue(value);
  };
  return (
    <section className="mx-2 my-4 pt-16">
      <Helmet>
        <title>Đăng ký</title>
      </Helmet>
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
          <form className="py-5" onSubmit={formik.handleSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-1 lg:grid-cols-2">
              <div>
                <CustomInputField
                  label={"Họ và tên"}
                  id={"name"}
                  name={"name"}
                  inputValue={formik.values.name}
                  onChange={formik.handleChange}
                  errorMessage={
                    formik.touched.name && formik.errors.name
                      ? formik.errors.name
                      : null
                  }
                  onBlur={formik.handleBlur}
                  placeholder="Nhập họ và tên"
                />
              </div>
              <div>
                <CustomInputField
                  label={"Email"}
                  name={"email"}
                  id={"email"}
                  inputValue={formik.values.email}
                  onChange={formik.handleChange}
                  errorMessage={
                    formik.touched.email && formik.errors.email
                      ? formik.errors.email
                      : null
                  }
                  onBlur={formik.handleBlur}
                  placeholder="Nhập Email"
                />
              </div>
              <div>
                <CustomInputField
                  label={"Mật khẩu"}
                  name={"password"}
                  id={"password"}
                  inputValue={formik.values.password}
                  onChange={formik.handleChange}
                  errorMessage={
                    formik.touched.password && formik.errors.password
                      ? formik.errors.password
                      : null
                  }
                  onBlur={formik.handleBlur}
                  type={"password"}
                  showPassword={showPassword}
                  togglePasswordVisibility={togglePasswordVisibility}
                  placeholder="Nhập mật khẩu"
                />
              </div>
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

export default Register;
