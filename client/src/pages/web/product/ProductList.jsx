import ProductSlider from "../../../components/Banner/ProductSlider";
import BrandPhone from "../../../components/Brand/BrandPhone";
import CategorySelector from "../../../components/Card/CategorySelector";
import { ProductCard } from "../../../components/Card/ProductCard";
import QnASection from "../../../components/Form/QnAForm";
import PostTag from "../../../components/Forum/PostTag";
import Heading from "../../../components/Heading/Heading";
import CriteriaSelector from "../../../components/Products/CriteriaSelector";
import { products } from "../../../data/Product/Products";
import { images } from "../../../data/Product/SliderProduct";
import { brands } from "../../../data/Product/Brand";
const ProductList = () => {
  return (
    <div className="container w-full flex flex-col justify-center">
      <section className="flex flex-wrap p-2">
        <div className="w-full lg:w-1/2 p-2">
          <ProductSlider images={images} />
        </div>
        <div className="lg:w-1/2 p-2 hidden lg:block">
          <ProductSlider images={images} />
        </div>
      </section>
      <section className="w-full p-2 ">
        <BrandPhone brands={brands} />
      </section>
      <section className="w-full p-2">
        <Heading title="Chọn Theo Nhu Cầu" />
        <CategorySelector />
      </section>
      <section className="w-full p-2">
        <Heading title="Chọn Theo Tiêu Chí" />
        <CriteriaSelector />
      </section>
      <section className="w-full">
        <ProductCard products={products} />
      </section>
      <section className="w-full p-2">
        <Heading title="Tin tức về sản phẩm" />
        <div className="flex gap-2 overflow-x-auto pt-2">
          <PostTag category="Trên Tay" />
          <PostTag category="Tin Công Nghệ" />
          <PostTag category="Đánh Giá" />
        </div>
      </section>
      <section className="p-2 w-[90%]">
        <QnASection />
      </section>
    </div>
  );
};

export default ProductList;
