import React from "react";

export default function Info({
  selectedProvince,
  selectedDistrict,
  selectedWard,
  setProvinceID,
  setDistrictID,
  setWardID,
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
              onChange={() => {}}
            />
            <span className="ml-1">Anh</span>
          </label>
          <label>
            <input type="radio" name="title" value="Chị" onChange={() => {}} />
            <span className="ml-1">Chị</span>
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nhập họ tên"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Nhập số điện thoại"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Nhập gmail"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <select
          className="w-full px-3 py-2 border rounded-md"
          onChange={(e) => setProvinceID(e.target.value)}
        >
          <option>Chọn Tỉnh, Thành phố</option>
          {selectedProvince?.map((province) => (
            <option key={province.id} value={province.id}>
              {province.name}
            </option>
          ))}
        </select>
        <select
          className="w-full px-3 py-2 border rounded-md"
          onChange={(e) => setDistrictID(e.target.value)}
        >
          <option>Chọn Quận, Huyện</option>
          {selectedDistrict?.map((district) => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
          ))}
        </select>
        <select
          className="w-full px-3 py-2 border rounded-md"
          onChange={(e) => setWardID(e.target.value)}
        >
          <option>Chọn Phường, Xã</option>
          {selectedWard?.map((ward) => (
            <option key={ward.id} value={ward.id}>
              {ward.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Số nhà, tên đường"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
    </div>
  );
}
