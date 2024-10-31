import { HorizonBanner } from "@/components/Banner/HorizonBanner";
import { MainSection } from "@/components/HomeSections/MainSection";
import Featured from "../../../components/Products/Featured";
import CategoriesProduct from "../../../components/Products/CategoriesProduct";
import HeadingIndex from "../../../components/Heading/HeadingIndex";
import { SliderPost } from "../../../components/Forum";
function HomePage() {
  return (
    <div className="container w-full p-3">
      <div className="main-banner">
        <MainSection />
        <HorizonBanner />
      </div>
      <div className="main-content">
        <Featured title="Điện thoại nổi bật nhất" link="/phone" />
        <Featured title="Laptop nổi bật nhất" link="/laptop" />
        <div className="pt-4 w-full">
          <CategoriesProduct title="Phụ kiện" />
          <CategoriesProduct title="Linh kiện máy tính" />
          <div className="pt-4">
            <HeadingIndex title="Tin Công Nghệ" link="/forum" />
            <SliderPost category="S-Games" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
