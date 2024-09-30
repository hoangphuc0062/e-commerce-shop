import Sidebar from "../../../components/Profile/SidebarProfile";
import HeadingSection from "../../../components/Forum/HeadingSection";
import SliderPost from "../../../components/Forum/SliderPost";
import { SiGoogleclassroom } from "react-icons/si";
import { BiSolidDiscount } from "react-icons/bi";
import { PiNotepadBold } from "react-icons/pi";
import { PiStudentDuotone } from "react-icons/pi";
import { MdOutlineWhereToVote } from "react-icons/md";

const Profile = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 lg:w-1/5 xl:w-1/6 mb-4 md:mb-0">
          <Sidebar />
        </div>

        <div className="flex-1 p-10 bg-white rounded-lg shadow-md">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src="https://cdn2.cellphones.com.vn/50x50,webp,q100/media/wysiwyg/Shipper_CPS3_1.png"
              alt="Avatar"
              className="w-16 h-16 rounded-full border"
            />
            <div>
              <h2 className="text-xl font-bold">NGUYỄN SỸ</h2>
              <p className="text-gray-500">0344484162</p>
              <span className="bg-pink-200 text-pink-700 text-xs font-semibold px-2.5 py-0.5 rounded">
                SNULL
              </span>
            </div>
          </div>
          <div className="flex justify-around border border-gray-300 p-4 rounded-lg">
            <div className="text-center">
              <p className="text-2xl font-bold">0</p>
              <p className="text-gray-500">đơn hàng</p>
            </div>
            <div className="text-center">
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
            <div className="grid grid-cols-3 gap-4 md:grid-cols-5">
              <a href="" className="flex flex-col items-center space-y-2">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                  <SiGoogleclassroom className="text-blue-500 w-6 h-6" />
                </div>
                <p className="text-sm">Hạng thành viên</p>
              </a>
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
            </div>
          </div>

          <div className="border border-gray-300 p-4 rounded-lg mt-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-main font-semibold">Chương trình nổi bật</h2>
              <a
                href=""
                className="text-red-500 text-sm hover:underline hover:text-main"
              >
                Xem tất cả
              </a>
            </div>
            {/* slide */}
            <div className="flex flex-wrap p-2">
              
            </div>

            <div className="flex flex-wrap p-2">
              <div></div>
            </div>
            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
