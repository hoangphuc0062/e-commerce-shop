/* eslint-disable react/prop-types */
import { CustomInputField } from "../../../components/Input/Input";
import { Autocomplete, TextField } from "@mui/material";
export default function Info({
  selectedProvince,
  selectedDistrict,
  selectedWard,
  setProvinceID,
  setDistrictID,
  setWardID,
  formik,
  shippingFee,
  subTotal,
}) {
  const { values, errors, handleChange, setFieldValue, handleBlur } = formik;
  const handleProvinceChange = (e, value) => {
    if (value) {
      setProvinceID(value.id);
      setFieldValue("address.province", value.name);
    }
  };
  const handleDistrictChange = (event, newValue) => {
    if (newValue) {
      setDistrictID(newValue.id);
      setFieldValue("address.district", newValue.name);
    }
  };
  const handleWardChange = (event, newValue) => {
    if (newValue) {
      setWardID(newValue.id);
      setFieldValue("address.ward", newValue.name);
    }
  };
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Thông tin khách mua hàng</h2>
        <div className="flex items-center mb-2">
          <label className="mr-4">
            <input
              type="radio"
              name="sex"
              value="Nam"
              checked={values.sex === "Nam"}
              onChange={() => setFieldValue("sex", "Nam")}
            />
            <span className="ml-1">Anh</span>
          </label>
          <label className="mr-4">
            <input
              type="radio"
              name="sex"
              value="Nữ"
              checked={values.sex === "Nữ"}
              onChange={() => setFieldValue("sex", "Nữ")}
            />
            <span className="ml-1">Chị</span>
          </label>
          <label>
            <input
              type="radio"
              name="sex"
              value="Khác"
              checked={values.sex === "Khác"}
              onChange={() => setFieldValue("sex", "Khác")}
            />
            <span className="ml-1">Khác</span>
          </label>
        </div>

        {/* Name and Phone Fields */}
        <div className="grid grid-cols-2 gap-4">
          <CustomInputField
            label="Họ và tên"
            name="name"
            inputValue={values.name}
            onChange={handleChange}
            errorMessage={errors.name}
            onBlur={handleBlur}
            placeholder="Nhập họ và tên"
            id="name"
          />
          <CustomInputField
            label="Số điện thoại"
            name="phone"
            inputValue={values.phone}
            onChange={handleChange}
            errorMessage={errors.phone}
            onBlur={handleBlur}
            placeholder="Nhập số điện thoại"
            id="phone"
          />
        </div>
      </div>

      {/* Email Field */}
      <div className="mb-3">
        <CustomInputField
          label="Email"
          name="email"
          inputValue={values.email}
          onChange={handleChange}
          errorMessage={errors.email}
          onBlur={handleBlur}
          placeholder="Nhập email"
          id="email"
        />
      </div>

      {/* Address Fields */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Province */}
        {selectedProvince.length > 0 && (
          <div>
            <label className="font-semibold">Tỉnh/Thành phố</label>
            <Autocomplete
              options={selectedProvince}
              getOptionLabel={(option) => option.name}
              defaultValue={
                selectedProvince.find(
                  (prov) =>
                    prov.name === values.address.province.replace("Tỉnh ", "")
                ) || null
              }
              value={selectedProvince.find((prov) => {
                if (
                  prov.name === values.address.province.replace("Tỉnh ", "")
                ) {
                  return setProvinceID(prov.id);
                } else {
                  return null;
                }
              })}
              onChange={handleProvinceChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Chọn Tỉnh, Thành phố"
                  className="mt-1.5 w-full p-5 font-medium border rounded-md placeholder:opacity-60 sm:text-sm"
                />
              )}
            />
          </div>
        )}
        {/* District */}
        {selectedDistrict.length > 0 && (
          <div>
            <label className="font-semibold">Quận/Huyện</label>

            <Autocomplete
              options={selectedDistrict}
              getOptionLabel={(option) => option.name}
              defaultValue={selectedDistrict.find(
                (dist) => dist.name === values.address.district.replace("", "")
              )}
              value={selectedDistrict.find((dist) => {
                if (dist.name === values.address.district) {
                  return setDistrictID(dist.id);
                } else {
                  return null;
                }
              })}
              onChange={handleDistrictChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Chọn Quận, Huyện"
                  className="mt-1.5 w-full p-5 font-medium border rounded-md placeholder:opacity-60 sm:text-sm"
                />
              )}
            />
          </div>
        )}
        {/* Ward */}
        {selectedWard.length > 0 && (
          <div>
            <label className="font-semibold">Phường/Xã</label>
            <Autocomplete
              options={selectedWard}
              getOptionLabel={(option) => option.name}
              onChange={handleWardChange}
              defaultValue={selectedWard.find(
                (ward) => ward.name === values.address.ward.replace("", "")
              )}
              value={selectedWard.find((ward) => {
                if (ward.name === values.address.ward) {
                  return setWardID(ward.id);
                } else {
                  return null;
                }
              })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Chọn Phường, Xã"
                  className="mt-1.5 w-full p-5 font-medium border rounded-md placeholder:opacity-60 sm:text-sm"
                />
              )}
            />
          </div>
        )}

        {/* Street */}
        <div>
          <label className="font-semibold">Số nhà, Tên đường</label>
          <input
            value={values.address.street || ""}
            type="text"
            name="address.street"
            placeholder="Số nhà, tên đường"
            className="mt-1.2 w-full p-5 font-medium border rounded-md placeholder:opacity-60 sm:text-sm"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Note */}
      <div>
        <label className="font-semibold">Ghi chú</label>
        <textarea
          className="mt-1.5 w-full p-5 font-medium border rounded-md placeholder:opacity-60 sm:text-sm"
          placeholder="Nhập ghi chú"
          onChange={(e) => setFieldValue("note", e.target.value)}
        ></textarea>
      </div>

      {/* Fees */}
      <div className="flex justify-between items-center text-lg mb-4">
        <p>Tiền ship</p>
        <p className="text-indigo-600">
          {shippingFee.toLocaleString("vi-VN")} VND
        </p>
      </div>
      <div className="flex justify-between items-center text-lg font-semibold mb-4">
        <p>Tổng tiền:</p>
        <p className="text-indigo-600">
          {subTotal.toLocaleString("vi-VN")} VND
        </p>
      </div>
    </div>
  );
}
