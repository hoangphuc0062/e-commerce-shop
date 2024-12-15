import { Account } from "../../../components/Button/Account";
import GroupInputForum from "../../../components/Input/GroupInputForum";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { logout, resetState } from "../../../redux/slices/auth";
import { handleToast } from "../../../../../website/src/ultils/toast";
import { UserContext } from "../../../context/AuthContext";
import { getWebConfig } from "../../../redux/slices/webConfig";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [dataWebConFig, setDataWbeConFig] = useState([]);

  const statusWebConFig = useSelector((state) => state.webConfig.status);
  const webConfig = useSelector((state) => state.webConfig.data);

  useEffect(() => {
    dispatch(getWebConfig());
  }, [dispatch]);

  useEffect(() => {
    if (statusWebConFig === "succeeded") {
      setDataWbeConFig(webConfig);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusWebConFig, dataWebConFig]);

  const status = useSelector((state) => state.auth?.statusGetMe || "idle");
  const user = useSelector((state) => state.auth?.data?.rs || null);

  useEffect(() => {
    if (status === "success") {
      setData(user);
    } else if (status === "failed") {
      console.error("Failed to fetch user data");
    }
  }, [status, user]);

  const { setLoginAuth } = useContext(UserContext);
  const handleLogout = () => {
    dispatch(logout()).then((result) => {
      if (result.type === "auth/logout/fulfilled") {
        handleToast("success", "Đăng xuất thành công");
        setLoginAuth(false);
        navigate("/");
        dispatch(resetState({ key: "statusLogout", value: "idle" }));
        dispatch(resetState({ key: "statusGetMe", value: "idle" }));
        setData(null);
      }
    });
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".user-menu")) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showMenu]);

  return (
    <header className="bg-main py-2 px-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto">
        <div className="flex flex-row items-center justify-between">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center w-1/3 space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center whitespace-nowrap dark:text-white">
              {dataWebConFig && (
                <img src={dataWebConFig[0]?.logo} alt="" width={100} />
              )}
            </span>
          </Link>

          {/* Search Section */}
          <GroupInputForum />

          {/* User Section */}
          <div className="flex items-center space-x-4 text-white">
            {data ? (
              <div className="relative user-menu">
                <div
                  onClick={toggleMenu}
                  className="cursor-pointer flex items-center"
                >
                  <Account name={data.name || "Người dùng"} />
                </div>
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                    <ul className="py-1 text-gray-700">
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Đăng xuất
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link to={"/login"}>
                <Account />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
