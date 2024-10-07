import HeadingIndex from "../Heading/HeadingIndex";
import BrandIndex from "../Brand/BrandIndex";
import ProductSlide from "./ProductSlide";

const Featured = ({ title, link }) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center p-2 space-y-2 md:space-y-0 md:space-x-2">
        <div className="w-full md:w-auto">
          <HeadingIndex title={title} link={link} />
        </div>
        <div className="w-full md:w-auto">
          <BrandIndex />
        </div>
      </div>
      <ProductSlide />
    </div>
  );
};

export default Featured;
