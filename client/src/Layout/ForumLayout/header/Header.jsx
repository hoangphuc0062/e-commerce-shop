import GroupInputForum from "../../../components/Input/GroupInputForum";
import { Link } from "react-router-dom";
const Header = () => {
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
        </div>
      </div>
    </header>
  );
};

export default Header;
