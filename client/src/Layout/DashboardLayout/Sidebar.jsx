import { useState } from "react";
import { Link } from "react-router-dom";
import icons from "../../ultils/icon";
import { menuItems } from "./menuItems";
const { FaAngleDoubleRight, FaAngleDoubleLeft } = icons;

function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSidebar = () => setExpanded(!expanded);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className={`lg:hidden w-10 h-10 p-2 dark:text-white dark:bg-gray-900 fixed top-4 z-50 rounded-md ${
          isMobileMenuOpen ? "right-4" : "left-4"
        }`}
      >
        {isMobileMenuOpen ? "X" : "☰"}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 min-h-screen z-40 transition-transform transform lg:translate-x-0 border-r-2 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:flex lg:w-auto sidebar ${
          expanded ? "w-64" : "w-20"
        } dark:bg-gray-900 flex flex-col p-4 transition-all duration-300`}
      >
        <div className="flex justify-between items-center mb-4">
          <img
            className={`text-lg font-bold w-16 ${
              expanded ? "block" : "hidden"
            }`}
            src="https://scontent.fbmv1-1.fna.fbcdn.net/v/t39.30808-1/454935858_1025894225852691_7770544709709728940_n.jpg"
            alt="Logo"
          />

          <button
            onClick={toggleSidebar}
            className="p-4 rounded-md text-center dark:text-white"
            aria-label={expanded ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {expanded ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
          </button>
        </div>

        {/* Sidebar Menu Items */}
        <ul className="flex flex-col space-y-4">
          {menuItems.map((item) => (
            <li key={item.label} className="dark:text-white">
              <Link
                to={item.path} // Assuming each menu item has a 'path' property
                className="cursor-pointer dark:hover:bg-gray-800 p-2 rounded-md flex items-center"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className={`ml-2 ${expanded ? "inline" : "hidden"}`}>
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          onClick={toggleMobileMenu}
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
        ></div>
      )}
    </>
  );
}

export default Sidebar;
