import ProductSlider from "../../../components/Banner/ProductSlider";
import BrandPhone from "../../../components/Brand/BrandPhone";
import CategorySelector from "../../../components/Card/CategorySelector";
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
    </div>
  );
};

export default ProductList;
