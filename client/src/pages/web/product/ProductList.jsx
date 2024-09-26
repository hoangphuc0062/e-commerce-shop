import ProductSlider from "../../../components/Banner/ProductSlider";
import BrandPhone from "../../../components/Brand/BrandPhone";
import CategorySelector from "../../../components/Card/CategorySelector";
import { ProductCard } from "../../../components/Card/ProductCard";
import SortOptions from "../../../components/Card/SortOptions";
import Heading from "../../../components/Heading/Heading";
import CriteriaSelector from "../../../components/Products/CriteriaSelector";

const ProductList = () => {
  return (
    <div className="container w-full">
      <section className="flex flex-wrap p-2">
        <div className="w-1/2 p-2">
          <ProductSlider />
        </div>
        <div className="w-1/2 p-2">
          <ProductSlider />
        </div>
      </section>
      <section className="w-full p-2">
        <BrandPhone />
      </section>
      <section className="w-full p-2">
        <Heading title="Chọn Theo Nhu Cầu" />
        <CategorySelector />
      </section>
      <section className="w-full p-2">
        <Heading title="Lựa Chọn Theo Tiêu Chí" />
        <CriteriaSelector />
      </section>
      <section className="w-full p-2">
        <Heading title="Sắp Xếp Theo" />
        <SortOptions />
      </section>
      <section className="w-full p-2">
        <ProductCard />
      </section>
    </div>
  );
};

export default ProductList;
