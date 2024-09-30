import { HorizonBanner } from "@/components/Banner/HorizonBanner";
import { MainSection } from "@/components/HomeSections/MainSection";

function HomePage() {
  return (
    <div className="container w-full p-3 ">
      <div className="main-banner">
        <MainSection />
        <HorizonBanner />
      </div>
    </div>
  );
}

export default HomePage;
