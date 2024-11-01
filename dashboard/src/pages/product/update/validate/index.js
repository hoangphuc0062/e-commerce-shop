import * as Yup from "yup";

export const validationProductSchema = Yup.object().shape({
  name: Yup.string().required("Tên là bắt buộc"),
  slug: Yup.string().required("Slug là bắt buộc"),
  SKU: Yup.string().required("SKU là bắt buộc"),
  historicalPrice: Yup.number()
    .required("Giá lịch sử là bắt buộc")
    .min(0, "Phải lớn hơn hoặc bằng 0"),
  priceInMarket: Yup.number()
    .required("Giá thị trường là bắt buộc")
    .min(0, "Phải lớn hơn hoặc bằng 0"),
  price: Yup.number()
    .required("Giá là bắt buộc")
    .min(0, "Phải lớn hơn hoặc bằng 0"),
  discount: Yup.number()
    .required("Giảm giá là bắt buộc")
    .min(0, "Phải lớn hơn hoặc bằng 0"),
  onStock: Yup.number()
    .required("Số lượng có thể bán là bắt buộc")
    .min(0, "Phải lớn hơn hoặc bằng 0"),
  inStock: Yup.number()
    .required("Số lượng tồn kho là bắt buộc")
    .min(0, "Phải lớn hơn hoặc bằng 0"),
  inComing: Yup.number()
    .required("Số lượng hàng đang về là bắt buộc")
    .min(0, "Phải lớn hơn hoặc bằng 0"),
  unit: Yup.string().required("Đơn vị là bắt buộc"),
  minInventory: Yup.number()
    .required("Số lượng tối thiểu là bắt buộc")
    .min(0, "Phải lớn hơn hoặc bằng 0"),
  maxInventory: Yup.number()
    .required("Số lượng tối đa là bắt buộc")
    .min(0, "Phải lớn hơn hoặc bằng 0"),
  weight: Yup.number()
    .required("Khối lượng là bắt buộc")
    .min(0, "Phải lớn hơn hoặc bằng 0"),
  isBattery: Yup.boolean().required("Trạng thái pin là bắt buộc"),
  isStopSelling: Yup.boolean().required("Trạng thái ngừng bán là bắt buộc"),
  description: Yup.string().required("Mô tả là bắt buộc"),
  series: Yup.string().required("Series là bắt buộc"),
  brand: Yup.string().required("Thương hiệu là bắt buộc"),
  category: Yup.string().required("Danh mục là bắt buộc"),
  warehouse: Yup.string().required("Kho là bắt buộc"),

});
