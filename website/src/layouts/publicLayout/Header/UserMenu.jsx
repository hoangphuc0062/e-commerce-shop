/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../../../context/AuthContext";
import { handleToast } from "../../../ultils/toast";
import { logout, resetState } from "../../../redux/slices/auth";

export const UserMenu = ({ data }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".user-menu")) {
      setDropdownOpen(false);
    }
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.auth.statusLogout);
  const { setLoginAuth } = useContext(UserContext);
  const handleLogout = () => {
    dispatch(logout());
  };
  useEffect(() => {
    if (status === "success") {
      setLoginAuth(false);
      handleToast("success", "Đăng xuất thành công");
      navigate("/login");
      dispatch(resetState({ key: "statusLogout", value: "idle" }));
      dispatch(resetState({ key: "statusGetMe", value: "idle" }));
      setDropdownOpen(false);
    }
  }, [status, setLoginAuth, navigate, dispatch]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative user-menu">
      {data ? (
        <button
          onClick={toggleDropdown}
          className="flex flex-col items-center justify-center text-[12px] hover:bg-hv p-2 rounded-lg"
        >
          <Icon icon="carbon:user-avatar" width="1.5rem" height="1.5rem" />
          <p className="line-clamp-2">{data.name || "Người dùng"}</p>
        </button>
      ) : (
        <Link
          to="/login"
          className="flex flex-col items-center justify-center text-[12px] hover:bg-hv p-2 rounded-lg"
        >
          <Icon icon="carbon:user-avatar" width="1.5rem" height="1.5rem" />
          <p className="line-clamp-2">Đăng nhập</p>
        </Link>
      )}

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
          <ul className="py-2">
            <li>
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Trang cá nhân
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Cài đặt
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Đăng xuất
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
