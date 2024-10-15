import HeadingIndex from "../Heading/HeadingIndex";
import BrandIndex from "../Brand/BrandIndex";
import ProductSlide from "./ProductSlide";

const Featured = ({ title, link }) => {
  return (
    <div className="p-2">
      <div className="flex flex-wrap justify-between items-center space-y-2 lg:space-y-0 lg:space-x-2">
        <div className="w-full lg:w-1/2">
          <HeadingIndex title={title} link={link} />
        </div>
        <div className="w-full lg:w-1/2">
          <BrandIndex />
        </div>
      </div>
      <div className="mt-4">
        <ProductSlide />
      </div>
    </div>
  );
};

export default Featured;
