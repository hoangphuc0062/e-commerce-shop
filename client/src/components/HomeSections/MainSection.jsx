import React from "react";
import SliderBanner from "../Banner/SliderBanner";
import { SingleBanner } from "../Banner/SingleBanner";

export const MainSection = () => {
  return (
    <div className="flex gap-3">
      <div className="hidden w-1/6 lg:block">MenuTree</div>
      <div className="w-full lg:w-4/6">
        <SliderBanner />
      </div>
      <div className="w-full lg:w-1/6">
        <SingleBanner />
      </div>
    </div>
  );
};
