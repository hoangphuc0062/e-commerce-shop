import { useState } from "react";
import { Input } from "../../../components/Input/Input";
import { Select } from "../../../components/Input/Select";
import { formatCurrency, convertToISODateString } from "../../../ultils/helper";

const initialCustomerData = {
  name: "Nguyen Van A",
  sex: "Nam",
  email: "bmtck0000@gmail.com",
  phone: "077344062",
  birthday: "01/01/1999",
  createdAt: "01/01/2021",
  stackMoney: 1000000,
  totalPurchasePrice: 1000000,
  address: "Ha Noi",
  avatar:
    "https://res.cloudinary.com/dgthe0zuj/image/upload/fl_preserve_transparency/v1717730182/0d64989794b1a4c9d89bff571d3d5842_xytb2b.jpg?_s=public-apps",
};

export const Account = () => {
  const [customerData, setCustomerData] = useState(initialCustomerData);

  const extractCustomerData = (data) => {
    let { name, birthday, sex, email } = data;
    birthday = convertToISODateString(birthday);
    return { name, birthday, sex, email };
  };

  const handleChange = (field, value) => {
    // Only update the fields that are marked as editable
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

  return (
    <div className="">
      <div className="space-y-4 mx-auto">
        <h2 className="text-2xl text-center font-semibold">
          Thông tin cá nhân
        </h2>
        <form className="flex flex-col gap-5">
          <img
            src={customerData.avatar}
            alt={customerData.name}
            className="w-24 h-24 object-cover rounded-full mx-auto"
          />
          <Input
            label={"Họ và tên"}
            type="text"
            value={customerData.name}
            edit
            iconName={"hugeicons:edit-01"}
            onChange={(value) => handleChange("name", value)}
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
            edit
            iconName={"hugeicons:edit-01"}
            onChange={(value) => handleChange("email", value)}
          />
          <Input label="Số điện thoại" value={customerData.phone} readOnly />
          <Input
            label="Ngày sinh"
            type="text"
            value={customerData.birthday}
            edit
            iconName={"hugeicons:edit-01"}
            onChange={(value) => handleChange("birthday", value)}
          />
          <Input label="Ngày tạo" value={customerData.createdAt} readOnly />
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
              onClick={() => setCustomerData(initialCustomerData)}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
