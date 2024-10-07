import { HorizonBanner } from "@/components/Banner/HorizonBanner";
import { MainSection } from "@/components/HomeSections/MainSection";
import Featured from "../../../components/Products/Featured";
function HomePage() {
  return (
    <div className="container w-full p-3">
      <div className="main-banner">
        <MainSection />
        <HorizonBanner />
      </div>
      <div className="main-content">
        <Featured title="Điện thoại nổi bật nhất" link="/phone" />
        <Featured title="Laptop" link="/laptop" />
        <Featured title="Màn hình, Máy tính để bàn" link="/desktop" />
        <Featured title="Màn tính bảng" link="/tablet" />
        <Featured title="Âm thanh" link="/audio" />
        <Featured title="Đồng hồ thông minh" link="/smartwatch" />
      </div>
    </div>
  );
}

export default HomePage;
