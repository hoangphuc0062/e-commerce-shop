import { formatDay, formatCurrency } from "../../../ultils/helper";

export const Account = () => {
  const customerData = {
    name: "Nguyen Van A",
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

  return (
    <div className="">
      <div className="space-y-4 mx-auto max-w-[750px]">
        <h2 className="text-2xl font-semibold text-center">
          Thông tin cá nhân
        </h2>
        <div className="flex flex-col items-center justify-between border-b border-gray-300 pb-2 w-full">
          <img
            src={customerData?.avatar ? customerData?.avatar : "Trống"}
            alt={customerData?.name}
            className="w-16 h-16 rounded-full"
          />

          <h2>{customerData?.name}</h2>
        </div>
        <div className="border-b border-gray-300 pb-4 mb-2">
          <p className="text-gray-600 font-light">
            Email: {customerData?.email ? customerData?.email : "Trống"}
          </p>
        </div>
        <div className="border-b border-gray-300 pb-4 mb-2 flex justify-between items-center">
          <p className="text-gray-600 font-light">
            Giới tính: {customerData?.sex}
          </p>
        </div>

        <div className="border-b border-gray-300 pb-4 mb-2">
          <p className="text-gray-600 font-light">
            Số điện thoại: {customerData?.phone}
          </p>
        </div>
        <div className="border-b border-gray-300 pb-4 mb-2">
          <p className="text-gray-600 font-light">
            Sinh nhật: {customerData?.birthday || "01/01/1999"}
          </p>
        </div>
        <div className="border-b border-gray-300 pb-4 mb-2">
          <p className="text-gray-600 font-light">
            Ngày tham gia: {formatDay(customerData?.createdAt)}
          </p>
        </div>
        <div className="border-b border-gray-300 pb-4 mb-2">
          <p className="text-gray-600 font-light">
            Tổng tiền tích lũy: {formatCurrency(customerData?.stackMoney)}
          </p>
        </div>
        <div className="border-b border-gray-300 pb-4 mb-2">
          <p className="text-gray-600 font-light">
            Tổng tiền đã mua sắm:
            {formatCurrency(customerData?.totalPurchasePrice)}
          </p>
        </div>
        <div className="border-b border-gray-300 pb-4 mb-2 flex justify-between items-center">
          <p className="text-gray-600 font-light">
            Địa chỉ: {customerData?.address}
          </p>
        </div>
        <div className="border-b border-gray-300 pb-4 mb-2 cursor-pointer">
          <p className="text-gray-600 font-light">Đổi mật khẩu</p>
        </div>
        <div className="flex justify-center mt-4 max-w-[600px] mx-auto ">
          <button className="bg-main text-white font-semibold py-2 px-4 rounded hover:bg-main">
            Cập nhật thông tin
          </button>
        </div>
      </div>
    </div>
  );
};
