import icons from "../../ultils/icon";

const CategoryProfile = [
  {
    id: 1,
    name: "Trang chủ",
    icon: icons.CiHome,
    link: "/profile",
  },
  {
    id: 2,
    name: "Tài khoản của bạn",
    icon: icons.FiUser,
    link: "/profile/accountuser",
  },
  
  {
    id: 3,
    name: "Lịch sử mua hàng",
    icon: icons.PiNotepadBold,
    link: "/profile/orderuser",
  },
  {
    id: 4,
    name: "Quản lý đơn hàng",
    icon: icons.MdManageAccounts,
    link: "",
  },
  {
    id: 5,
    name: "Đăng xuất",
    icon: icons.CiLogout,
    link: "",
  },

];

export default CategoryProfile;
