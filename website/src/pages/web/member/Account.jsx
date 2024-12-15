import { useEffect, useState } from "react";
import { Input } from "../../../components/Input/Input";
import { Select } from "../../../components/Input/Select";
import { formatCurrency, formatDay } from "../../../ultils/helper";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomer } from "../../../redux/slices/auth";
import { handleToast } from "../../../ultils/toast";

export default function Account() {
  const [customerData, setCustomerData] = useState({});
  const [errors, setErrors] = useState({});
  const [birthdayInput, setBirthdayInput] = useState(""); // State riêng cho ngày sinh nhập vào
  const status = useSelector((state) => state.auth.statusGetMe);
  const data = useSelector((state) => state.auth.data.rs);

  useEffect(() => {
    if (status === "success") {
      setCustomerData(data);
      setBirthdayInput(data.birthday ? formatDay(data.birthday) : ""); // Cập nhật giá trị ngày sinh ban đầu
    }
  }, [status, data]);

  const isValidDate = (dateString) => {
    const regex = /^(\d{2})-(\d{2})-(\d{4})$/; // Chỉ chấp nhận định dạng dd-MM-yyyy
    const match = dateString.match(regex);
    if (!match) return false;
  
    const [day, month, year] = match.slice(1).map(Number);
    const date = new Date(year, month - 1, day);
    return (
      date.getDate() === day &&
      date.getMonth() + 1 === month &&
      date.getFullYear() === year
    );
  };
  

  const convertToISODateString = (dateString) => {
    const regex = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
    const match = dateString.match(regex);
    if (!match) return null;

    const [day, month, year] = match.slice(1).map(Number);
    const paddedDay = day.toString().padStart(2, "0");
    const paddedMonth = month.toString().padStart(2, "0");
    return `${year}-${paddedMonth}-${paddedDay}`;
  };

  const validate = () => {
    let tempErrors = {};
    if (!customerData.name) tempErrors.name = "Họ và tên không được để trống";
    if (!customerData.phone) {
      tempErrors.phone = "Số điện thoại không được để trống";
    } else if (!/^\d{10}$/.test(customerData.phone)) {
      tempErrors.phone = "Số điện thoại không hợp lệ";
    }
    if (!birthdayInput) {
      tempErrors.birthday = "Ngày sinh không được để trống";
    } else if (!isValidDate(birthdayInput)) {
      tempErrors.birthday = "Ngày sinh không hợp lệ";
    } else {
      // Đảm bảo đầu ra luôn chuẩn hóa
      const regex = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
      const match = birthdayInput.match(regex);
      if (match) {
        const [day, month, year] = match.slice(1).map(Number);
        const paddedDay = day.toString().padStart(2, "0");
        const paddedMonth = month.toString().padStart(2, "0");
        setBirthdayInput(`${paddedDay}-${paddedMonth}-${year}`);
      }
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  

  const handleChange = (field, value) => {
    if (field === "birthday") {
      // Tự động thêm số 0 đằng trước nếu ngày hoặc tháng chỉ có 1 chữ số
      const regex = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
      const match = value.match(regex);
      if (match) {
        const [day, month, year] = match.slice(1).map(Number);
        const paddedDay = day.toString().padStart(2, "0");
        const paddedMonth = month.toString().padStart(2, "0");
        const formattedDate = `${paddedDay}-${paddedMonth}-${year}`;
        setBirthdayInput(formattedDate); // Cập nhật giá trị đã chuẩn hóa
      } else {
        setBirthdayInput(value); // Giữ nguyên giá trị nếu không khớp định dạng
      }
    } else {
      setCustomerData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
  };
  

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      handleToast("error", "Vui lòng kiểm tra lại thông tin");
      return;
    }

    const filteredData = {
      name: customerData.name,
      birthday: birthdayInput ? convertToISODateString(birthdayInput) : null, // Gán giá trị ngày sinh nhập vào
      sex: customerData.sex,
      phone: customerData.phone,
    };

    try {
      const response = await dispatch(
        updateCustomer({
          id: data._id,
          data: filteredData,
        })
      ).unwrap();
      console.log(response);
      handleToast("success", "Cập nhật thành công");
    } catch (error) {
      console.error("Error updating customer:", error);
      handleToast("error", "Cập nhật thất bại");
    }
  };

  return (
    <div className="space-y-4 mx-auto">
      <h2 className="text-2xl text-center font-semibold">Thông tin cá nhân</h2>
      <form className="flex flex-col gap-5">
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center w-fit rounded-full relative">
            <img
              src={
                customerData.avatar ||
                "https://res.cloudinary.com/dgthe0zuj/image/upload/fl_preserve_transparency/v1717730182/0d64989794b1a4c9d89bff571d3d5842_xytb2b.jpg?_s=public-apps"
              }
              alt={customerData.name}
              className="w-32 h-32 object-cover rounded-full mx-auto p-2"
            />
          </div>
        </div>

        <Input
          label={"Họ và tên"}
          id="name"
          type="text"
          value={customerData.name || ""}
          placeholder="Vui lòng nhập họ và tên"
          edit
          iconName="hugeicons:edit-01"
          onChange={(e) => handleChange("name", e.target.value)}
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

        <Select
          label="Giới tính"
          value={customerData.sex || ""}
          values={["Nam", "Nữ", "Khác"]}
          onChange={(value) => handleChange("sex", value)}
        />

        <Input label="Email" value={customerData.email || ""} readOnly />

        <Input
          label="Số điện thoại"
          value={customerData.phone || ""}
          placeholder="Vui lòng nhập số điện thoại"
          edit
          iconName="hugeicons:edit-01"
          onChange={(e) => handleChange("phone", e.target.value)}
        />
        {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}

        <Input
          label="Ngày sinh"
          type="text"
          value={birthdayInput}
          placeholder="Vui lòng nhập ngày sinh của bạn!"
          edit
          iconName="hugeicons:edit-01"
          onChange={(e) => handleChange("birthday", e.target.value)}
        />
        {errors.birthday && <p className="text-red-500 text-xs">{errors.birthday}</p>}

        <Input
          label="Ngày tạo"
          value={formatDay(customerData.createdAt) || ""}
          readOnly
        />
        <Input
          label="Tổng tiền tích lũy"
          value={formatCurrency(customerData.stackMoney) || ""}
          readOnly
        />
        <Input
          label="Tổng tiền đã mua"
          value={formatCurrency(customerData.totalPurchasePrice) || ""}
          readOnly
        />

        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md w-1/4"
          >
            Cập nhật
          </button>
          <button
            type="button"
            className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md w-1/4"
            onClick={() => setCustomerData(data)}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
