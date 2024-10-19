import HeadingIndex from "../Heading/HeadingIndex";
import BrandIndex from "../Brand/BrandIndex";
import ProductSlide from "./ProductSlide";
import { products } from "../../data/Product/Products";
import { brands } from "../../data/Product/Brand";
const Featured = ({ title, link }) => {
  return (
    <div className="p-2">
      <div className="flex lg:flex-row flex-col justify-between items-center space-y-2 lg:space-y-0 lg:space-x-2">
        <div className="w-full">
          <HeadingIndex title={title} link={link} />
        </div>
        <div className="w-full ">
          <BrandIndex brands={brands} />
        </div>
      </div>
      <div className="mt-4">
        <ProductSlide products={products} />
      </div>
    </div>
  );
};

export default Featured;
