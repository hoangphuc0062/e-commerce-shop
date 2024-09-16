import { HorizonBanner } from "@/components/Banner/HorizonBanner";
import { MainSection } from "@/components/HomeSections/MainSection";

import { Helmet } from "react-helmet-async";
import Section from "@/components/HomeSections/Section";
function HomePage() {
  <Helmet>
    <title> Trang chủ </title>
  </Helmet>;
  return (
    <div className="container w-full p-3 ">
      <div className="main-banner">
        <MainSection />
        <HorizonBanner />
      </div>
      <div>
        <Section />
      </div>
    </div>
  );
}

export default HomePage;
