import { SingleBanner } from "../../../components/Banner/SingleBanner/SingleBanner";
import SliderBanner from "../../../components/Banner/SliderBanner/SliderBanner";

export const Banner = () => {
  return (
    <div className="flex gap-3">
      <div className="hidden w-1/6 lg:block">Menu Tree</div>
      <div className="w-full  lg:w-4/6 bg-whiteColor drop-shadow-main">
        <SliderBanner />
      </div>

      <div className="hidden w-1/6 lg:block ">
        <SingleBanner />
      </div>
    </div>
  );
};
