import ProductSlider from "../../../components/Banner/ProductSlider";
import BrandPhone from "../../../components/Brand/BrandPhone";
import CategorySelector from "../../../components/Card/CategorySelector";
import Heading from "../../../components/Heading/Heading";

const ProductList = () => {
  return (
    <div className="container w-full mx-auto px-2">
      <section className="flex flex-wrap p-2">
        <div className="w-full md:w-2/3 lg:w-3/4 xl:w-4/5 mx-auto">
          <ProductSlider />
        </div>
      </section>
      <section className="w-full p-2">
        <div className="w-full md:w-2/3 lg:w-3/4 xl:w-4/5 mx-auto">
          <BrandPhone />
        </div>
      </section>
      <section className="w-full p-2">
        <div className="w-full md:w-2/3 lg:w-3/4 xl:w-4/5 mx-auto">
          <Heading title="Chọn Theo Nhu Cầu" />
          <CategorySelector />
        </div>
      </section>
    </div>
  );
};

export default ProductList;
