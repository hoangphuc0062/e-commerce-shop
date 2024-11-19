import { Account } from "../../../components/Button/Account";
import GroupInputForum from "../../../components/Input/GroupInputForum";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { getCurrentCustomerByCookie } from "../../../redux/slices/customer";

const Header = () => {
  const dispatch = useDispatch();
  const isLoginned = useSelector((state) => state.customer.isLoginned);
  const customerData = useSelector((state) => state.customer.customer);

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken && !isLoginned) {
      dispatch(getCurrentCustomerByCookie());
    } else {
      console.log("no token");
    }
  }, [dispatch, isLoginned]);

  console.log("Redux isLoginned:", isLoginned);
  console.log("Redux customerData:", customerData);

  return (
    <header className="bg-main py-2 px-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto">
        <div className="flex flex-row items-center justify-between">
          {/* Logo Section */}
          <Link to="/">
            <div className="text-white text-[24px] leading-[32px] font-bold">
              Logo Here
            </div>
          </Link>

          {/* Search Section */}
          <GroupInputForum />

          <div className="flex items-center space-x-4">
            {isLoginned ? (
              <Link to={"/profile"}>
                <Account name={customerData?.name || "User"} />
              </Link>
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
