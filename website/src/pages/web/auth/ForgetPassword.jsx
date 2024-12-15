import { useFormik } from "formik";
import * as Yup from "yup";
import { handleToast, handleToastPromise } from "../../../ultils/toast";
import { useState, useRef } from "react";
import { CustomInputField } from "../../../components/Input/Input";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../../redux/slices/auth";

export default function ForgetPassword() {
  const [captchaValue, setCaptchaValue] = useState(null);
  const [captchaKey, setCaptchaKey] = useState(Date.now()); // Track the key to reset the ReCAPTCHA
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Vui lòng nhập số điện thoại hoặc email.")
        .email("Email không hợp lệ."),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (!captchaValue) {
        handleToast("error", "Vui lòng xác nhận bạn không phải là robot.");
        return;
      }

      const promise = dispatch(forgotPassword(values));

      // Use handleToastPromise to show notifications and handle the async promise
      handleToastPromise(promise, {
        pending: "Đang xử lý yêu cầu...",
        success: "Bạn hãy kiểm tra mail",
        error: "Đã có lỗi xảy ra. Vui lòng thử lại.",
      });

      setCaptchaKey(Date.now()); // Reset the captcha by changing the key
      resetForm();
      setCaptchaValue(null);
    },
  });

  return (
    <section className="mx-2 my-4">
      <div className="container flex justify-center">
        <div className="flex-1">
          <h1 className="text-[32px] font-bold">Quên mật khẩu</h1>
          <form className="py-5" onSubmit={formik.handleSubmit}>
            <div className="grid gap-6 mb-6">
              <div>
                <CustomInputField
                  id={"email"}
                  label={"Số điện thoại hoặc email"}
                  name={"email"}
                  inputValue={formik.values.email}
                  onChange={formik.handleChange}
                  errorMessage={formik.errors.email}
                  onBlur={formik.handleBlur}
                  placeholder={"Số điện thoại hoặc email"}
                />
              </div>
            </div>

            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={(value) => setCaptchaValue(value)}
              key={captchaKey} // Re-render to reset the ReCAPTCHA widget
              className="mt-4"
            />

            <button
              type="submit"
              className="px-4 py-2 my-3 bg-blue-700 w-full text-white rounded hover:bg-blue-800 disabled:bg-gray-500"
              disabled={!captchaValue || formik.isSubmitting}
            >
              Gửi yêu cầu
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
