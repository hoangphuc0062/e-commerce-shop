/* eslint-disable react/prop-types */
import { CustomInputField } from "../../../components/Input/Input";

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
        <div>
          <label className="font-semibold">Tỉnh/Thành phố</label>
          <select
            name="address.province"
            className="mt-1.5 w-full p-5 font-medium border rounded-md placeholder:opacity-60 sm:text-sm"
            onChange={(e) => {
              const selectedProvinceId = e.target.value;
              setProvinceID(selectedProvinceId);
              const province = selectedProvince.find(
                (prov) => prov.id === parseInt(selectedProvinceId)
              );
              if (province) {
                setFieldValue("address.province", province.name);
              }
            }}
          >
            <option>Chọn Tỉnh, Thành phố</option>
            {selectedProvince?.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className="font-semibold">Quận/Huyện</label>
          <select
            name="address.district"
            className="mt-1.5 w-full p-5 font-medium border rounded-md placeholder:opacity-60 sm:text-sm"
            onChange={(e) => {
              const selectedDistrictId = e.target.value;
              setDistrictID(selectedDistrictId);
              const district = selectedDistrict.find(
                (dist) => dist.id === parseInt(selectedDistrictId)
              );
              if (district) {
                setFieldValue("address.district", district.name);
              }
            }}
          >
            <option>Chọn Quận, Huyện</option>
            {selectedDistrict?.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
        {/* Ward */}
        <div>
          <label className="font-semibold">Phường/Xã</label>
          <select
            className="mt-1.5 w-full p-5 font-medium border rounded-md placeholder:opacity-60 sm:text-sm"
            name="address.ward"
            onChange={(e) => {
              const selectedWardId = e.target.value;

              setWardID(selectedWardId);

              const ward = selectedWard.find(
                (ward) => ward.id === selectedWardId
              );

              if (ward) {
                setFieldValue("address.ward", ward.name);
              }
            }}
          >
            <option>Chọn Phường, Xã</option>
            {selectedWard?.map((ward) => (
              <option key={ward.id} value={ward.id}>
                {ward.name}
              </option>
            ))}
          </select>
        </div>

        {/* Street */}
        <div>
          <label className="font-semibold">Số nhà, Tên đường</label>
          <input
            type="text"
            name="address.street"
            placeholder="Số nhà, tên đường"
            className="mt-1.5 w-full p-5 font-medium border rounded-md placeholder:opacity-60 sm:text-sm"
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
