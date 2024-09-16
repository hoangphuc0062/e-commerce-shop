import * as Yup from "yup";

export const CategorySchema = Yup.object().shape({
  name: Yup.string().required("Tên danh mục là bắt buộc"),
  parentId: Yup.string().nullable(),
  description: Yup.string().max(500, "Mô tả không được quá 500 ký tự"),
  // image: Yup.string().required("Hình ảnh là bắt buộc"),
});
