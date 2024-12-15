import * as Yup from "yup";

export const BannerSchema = Yup.object().shape({
  title: Yup.string()
    .required("Tiêu đề không được để trống")
    .min(5, "Tiêu đề phải có ít nhất 5 ký tự")
    .max(100, "Tiêu đề không được vượt quá 100 ký tự"),

  description: Yup.string()
    .required("Mô tả không được để trống")
    .min(10, "Mô tả phải có ít nhất 10 ký tự")
    .max(500, "Mô tả không được vượt quá 500 ký tự"),

  series: Yup.string()
    .required("Dòng sản phẩm không được để trống"),

  brand: Yup.string()
    .required("Thương hiệu không được để trống"),

  category: Yup.string()
    .required("Danh mục không được để trống"),

  status: Yup.string()
    .required("Trạng thái không được để trống"),

  banner: Yup.array()
    .of(
      Yup.object({
        urlImage: Yup.string()
          .url("URL hình ảnh không hợp lệ")
          .required("URL hình ảnh không được để trống"),

        refUrl: Yup.string()
          .matches(
            /^(https?:\/\/(localhost:\d{1,5}|[a-zA-Z0-9\-]+\.[a-zA-Z]{2,})\/)?[a-zA-Z0-9\-\/]+$/,
            "URL tham chiếu không hợp lệ"
          )
          .nullable(true),


        position: Yup.number()
          .integer("Vị trí phải là một số nguyên")
          .min(0, "Vị trí không được nhỏ hơn 0")
          .max(100, "Vị trí không được vượt quá 100")
          .required("Vị trí không được để trống")
          .typeError("Giá trị phải là 1 số")
          .notOneOf([0], "Vị trí không được bằng 0"),

        startDate: Yup.date()
          .required("Ngày bắt đầu không được để trống")
          .typeError("Ngày bắt đầu không hợp lệ"),

        endDate: Yup.date()
          .required("Ngày kết thúc không được để trống")
          .min(Yup.ref("startDate"), "Ngày kết thúc phải sau ngày bắt đầu")
          .typeError("Ngày kết thúc không hợp lệ")
        // .test("is-future-date", "Ngày kết thúc phải là ngày trong tương lai", (value) => {
        //   return value && new Date(value) > new Date();
        // }),
      })
    )
    .min(1, "Phải có ít nhất một banner")
    .required("Phần banner không được để trống"),

});
