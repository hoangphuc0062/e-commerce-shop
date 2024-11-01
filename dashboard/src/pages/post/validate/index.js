import * as Yup from "yup";

export const PostSchema = Yup.object().shape({
  postTitle: Yup.string()
    .required("Tiêu đề bài viết là bắt buộc")
    .min(5, "Tiêu đề bài viết phải có ít nhất 5 ký tự")
    .max(250, "Tiêu đề không được vượt quá 250 ký tự"),

  slug: Yup.string()
    .required("Slug là bắt buộc"),
  // .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug phải chứa ký tự chữ thường và số, không chứa ký tự đặc biệt, chỉ cho phép dấu gạch ngang"),

  thumbnail: Yup.string()
    .required("Thumbnail là bắt buộc")
    .url("Thumbnail phải là một URL hợp lệ"),

  shortDescription: Yup.string()
    .required("Mô tả ngắn là bắt buộc")
    .max(500, "Mô tả ngắn không được vượt quá 500 ký tự"),

  seoKeyWords: Yup.string()
    .max(200, "SEO Keywords không được vượt quá 200 ký tự"),
  // .typeError("Giá trị phải là 1 số"), validate báo lỗi

  metaDescription: Yup.string()
    .max(160, "Meta Description không được vượt quá 160 ký tự"),

  shortSeoDescription: Yup.string()
    .max(300, "Short SEO Description không được vượt quá 300 ký tự"),

  content: Yup.string()
    .required("Nội dung bài viết là bắt buộc"),

  category: Yup.string()
    .required("Danh mục là bắt buộc"),

  // status: Yup.string()
  //   .oneOf(["draft", "published"], "Trạng thái không hợp lệ")
});
