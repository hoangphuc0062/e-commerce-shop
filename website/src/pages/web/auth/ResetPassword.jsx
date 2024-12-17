import * as Yup from "yup";
import { CustomInputField } from "../../../components/Input/Input";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import { handleToast } from "../../../ultils/toast";
import { useFormik } from "formik";
import { resetPassword } from "../../../redux/slices/auth";

import { useParams } from "react-router-dom";

export const ResetPassword = () => {
  const [captchaValue, setCaptchaValue] = useState(null);
  const [captchaKey, setCaptchaKey] = useState(Date.now());
  const dispatch = useDispatch();

  const { token } = useParams();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Vui lòng nhập mật khẩu của bạn")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
      confirmPassword: Yup.string()
        .required("Vui lòng nhập lại mật khẩu.")
        .oneOf([Yup.ref("password")], "Mật khẩu không trùng khớp."),
    }),
    onSubmit: async (values, { resetForm }) => {
      let data = {
        password: values.password,
        token,
      };
      if (!captchaValue) {
        handleToast("error", "Vui lòng xác nhận bạn không phải là robot.");
        return;
      }

      try {
        const response = await dispatch(resetPassword(data));
        console.log(response);
        if (response.type === "auth/reset-password/fulfilled") {
          handleToast("success", "Mật khẩu đã được cập nhật thành công.");
          resetForm();
          setCaptchaValue(null);
          setCaptchaKey(Date.now());
        } else {
          handleToast(
            "error",
            response.message || "Có lỗi xảy ra, vui lòng thử lại."
          );
        }
      } catch (error) {
        handleToast("error", "Lỗi kết nối đến server.");
      }
    },
  });

  return (
    <section className="mx-2 my-4">
      <div className="container flex justify-center">
        <div className="flex-1">
          <h1 className="text-[32px] font-bold">Thay đổi mật khẩu của bạn</h1>
          <form className="py-5" onSubmit={formik.handleSubmit}>
            <div className="grid gap-6 mb-6">
              <CustomInputField
                id={"password"}
                label={"Mật khẩu mới"}
                name={"password"}
                inputValue={formik.values.password}
                onChange={formik.handleChange}
                errorMessage={formik.touched.password && formik.errors.password}
                onBlur={formik.handleBlur}
                placeholder={"Nhập mật khẩu mới của bạn"}
              />
              <CustomInputField
                id={"confirmPassword"}
                label={"Nhập lại mật khẩu"}
                name={"confirmPassword"}
                inputValue={formik.values.confirmPassword}
                onChange={formik.handleChange}
                errorMessage={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                onBlur={formik.handleBlur}
                placeholder={"Nhập lại mật khẩu của bạn"}
              />
            </div>

            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={(value) => setCaptchaValue(value)}
              key={captchaKey}
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
};
