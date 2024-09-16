import SliderBanner from "../Banner/SliderBanner";
import { SingleBanner } from "../Banner/SingleBanner";
import MenuTree from "../MenuTree/MenuTree";

export const MainSection = () => {
  return (
    <div className="flex gap-3">
      <div className="hidden w-1/6 lg:block">
        <MenuTree />
      </div>
      <div className="w-full lg:w-4/6 bg-whiteColor">
        <SliderBanner />
      </div>
      <div className="w-full lg:w-1/6">
        <SingleBanner />
      </div>
    </div>
  );
};
