import { Link } from "react-router-dom";
import { sections } from "./sections";
import { useState } from "react";
const Footer = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  return (
    <footer className="font-sans tracking-wide bg-main px-8 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
        <div>
          <Link to="javascript:void(0)">
            <img
              src="https://readymadeui.com/readymadeui-white.svg"
              alt="logo"
              className="w-44"
            />
          </Link>
        </div>

        {sections.map(({ title, links }) => (
          <div key={title}>
            <h4
              className="text-white font-semibold text-lg relative cursor-pointer sm:cursor-auto"
              onClick={() => toggleSection(title)}
            >
              {title}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
                className={`absolute right-0 top-1 fill-[#d6d6d6] sm:hidden transition-transform transform ${
                  expandedSection === title ? "rotate-180" : ""
                }`}
                viewBox="0 0 24 24"
              >
                <path d="M12 16l-6-6a1 1 0 011.42-1.42L12 13.58l5.29-5.29A1 1 0 0118.71 10l-6 6a1 1 0 01-.71.29z" />
              </svg>
            </h4>

            <ul
              className={`mt-6 space-y-5 sm:block ${
                expandedSection === title ? "block" : "hidden"
              }`}
            >
              {links.map((link) => (
                <li key={link}>
                  <Link
                    to="javascript:void(0)"
                    className="hover:text-white text-gray-300 text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
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
    </footer>
  );
};

export default Footer;
