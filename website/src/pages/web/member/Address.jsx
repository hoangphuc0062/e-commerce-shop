import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Address() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const address = useSelector((state) => state.auth.data.rs);

  // States for address data
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const handleAddAddress = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseDialog();
    }
  };

  const handleOverlayClickEdit = (e) => {
    if (e.target === e.currentTarget) {
      setIsEditDialogOpen(false);
    }
  };

  // Fetch provinces (tỉnh/thành phố)
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then((res) => res.json())
      .then((data) => {
        setProvinces(data);
      })
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);

  // Fetch districts (quận/huyện) based on selected province
  const fetchDistricts = (provinceCode) => {
    fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
      .then((res) => res.json())
      .then((data) => {
        setDistricts(data.districts);
        setSelectedDistrict(null);
        setWards([]); // Reset wards when province changes
      })
      .catch((error) => console.error("Error fetching districts:", error));
  };

  // Fetch wards (phường/xã) based on selected district
  const fetchWards = (districtCode) => {
    fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
      .then((res) => res.json())
      .then((data) => {
        setWards(data.wards);
      })
      .catch((error) => console.error("Error fetching wards:", error));
  };
  const handleCloseDialogEdit = () => {
    setIsEditDialogOpen(false); // Đóng dialog chỉnh sửa
    setSelectedProvince(null); // Reset lựa chọn tỉnh
    setSelectedDistrict(null); // Reset lựa chọn quận
    setWards([]); // Reset lựa chọn phường/xã
  };

  const [customerData, setCustomerData] = useState({
    name: address?.name || "",
    phone: address?.phone || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setCustomerData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Xóa lỗi khi người dùng nhập
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center p-2">
        <h1 className="text-2xl text-center font-semibold md:text-lg">
          Địa chỉ của tôi
        </h1>
      </div>
      <hr />
      {/* Address */}
      <div className="flex justify-between items-center p-2 mb-2">
        <div>
          <div>
            <span className="text-gray-500 ">
               {address && address.name}{" "}
            </span>
            <span className="text-gray-500 ">
              | {address && address.phone}{" "}
            </span>
          </div>
          <div className="text-gray-500 ">
            {address && address.address.map((item) => item)}
          </div>

          <div className="outline outline-main text-main w-fit p-2 mt-2 rounded-sm">
            Mặc định
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div>
            <button
              className="text-main text-lg mr-3"
              title="Cập nhật"
              onClick={() => {
                setEditingAddress(address); // Gán địa chỉ hiện tại vào state chỉnh sửa
                setSelectedProvince(address?.province?.code || null);
                fetchDistricts(address?.province?.code); // Lấy quận/huyện
                setSelectedDistrict(address?.district?.code || null);
                fetchWards(address?.district?.code); // Lấy phường/xã
                setIsEditDialogOpen(true); // Mở dialog chỉnh sửa
              }}
            >
              <Icon
                icon="akar-icons:edit"
                width="1.5rem"
                height="1.5rem"
                className="inline"
              />
            </button>
          </div>
        </div>
      </div>
      <hr />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 sm:py-2 px-3 sm:px-4 rounded-md mt-2 md:mt-0 text-sm flex items-center justify-center w-full"
        onClick={handleAddAddress}
      >
        <Icon
          icon="mdi-light:plus"
          width="1.5rem"
          height="1.5rem"
          className="inline"
        />
        <span className="ml-2">Thêm địa chỉ mới</span>
      </button>

      {/* Add Address Dialog */}
      {isDialogOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-white p-8 rounded-md w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4 text-center text-[24px]">
              Thêm địa chỉ mới
            </h2>
            <form>
              {/* Address Fields (Province, District, Ward) */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Province */}
                <div>
                  <label className="font-semibold">Tỉnh/Thành phố</label>
                  <select
                    name="address.province"
                    className="mt-1.5 w-full p-5 font-medium border rounded-md placeholder:opacity-60 sm:text-sm"
                    onChange={(e) => {
                      const provinceCode = e.target.value;
                      setSelectedProvince(provinceCode);
                      fetchDistricts(provinceCode);
                    }}
                  >
                    <option>Chọn Tỉnh, Thành phố</option>
                    {provinces.map((province) => (
                      <option key={province.code} value={province.code}>
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
                      const districtCode = e.target.value;
                      setSelectedDistrict(districtCode);
                      fetchWards(districtCode);
                    }}
                    disabled={!selectedProvince}
                  >
                    <option>Chọn Quận, Huyện</option>
                    {districts.map((district) => (
                      <option key={district.code} value={district.code}>
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
                    disabled={!selectedDistrict}
                  >
                    <option>Chọn Phường, Xã</option>
                    {wards.map((ward) => (
                      <option key={ward.code} value={ward.code}>
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
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                  onClick={handleCloseDialog}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Dialog */}
      {isEditDialogOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClickEdit}
        >
          <div className="bg-white p-8 rounded-md w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">
              Sửa thông tin địa chỉ
            </h2>
            <form>
              <div className="mb-4">
                <label className="font-semibold">Tên</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={editingAddress?.name || ""}
                  onChange={(e) =>
                    setEditingAddress({
                      ...editingAddress,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="font-semibold">Số điện thoại</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={editingAddress?.phone || ""}
                  onChange={(e) =>
                    setEditingAddress({
                      ...editingAddress,
                      phone: e.target.value,
                    })
                  }
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
                    value={
                      selectedProvince || editingAddress?.province?.code || ""
                    }
                    onChange={(e) => {
                      const provinceCode = e.target.value;
                      setSelectedProvince(provinceCode);
                      fetchDistricts(provinceCode);
                    }}
                  >
                    <option>Chọn Tỉnh, Thành phố</option>
                    {provinces.map((province) => (
                      <option key={province.code} value={province.code}>
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
                    value={
                      selectedDistrict || editingAddress?.district?.code || ""
                    }
                    onChange={(e) => {
                      const districtCode = e.target.value;
                      setSelectedDistrict(districtCode);
                      fetchWards(districtCode);
                    }}
                    disabled={!selectedProvince}
                  >
                    <option>Chọn Quận, Huyện</option>
                    {districts.map((district) => (
                      <option key={district.code} value={district.code}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ward */}
                <div>
                  <label className="font-semibold">Phường/Xã</label>
                  <select
                    name="address.ward"
                    className="mt-1.5 w-full p-5 font-medium border rounded-md placeholder:opacity-60 sm:text-sm"
                    value={editingAddress?.ward?.code || ""}
                    onChange={(e) =>
                      setEditingAddress({
                        ...editingAddress,
                        ward: { code: e.target.value },
                      })
                    }
                    disabled={!selectedDistrict}
                  >
                    <option>Chọn Phường, Xã</option>
                    {wards.map((ward) => (
                      <option key={ward.code} value={ward.code}>
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
                    value={editingAddress?.street || ""}
                    onChange={(e) =>
                      setEditingAddress({
                        ...editingAddress,
                        street: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                  onClick={handleCloseDialogEdit}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
