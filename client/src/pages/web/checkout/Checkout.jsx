import { GoArrowLeft } from "react-icons/go";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const Checkout = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center bg-[#F4F6F8] mb-5">
      <div className="flex items-center justify-center mb-4">
        <a className="mr-4 ml-0 md:ml-0">
          <GoArrowLeft className="text-2xl" />
        </a>
        <h1 className="text-xl font-bold mb-0">Thông tin đơn hàng</h1>
      </div>
      <div className="flex center justify-center w-full py-5">
        <div className="text-gray-400 font-bold px-4 md:px-10 cursor-pointer">
          <button onClick={() => navigate("/checkout")}>1. THÔNG TIN</button>
        </div>
        <div className="text-main font-bold px-4 md:px-10">
          <button className="text-main" onClick={() => navigate("/payment")}>
            2. THANH TOÁN
          </button>
        </div>
      </div>

      <h2 className="text-main font-semibold md:mr-80 mt-5">
        THÔNG TIN THANH TOÁN
      </h2>
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-[600px] mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Nhập mã giảm giá (chỉ áp dụng)
          </label>
          <div className="flex">
            <input
              type="text"
              placeholder="  Nhập mã giảm giá tại đây"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-1"
            />
            <button className="ml-2 bg-gray-200 py-1 px-4 rounded-md transition flex items-center hover:bg-blue-500">
              <span className="whitespace-nowrap">Áp dụng</span>
            </button>
          </div>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600">Số lượng sản phẩm</span>
          <span className="text-sm font-bold">01</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600">Tiền hàng (tạm tính)</span>
          <span className="text-sm font-bold">4.790.000đ</span>
        </div>
        <div className="flex justify-between mb-6">
          <span className="text-sm text-gray-600">Phí vận chuyển</span>
          <span className="text-sm font-bold">Miễn phí</span>
        </div>
        <div className="flex justify-between mb-6">
          <span className="text-sm text-gray-600">Giảm giá khuyến mãi</span>
          <span className="text-sm font-bold text-red-600">- 200.000đ</span>
        </div>
        <div className="flex justify-between font-bold mt-10">
          <div className="flex items-center justify-between">
            <p className="text-lg">Tổng tiền </p>
            <span className="text-sm text-gray-600 ml-1"> (đã gồm VAT)</span>
          </div>
          <span className="text-lg font-bold">4.790.000đ</span>
        </div>
      </div>

      <h2 className="text-main font-semibold md:mr-80 mt-5">
        XÁC NHẬN PHƯƠNG THỨC
      </h2>
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-[600px] mx-auto  mb-5">
        <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md">
          <div className="flex items-center">
            <img
              src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQIIlNgicC8kReaUlb4bMvSmTmfdcZClOraJKdpObsgNXAPfTUy"
              alt="Payment Method"
              className="mr-2 w-12 h-12"
            />
            <span className="text-red-600 font-bold">
              Chọn phương thức thanh toán
            </span>
          </div>
          <span className="text-sm text-gray-600">Giảm thêm tới 500.000đ</span>
          <span className="ml-2 text-gray-400">
            <MdOutlineKeyboardArrowRight />
          </span>
        </div>
      </div>

      <h2 className=" text-main font-semibold md:mr-80">THÔNG TIN NHẬN HÀNG</h2>
      <div className="customer-info w-full flex justify-center mb-4">
        <div className="w-full max-w-[600px] bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mt-2 mb-3">
            <div className="flex items-center">
              <span className="text-lg">Nguyễn Sỹ</span>
              <span className="ml-3 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                S-NULL
              </span>
            </div>
            <span className="text-gray-600 text-sm">Khách hàng</span>
          </div>
          <div className="flex items-center justify-between mt-2 mb-3">
            <div className="flex items-center">
              <span className="text-gray-800">ntanh16122k3@gmail.com</span>
            </div>
            <span className="text-gray-600 text-sm">Email</span>
          </div>
          <div className="flex items-center justify-between mt-2 mb-3">
            <div className="flex items-center">
              <span className="text-gray-800">0344484162</span>
            </div>
            <span className="text-gray-600 text-sm">Số điện thoại</span>
          </div>
          <div className="flex items-center justify-between mt-2 mb-3">
            <div className="flex items-center">
              <span className="text-gray-800 break-words">
                116 Phan Bội Châu, P. Thống Nhất, TP. Buôn Ma Thuột, Đắk Lắk{" "}
              </span>
            </div>
            <span className="text-gray-600 text-sm">Địa chỉ</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[600px] bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="agreement"
            className="mr-2 text-lg w-5 h-5"
          />
          <label htmlFor="agreement" className="text-sm text-gray-800">
            Bằng việc Đặt hàng, bạn đồng ý với{" "}
            <a href="" className="text-main font-bold">
              Điều khoản sử dụng
            </a>{" "}
            của Voi Tây Nguyên.
          </label>
        </div>
        <p className="text-sm text-gray-600">
          Với các giao dịch từ 10 triệu trở lên, CellphoneS xin phép kiểm tra
          thẻ cứng và CCCD của đúng chủ thẻ trước khi tiến hành giao hàng nhằm
          hạn chế các trường hợp gian lận.
        </p>
      </div>

      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-[600px] mx-auto sticky top-0 mt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700 font-semibold text-lg">
            Tổng tiền tạm tính:
          </span>
          <span className="text-red-600 text-xl font-bold">4.790.000đ</span>
        </div>

        <button
          className="w-full bg-main text-white py-3 rounded-md text-center text-lg font-semibold hover:bg-main transition duration-300"
          onClick={() => (window.location.href = "/checkout_info")}
        >
          Tiếp tục
        </button>
        <div className="flex justify-center items-center mt-4">
          <p className="text-main text-sm mb-6">
            Kiểm tra danh sách sản phẩm (1){" "}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
