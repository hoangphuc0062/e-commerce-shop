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

const ProductDetail = () => {
  const { IoIosStar } = icons;
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const foundProduct = products.find((product) => product.slug === slug);
    setProduct(foundProduct);
  }, [slug]);

  const handleNextImage = () => {
    if (product && selectedImage < product.images.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  const handlePrevImage = () => {
    if (product && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  return (
    <div className="container p-4 w-full flex">
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
                <p className="text-gray-500">{product.review} đánh giá</p>
                <Compare className="ml-4" />
              </div>
            </div>

            <div className="flex flex-col">
              {/* Product Images */}
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
              {/* Thumbnail List */}
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
          </div>
          {/* Product Options and Price */}
          <div className="w-full p-6">
            <div className="flex flex-col mb-4">
              <ProductOptions
                options={product.options}
                handleOptionClick={(option) => setSelectedOption(option)}
                selectedOption={selectedOption}
              />
              <ProductColors
                handleOptionClick={(color) => setSelectedColor(color)}
                selectedOption={selectedColor}
                productId={product.id}
              />
              {/* New Buttons */}
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
  );
};

export default ProductDetail;
