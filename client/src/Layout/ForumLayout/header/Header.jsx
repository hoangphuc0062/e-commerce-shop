import GroupInputForum from "../../../components/Input/GroupInputForum";

const Header = () => {
  return (
    <header className="bg-main py-2 px-4">
      <div className="container mx-auto">
        <div className="flex flex-row items-center justify-between">
          {/* Logo Section */}
          <div className="text-white text-[24px] leading-[32px] font-bold">
            Logo Here
          </div>

          {/* Search Section */}
          <GroupInputForum />
        </div>
      </div>
    </header>
  );
};

export default Header;
