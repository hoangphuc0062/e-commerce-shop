import { Link } from "react-router-dom";
import icons from "../../../ultils/icon";

const Footer = () => {
  const { FaFacebook, SiZalo, FaTiktok, FaYoutube } = icons;
  return (
    <footer className="bg-main text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">KẾT NỐI VỚI SFORUM</h2>
            <div className="flex space-x-4">
              <Link to="">
                <FaFacebook className="text-2xl text-white" />
              </Link>
              <Link to="">
                <SiZalo className="text-2xl text-white" />
              </Link>
              <Link to="">
                <FaTiktok className="text-2xl text-white" />
              </Link>
              <Link to="">
                <FaYoutube className="text-2xl text-white" />
              </Link>
            </div>
          </div>

          <div>
            <ul>
              <li className="mb-2">
                <Link to="">Giới Thiệu Sforum</Link>
              </li>
              <li className="mb-2">
                <Link to="">Chính sách bảo mật thông tin người dùng</Link>
              </li>
              <li className="mb-2">
                <Link to="">Liên hệ</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">WEBSITE THÀNH VIÊN</h2>
            <ul>
              <li className="mb-2">
                Hệ thống bán lẻ di động toàn quốc:{" "}
                <span className="text-red-500">
                  <Link to="">Voi Tay Nguyen</Link>
                </span>
              </li>
              <li className="mb-2">
                Kênh thông tin giải trí công nghệ cho giới trẻ:{" "}
                <span className="text-red-500">
                  <Link to="">Voi Tay Nguyen</Link>
                </span>
              </li>
              <li className="mb-2">
                Hệ thống bảo hành sửa chữa Điện thoại - Máy tính:{" "}
                <span className="text-red-500">
                  <Link to="">Voi Tay Nguyen</Link>
                </span>
              </li>
              <li className="mb-2">
                Trung tâm bảo hành ủy quyền Apple:{" "}
                <span className="text-blue-500">
                  <Link to="">Voi Tay Nguyen</Link>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-10 border-gray-400" />
        <div className="flex flex-wrap max-md:flex-col gap-4">
          <ul className="md:flex md:space-x-6 max-md:space-y-2">
            {["Điều khoản dịch vụ", "Chính sách bảo mật"].map((item) => (
              <li key={item}>
                <Link
                  to="javascript:void(0)"
                  className="hover:text-white text-gray-300 text-sm"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-gray-300 text-sm md:ml-auto">
            © Team Voi Tây Nguyên 2024
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
