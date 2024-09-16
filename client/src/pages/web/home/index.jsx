import { MainSection } from "../../../components/HomeSections/MainSection";
import { Helmet } from "react-helmet-async";
function HomePage() {
  <Helmet>
    <title> Trang chủ </title>
  </Helmet>;
  return (
    <div className="container w-full p-3 ">
      <div className="main-banner">
        <MainSection />
      </div>
    </div>
  );
}

export default HomePage;
