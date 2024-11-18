import { useEffect, useState } from "react";
import { Input } from "../../../components/Input/Input";
import { Select } from "../../../components/Input/Select";
import {
  formatCurrency,
  convertToISODateString,
  formatDay,
} from "../../../ultils/helper";
import { useSelector } from "react-redux";

export default function Account() {
  const [customerData, setCustomerData] = useState([]);
  const status = useSelector((state) => state.auth.statusGetMe);
  const data = useSelector((state) => state.auth.data.rs);

  useEffect(() => {
    if (status === "success") {
      setCustomerData(data);
    }
  }, [status, data]);
  const extractCustomerData = (data) => {
    let { name, birthday, sex, email } = data;
    birthday = convertToISODateString(birthday);
    return { name, birthday, sex, email };
  };

  const handleChange = (field, value) => {
    setCustomerData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filteredData = extractCustomerData(customerData);

    console.log(filteredData);
  };
  console.log(customerData);

  return (
    <div className="">
      <div className="space-y-4 mx-auto">
        <h2 className="text-2xl text-center font-semibold">
          Thông tin cá nhân
        </h2>
        <form className="flex flex-col gap-5">
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center w-fit rounded-full relative">
              <img
                src={
                  customerData.avatar ||
                  "https://res.cloudinary.com/dgthe0zuj/image/upload/fl_preserve_transparency/v1717730182/0d64989794b1a4c9d89bff571d3d5842_xytb2b.jpg?_s=public-apps"
                }
                alt={customerData.name}
                className="w-32 h-32 object-cover rounded-full  mx-auto p-2"
              />
            </div>
          </div>
          <Input
            label={"Họ và tên"}
            id="name"
            type="text"
            value={customerData.name}
            edit
            iconName="hugeicons-edit-01"
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <Select
            label="Giới tính"
            value={customerData.sex}
            values={["Nam", "Nữ", "Khác"]}
            onChange={(value) => handleChange("sex", value)}
          />
          <Input
            label="Email"
            value={customerData.email}
            readOnly
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <Input
            label="Số điện thoại"
            value={customerData.phone}
            edit
            iconName="hugeicons:edit-01"
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          <Input
            label="Ngày sinh"
            type="text"
            value={customerData.birthday}
            edit
            iconName="hugeicons:edit-01"
            onChange={(e) => handleChange("birthday", e.target.value)}
          />
          <Input
            label="Ngày tạo"
            value={formatDay(customerData.createdAt)}
            readOnly
          />
          <Input
            label="Tổng tiền tích lũy"
            value={formatCurrency(customerData.stackMoney)}
            readOnly
          />
          <Input
            label="Tổng tiền đã mua"
            value={formatCurrency(customerData.totalPurchasePrice)}
            readOnly
          />
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-md flex items-center justify-center w-1/4"
            >
              Cập nhật
            </button>
            <button
              type="button"
              className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-md flex items-center justify-center w-1/4"
              onClick={() => setCustomerData(data)}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
