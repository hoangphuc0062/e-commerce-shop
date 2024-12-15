import icons from "../../ultils/icon";

export const Account = ({ name }) => {
  const { CiUser } = icons;
  return (
    <button className=" hidden lg:block text-xs text-center hover:bg-hv word-break p-2 rounded">
      <div className="flex flex-col items-center ml-2 ">
        <div className="text-2xl">
          <CiUser />
        </div>

        <div className="text-xs ">{name ? name : "Đăng nhập"}</div>
      </div>
    </button>
  );
};
