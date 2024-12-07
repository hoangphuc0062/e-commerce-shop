import { Icon } from "@iconify/react";
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addAddress,
  deleteAddress,
  getAddresses,
  updateAddress,
} from "../../../redux/slices/auth";
import { handleToast } from "./../../../ultils/toast";

// AddressDialog Component
const AddressDialog = ({
  isOpen,
  onClose,
  onSave,
  provinces,
  districts,
  wards,
  address,
  setAddress,
  fetchDistricts,
  fetchWards,
}) => {
  if (!isOpen) return null;

  const handleSelectChange = (key, value, name) => {
    setAddress((prev) => ({ ...prev, [key]: { code: value, name } }));
    if (key === "province") fetchDistricts(value);
    if (key === "district") fetchWards(value);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white p-8 rounded-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {address ? "Sửa thông tin địa chỉ" : "Thêm địa chỉ mới"}
        </h2>
        <form>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[
              { label: "Tỉnh/Thành phố", key: "province", options: provinces },
              { label: "Quận/Huyện", key: "district", options: districts },
              { label: "Phường/Xã", key: "ward", options: wards },
            ].map(({ label, key, options }) => (
              <div key={key}>
                <label className="font-semibold">{label}</label>
                <select
                  value={address?.[key]?.code || ""}
                  onChange={(e) =>
                    handleSelectChange(
                      key,
                      e.target.value,
                      e.target.options[e.target.selectedIndex].text
                    )
                  }
                  className="mt-1.5 w-full p-5 font-medium border rounded-md"
                  disabled={
                    (key === "district" && !address?.province?.code) ||
                    (key === "ward" && !address?.district?.code)
                  }
                >
                  <option>{`Chọn ${label}`}</option>
                  {options.map((option) => (
                    <option key={option.code} value={option.code}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <div>
              <label className="font-semibold">Số nhà, Tên đường</label>
              <input
                type="text"
                value={address?.street || ""}
                onChange={(e) =>
                  setAddress((prev) => ({ ...prev, street: e.target.value }))
                }
                className="mt-1.5 w-full p-5 font-medium border rounded-md"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => onSave(address)}
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Address Component
export default function Address() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.auth.dataAddress);
  const status = useSelector((state) => state.auth.statusGetAddress);

  // Fetch addresses
  useEffect(() => {
    dispatch(getAddresses());
  }, [dispatch]);

  useEffect(() => {
    if (status === "success") {
      setIsLoading(false);
    }
  }, [status]);

  // Fetch provinces
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const res = await fetch("https://provinces.open-api.vn/api/p/");
        const data = await res.json();
        setProvinces(data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  const fetchDistricts = useCallback(async (provinceCode) => {
    try {
      const res = await fetch(
        `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
      );
      const data = await res.json();
      setDistricts(data.districts || []);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  }, []);

  const fetchWards = useCallback(async (districtCode) => {
    try {
      const res = await fetch(
        `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
      );
      const data = await res.json();
      setWards(data.wards || []);
    } catch (error) {
      console.error("Error fetching wards:", error);
    }
  }, []);

  const handleSaveAddress = (addressData) => {
    setIsDialogOpen(false);
    setEditingAddress(null);

    const { district, province, ward, street } = addressData;
    const address = {
      districts: district.name,
      provinces: province.name,
      wards: ward.name,
      street,
    };

    if (editingAddress) {
      // Update address logic
      dispatch(updateAddress({ id: editingAddress._id, data: address })).then(
        (result) => {
          if (result.type === "auth/updateAddress/fulfilled") {
            handleToast("success", "Đã cập nhật địa chỉ");
            dispatch(getAddresses());
          } else {
            handleToast("error", "Cập nhật địa chỉ thất bại");
          }
        }
      );
    } else {
      // Add address logic
      dispatch(addAddress(address)).then((result) => {
        if (result.type === "auth/addAddress/fulfilled") {
          handleToast("success", "Đã thêm địa chỉ");
          dispatch(getAddresses());
        } else {
          handleToast("error", "Thêm địa chỉ thất bại");
        }
      });
    }
  };

  const handleSetDefault = (addressId) => {
    dispatch(updateAddress({ id: addressId, data: { isDefault: true } })).then(
      (result) => {
        if (result.type === "auth/updateAddress/fulfilled") {
          handleToast("success", "Đã chọn địa chỉ mặc định");
          dispatch(getAddresses());
        } else {
          handleToast("error", "Không thể đặt địa chỉ mặc định");
        }
      }
    );
  };

  const handleDeleteAddress = (addressId) => {
    dispatch(deleteAddress(addressId)).then((result) => {
      if (result.type === "auth/deleteAddress/fulfilled") {
        handleToast("success", "Đã xóa địa chỉ");
        dispatch(getAddresses());
      } else {
        handleToast("error", "Xóa địa chỉ thất bại");
      }
    });
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl text-center font-semibold md:text-[26px]">
        Địa chỉ của tôi
      </h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4"
        onClick={() => {
          setEditingAddress(null); // Tạo mới
          setIsDialogOpen(true);
        }}
      >
        <Icon icon="ic:baseline-plus" className="mr-2" />
        Thêm địa chỉ
      </button>
      <div className="mt-4">
        {isLoading ? (
          <p>Đang tải địa chỉ...</p>
        ) : (
          addresses?.map((addr) => (
            <div key={addr._id} className="border p-4 mb-4 rounded-md">
              <h2 className="text-lg font-semibold">
                {addr.street} {addr.isDefault && "(Mặc định)"}
              </h2>
              <p>{[addr.wards, addr.districts, addr.provinces].join(", ")}</p>
              <div className="flex items-center gap-2 mt-2">
                {!addr.isDefault && (
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded-md"
                    onClick={() => handleSetDefault(addr._id)}
                  >
                    Chọn làm mặc định
                  </button>
                )}
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded-md"
                  onClick={() => {
                    setEditingAddress(addr);
                    setIsDialogOpen(true);
                  }}
                >
                  Sửa
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                  onClick={() => handleDeleteAddress(addr._id)}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <AddressDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveAddress}
        provinces={provinces}
        districts={districts}
        wards={wards}
        address={editingAddress}
        setAddress={setEditingAddress}
        fetchDistricts={fetchDistricts}
        fetchWards={fetchWards}
      />
    </div>
  );
}
