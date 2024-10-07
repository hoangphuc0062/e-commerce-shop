import { products } from "../../../data/Product/Products";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import icons from "../../../ultils/icon";
import { Compare } from "../../../components/Button/Compare";
import ProductOptions from "../../../components/Products/ProductOptions";
import ProductColors from "../../../components/Products/ProductColors";
import LeftArrow from "../../../components/Button/LeftArrow";
import RightArrow from "../../../components/Button/RightArrow";
import { Button } from "../../../components/Button/Button";
import AddToCart from "../../../components/Button/AddToCart";
import ProductInfo from "../../../components/Products/ProductInfo";
import StoreList from "../../../components/Products/StoreList";
import TextBgrGray from "../../../components/Products/Text/TextBgrGray";
import TextBgrWhite from "../../../components/Products/Text/TextBgrWhite";
import QnASection from "../../../components/Form/QnAForm";
import SmallPost from "../../../components/Forum/SmallPost";
import Heading from "../../../components/Heading/Heading";

const ProductDetail = () => {
  const { IoIosStar } = icons;
  const [product, setProduct] = useState(null); // Changed from [] to null
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const foundProduct = products.find((product) => product.slug === slug);
    setProduct(foundProduct);
  }, [slug]);

  const handleNextImage = () => {
    if (
      product &&
      product.images &&
      selectedImage < product.images.length - 1
    ) {
      setSelectedImage(selectedImage + 1);
    }
  };

  const handlePrevImage = () => {
    if (product && product.images && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="container p-4 w-full flex flex-col">
      <div className="w-full flex">
        {product && (
          <div className="flex w-full">
            <div className="flex flex-col w-3/4">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-gray-800">
                  {product.name}
                </h2>
                <div className="flex items-center gap-2">
                  <div className="flex text-[18px] text-yellow-500">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={
                          index < product.rating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }
                        aria-hidden="true"
                      >
                        <IoIosStar />
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-500">{product?.review} đánh giá</p>
                  <Compare className="ml-4" />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="h-[400px] w-[750px] relative rounded-lg shadow-lg flex items-center justify-center">
                  <img
                    src={product.images[selectedImage]}
                    alt="Product"
                    className="w-[280px] h-[280px] object-cover"
                  />
                  <LeftArrow
                    handleOnClick={handlePrevImage}
                    disabled={selectedImage === 0}
                  />
                  <RightArrow
                    handleOnClick={handleNextImage}
                    disabled={selectedImage === product.images.length - 1}
                  />
                </div>

                <div className="flex overflow-x-auto mt-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`border-2 ${
                        index === selectedImage
                          ? "border-main"
                          : "border-gray-200"
                      } rounded-lg p-1`}
                    >
                      <img
                        src={image}
                        alt="Thumbnail"
                        className="w-16 h-16 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-full p-2 flex gap-4">
                <ProductInfo />
                <StoreList />
              </div>
            </div>

            <div className="w-full p-6">
              <div className="flex flex-col mb-4">
                <ProductOptions
                  options={product.options}
                  handleOptionClick={handleOptionChange}
                  selectedOption={selectedOption}
                />
                <ProductColors
                  handleOptionClick={(color) => setSelectedColor(color)}
                  selectedOption={selectedColor}
                  productId={product.id}
                />
                <div className="flex gap-4 mt-4">
                  <Button
                    content="(Giao nhanh từ 2 giờ hoặc nhận tại cửa hàng)"
                    subContent="MUA NGAY"
                  />
                  <AddToCart />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="w-full p-2 m-2">
        {product && (
          <div className="mt-2 flex gap-4">
            <div className="p-6 bg-white dark:bg-card rounded-lg shadow-lg w-3/4 overflow-y-auto h-[350px]">
              <h2 className="text-xl font-bold text-main dark:text-zinc-200 mb-4 text-center ">
                Đặc Điểm Nổi Bật Của {product.name}
              </h2>
              <div className="p-4 rounded-lg mb-4">
                <p className="text-gray-500">{product.description}</p>
              </div>
            </div>
            <div className="w-1/4 overflow-y-auto h-[350px] bg-white dark:bg-card rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-main pl-4 pt-2">
                Thông số kỹ thuật
              </h2>
              <div className="p-4 rounded-lg m-4">
                <TextBgrGray
                  text={`RAM: ${
                    selectedOption ? selectedOption.ram : product.options[0].ram
                  }`}
                />
                <TextBgrWhite
                  text={`ROM: ${
                    selectedOption ? selectedOption.rom : product.options[0].rom
                  }`}
                />
                <TextBgrGray text={`Kích thước màn hình: ${product.screen}`} />
                <TextBgrWhite
                  text={`Màu sắc: ${product.options
                    .map((option) => option.colors)
                    .join(", ")}`}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex">
        <section className="p-2 w-[70%]">
          <QnASection />
        </section>
        <section className="p-2 w-[30%]">
          <div className="p-6 bg-white dark:bg-card rounded-lg shadow-lg">
            <Heading title="Tin tức nổi bật" />
            <SmallPost />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
