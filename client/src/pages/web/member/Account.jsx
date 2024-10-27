import { useRef, useState } from "react";
import { Input } from "../../../components/Input/Input";
import { Select } from "../../../components/Input/Select";
import { formatCurrency, convertToISODateString } from "../../../ultils/helper";
import AvatarEditor from "react-avatar-edit";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

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
    "https://scontent.fsgn2-11.fna.fbcdn.net/v/t39.30808-6/449064390_2414483542094432_6673220414551968639_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=RL1utjliNoAQ7kNvgHfL7Ha&_nc_zt=23&_nc_ht=scontent.fsgn2-11.fna&_nc_gid=ASknwc48-eYa-gCpFeRmDPG&oh=00_AYBGm9yS3VKoqWJi5i9kqvsRa0yZqnxQrBvcl3rMf9_aeA&oe=6723C9DB",
};

export const Account = () => {
  const [customerData, setCustomerData] = useState(initialCustomerData);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAvatarVisible, setIsAvatarVisible] = useState(false);
  const fileInputRef = useRef(null);

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

  const renderAvatar = () => {
    if (!isAvatarVisible) return null;
    const avatarSrc = selectedFile
      ? URL.createObjectURL(selectedFile)
      : customerData.avatar;

    return (
      <div className="text-center font-bold">
        <h2 className="mx-2">Ảnh tải lên</h2>
        <img
          src={avatarSrc}
          alt={customerData.name}
          className="w-32 h-32 object-cover rounded-full mx-auto p-2 outline outline-main"
        />
      </div>
    );
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setIsAvatarVisible(true);
      // console.log("Selected file:", file);
    }
  };
  const handleClick = () => {
    fileInputRef.current.click();
  };

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
                src={customerData.avatar}
                alt={customerData.name}
                className="w-32 h-32 object-cover rounded-full  mx-auto p-2"
              />
              <span
                className="absolute bottom-0 right-0 bg-white rounded-full h-10 w-10 p-2 cursor-pointer"
                onClick={handleClick}
              >
                <Icon icon="mdi:camera" width="1.5rem" height="1.5rem" />
              </span>

              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
            </div>
            {renderAvatar()}
          </div>
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
