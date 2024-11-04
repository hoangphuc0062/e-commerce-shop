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
}) {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Thông tin khách mua hàng</h2>
        <div className="flex items-center mb-2">
          <label className="mr-4">
            <input
              type="radio"
              name="title"
              value="Anh"
              checked
              onChange={() => {
                formik.setFieldValue("title", "Anh");
              }}
            />
            <span className="ml-1">Anh</span>
          </label>
          <label>
            <input
              type="radio"
              name="title"
              value="Chị"
              onChange={() => {
                formik.setFieldValue("title", "Chị");
              }}
            />
            <span className="ml-1">Chị</span>
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <CustomInputField
            label="Họ và tên"
            name="name"
            inputValue={formik.values.name}
            onChange={formik.handleChange}
            errorMessage={formik.errors.name}
            onBlur={formik.handleBlur}
            placeholder="Nhập họ và tên"
            id="name"
          />
          <CustomInputField
            label="Số điện thoại"
            name="phone"
            inputValue={formik.values.phone}
            onChange={formik.handleChange}
            errorMessage={formik.errors.phone}
            onBlur={formik.handleBlur}
            placeholder="Nhập số điện thoại"
            id="phone"
          />
        </div>
      </div>
      <div className="mb-3">
        <CustomInputField
          label="Email"
          name="email"
          inputValue={formik.values.email}
          onChange={formik.handleChange}
          errorMessage={formik.errors.email}
          onBlur={formik.handleBlur}
          placeholder="Nhập email"
          id="email"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="font-semibold capitalize">Địa chỉ nhận hàng</label>
          <select
            className="mt-1.5 w-full p-5 font-medium border rounded-md placeholder:opacity-60 sm:text-sm"
            onChange={(e) => setProvinceID(e.target.value)}
          >
            <option>Chọn Tỉnh, Thành phố</option>
            {selectedProvince?.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold capitalize">Địa chỉ nhận hàng</label>
          <select
            className="mt-1.5 w-full p-5 font-medium border rounded-md placeholder:opacity-60 sm:text-sm"
            onChange={(e) => setDistrictID(e.target.value)}
          >
            <option>Chọn Quận, Huyện</option>
            {selectedDistrict?.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-semibold capitalize">Địa chỉ nhận hàng</label>

          <select
            className="mt-1.5 w-full p-5 font-medium border rounded-md placeholder:opacity-60 sm:text-sm"
            onChange={(e) => setWardID(e.target.value)}
          >
            <option>Chọn Phường, Xã</option>
            {selectedWard?.map((ward) => (
              <option key={ward.id} value={ward.id}>
                {ward.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-semibold capitalize">Địa chỉ nhận hàng</label>
          <input
            type="text"
            placeholder="Số nhà, tên đường"
            className="mt-1.5 w-full p-5 font-medium border rounded-md placeholder:opacity-60 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}
