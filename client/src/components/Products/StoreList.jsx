import Heading from "../Heading/Heading";
import icons from "../../ultils/icon";
const StoreList = () => {
  const { FaPhoneAlt, FaLocationDot } = icons;
  const stores = [
    { phone: "0287108335", address: "55B Trần Quang Khải, P.Tân Định, Q.1" },
    { phone: "0287100021", address: "218-220 Trần Quang Khải, P.Tân Định, Q.1" },
    { phone: "0287100139", address: "139 Trần Nào, P. Bình An, Q.2" },
    { phone: "0287101019", address: "190 Nguyễn Thị Định, khu phố 2, P. An Phú, Q.2" },
    { phone: "0287108807", address: "1075B Hậu Giang, P. 11, Q.6" },
    { phone: "0287108824", address: "248 Nguyễn Thị Thập, P. Tân Quy, Q.7" },
    { phone: "0287108824", address: "248 Nguyễn Thị Thập, P. Tân Quy, Q.7" },
    { phone: "0287108824", address: "248 Nguyễn Thị Thập, P. Tân Quy, Q.7" },
    { phone: "0287108824", address: "248 Nguyễn Thị Thập, P. Tân Quy, Q.7" },
    { phone: "0287108824", address: "248 Nguyễn Thị Thập, P. Tân Quy, Q.7" },
    { phone: "0287108824", address: "248 Nguyễn Thị Thập, P. Tân Quy, Q.7" },
    { phone: "0287108824", address: "248 Nguyễn Thị Thập, P. Tân Quy, Q.7" },
    { phone: "0287108824", address: "248 Nguyễn Thị Thập, P. Tân Quy, Q.7" },
  ];

  return (
    <div className="p-4 border rounded-lg shadow-md w-[50%] overflow-y-auto max-h-[250px]">
      <Heading title={`Có ${stores.length} cửa hàng có sản phẩm`} />
      <ul className="space-y-2">
        {stores.map((store, index) => (
          <li key={index} className="flex items-center">
            <p className="text-[14px] flex items-center text-main text-bold hover:underline cursor-pointer">
              <FaPhoneAlt className="inline-block mr-2" />
              {store.phone}
            </p>
            <span className="mx-2">-</span>
            <p className="text-[12px] flex text-main cursor-pointer truncate text-ellipsis underline">
              {store.address}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default StoreList;
