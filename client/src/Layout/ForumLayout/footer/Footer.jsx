import icons from "../../../ultils/icon";

const Footer = () => {
  const { FaFacebook, SiZalo, FaTiktok, FaYoutube } = icons;
  return (
    <footer className="bg-main text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">KẾT NỐI VỚI SFORUM</h2>
            <div className="flex space-x-4">
              <FaFacebook className="text-2xl text-white" />
              <SiZalo className="text-2xl text-white" />
              <FaTiktok className="text-2xl text-white" />
              <FaYoutube className="text-2xl text-white" />
            </div>
          </div>

          <div>
            <ul>
              <li className="mb-2">Giới Thiệu Sforum</li>
              <li className="mb-2">Chính sách bảo mật thông tin người dùng</li>
              <li className="mb-2">Liên hệ</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">WEBSITE THÀNH VIÊN</h2>
            <ul>
              <li className="mb-2">
                Hệ thống bán lẻ di động toàn quốc:{" "}
                <span className="text-red-500">Voi Tay Nguyen</span>
              </li>
              <li className="mb-2">
                Kênh thông tin giải trí công nghệ cho giới trẻ:{" "}
                <span className="text-red-500">Voi Tay Nguyen</span>
              </li>
              <li className="mb-2">
                Hệ thống bảo hành sửa chữa Điện thoại - Máy tính:{" "}
                <span className="text-red-500">Voi Tay Nguyen</span>
              </li>
              <li className="mb-2">
                Trung tâm bảo hành ủy quyền Apple:{" "}
                <span className="text-blue-500">Voi Tay Nguyen</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-sm">
          <p className="mb-2">
            © Công Ty TNHH Thương Mại Và Dịch Vụ Kỹ Thuật Diệu Phúc - GPĐKKD:
            0316172372 do sở KH & ĐT TP. HCM cấp ngày 02/03/2020 - Giấy phép
            thiết lập MXH số 497/GP-BTTTT do Bộ Thông tin và Truyền thông cấp
            ngày 17/7/2021 - Địa chỉ: 160/2 Y-Moal Êmuol, P.Tân An TP.Buôn Ma
            Thuật - Điện thoại: 0793.665.088.
          </p>
          <p className="mb-2">
            Bản quyền nội dung thuộc về Sforum.vn (hoặc Công Ty TNHH Thương Mại
            Và Dịch Vụ Kỹ Thuật Voi Tây Nguyên).Không được sao chép khi chưa
            được chấp thuận bằng văn bản.
          </p>
          {/*  Image logo of DMCA here */}
          {/* <img
            src="/images/dmca.png"
            alt="DMCA Protected"
            className="mx-auto mt-4"
          /> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
