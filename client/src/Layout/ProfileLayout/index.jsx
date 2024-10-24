import icons from "../../ultils/icon";
import BannerSlider from "../../components/Profile/slider";
import PromotionSlider from "../../components/Profile/promotionSlider";
import { Outlet } from "react-router-dom";
import SidebarProfile from "../../components/Profile/SidebarProfile";
import { useSelector } from "react-redux";
import ProfileUser from "../../components/Profile/ProfileUser";

export const ProfileLayout = () => {
  const customerData = useSelector((state) => state.customer.data);
  //   const {
  //     SiGoogleclassroom,
  //     BiSolidDiscount,
  //     PiNotepadBold,
  //     PiStudentDuotone,
  //     MdOutlineWhereToVote,
  //   } = icons;
  return (
    <div className="container mx-auto p-2">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 lg:w-1/5 xl:w-1/6 mb-4 md:mb-0">
          <SidebarProfile />
        </div>

        <div className="flex-1 p-1 bg-white rounded-lg shadow-md">
          <div className="w-full md:w-3/4 lg:w-4/5 xl:w-5/6 p-4">
            <ProfileUser
              name={customerData?.name}
              phone={customerData.phone}
              avatar={customerData?.avatar}
              memberShip={customerData?.memberShip}
            />
          </div>
          <Outlet />
          <div className="flex justify-center p-3 border border-gray-300 rounded-lg w-full">
            <div className="text-center mx-40">
              <p className="text-2xl font-bold">0</p>
              <p className="text-gray-500">đơn hàng</p>
            </div>
            <div className="text-center mx-40">
              <p className="text-2xl font-bold">0đ</p>
              <p className="text-gray-500">Tổng tiền tích lũy</p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between bg-blue-100 p-2 rounded">
              <div className="flex items-center">
                <span className="text-blue-500">
                  <i className="fas fa-info-circle"></i>
                </span>
                <p className="ml-2 text-sm text-blue-700">
                  Đăng ký S-Student để nhận thêm ưu đãi tới 500k/sản phẩm.
                </p>
              </div>
              <button className="text-blue-500 text-sm font-semibold hover:underline">
                Đăng ký ngay
              </button>
            </div>
            <div className="flex items-center justify-between bg-blue-100 p-2 rounded">
              <div className="flex items-center">
                <span className="text-blue-500">
                  <i className="fas fa-info-circle"></i>
                </span>
                <p className="ml-2 text-sm text-blue-700">
                  Cập nhật thông tin cá nhân và địa chỉ để có trải nghiệm đặt
                  hàng nhanh và thuận tiện hơn.
                </p>
              </div>
              <button className="text-blue-500 text-sm font-semibold hover:underline">
                Cập nhật
              </button>
            </div>
          </div>

          <div className="border border-gray-300 p-4 rounded-lg mt-4">
            {/* <div className="grid grid-cols-3 gap-4 md:grid-cols-5">
              <Link href="" className="flex flex-col items-center space-y-2">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                  <SiGoogleclassroom className="text-blue-500 w-6 h-6" />
                </div>
                <p className="text-sm">Hạng thành viên</p>
              </Link>
              <a href="" className="flex flex-col items-center space-y-2">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                  <BiSolidDiscount className="text-blue-500 w-6 h-6" />
                </div>
                <p className="text-sm">Mã giảm giá</p>
              </a>
              <a href="" className="flex flex-col items-center space-y-2">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                  <PiNotepadBold className="text-blue-500 w-6 h-6" />
                </div>
                <p className="text-sm">Lịch sử mua hàng</p>
              </a>
              <a href="" className="flex flex-col items-center space-y-2">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                  <PiStudentDuotone className="text-blue-500 w-6 h-6" />
                </div>
                <p className="text-sm">S-Student</p>
              </a>
              <a href="" className="flex flex-col items-center space-y-2">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                  <MdOutlineWhereToVote className="text-blue-500 w-6 h-6" />
                </div>
                <p className="text-sm">Địa chỉ</p>
              </a>
            </div> */}
          </div>

          <div className="border border-gray-300 p-4 rounded-lg mt-4 bg-[#FFF5E5]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-main font-semibold">Chương trình nổi bật</h2>
              <a
                href=""
                className="text-red-500 text-sm hover:underline hover:text-main"
              >
                Xem tất cả
              </a>
            </div>
            <BannerSlider />
          </div>

          <div className="mt-5">
            <PromotionSlider />
          </div>
        </div>
      </div>
    </div>
  );
};
