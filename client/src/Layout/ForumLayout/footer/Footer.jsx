import { Link } from "react-router-dom";
import { Section } from "./Section";
import { ContactForum } from "./ContactForum";

const Footer = () => {
  return (
    <footer className="bg-main py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4 text-white">
              KẾT NỐI VỚI SFORUM
            </h2>
            <div className="flex space-x-4">
              {ContactForum.map((item) => (
                <Link to={item.link} key={item.link}>
                  <item.icon className="text-2xl text-gray-300 hover:text-white" />
                </Link>
              ))}
            </div>
          </div>

          <div className="py-10">
            <ul className="flex flex-col space-y-2">
              {[
                "Giới Thiệu Sforum",
                "Chính sách bảo mật thông tin người dùng",
                "Liên hệ",
              ].map((item) => (
                <li
                  key={item}
                  className="mb-2 text-gray-300 hover:text-white py-2"
                >
                  <Link to="">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-white">
              WEBSITE THÀNH VIÊN
            </h2>
            {Section.map((item) => (
              <ul key={item.title} className="flex flex-col space-y-2">
                <li className="text-gray-300 py-2">
                  {item.title}
                  <Link
                    to={item.link}
                    className="text-red-500 hover:text-white cursor-pointer"
                  >
                    {item.name}
                  </Link>
                </li>
              </ul>
            ))}
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
