import { products } from "../../../data/Product/Products";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import icons from "../../../ultils/icon";
import { Compare } from "../../../components/Button/Compare";
import ProductOptions from "../../../components/Products/ProductOptions";
import ProductColors from "../../../components/Products/ProductColors";
const ProductDetail = () => {
  const { IoIosArrowBack, IoIosArrowForward, IoIosStar } = icons;
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null); // Changed to a single object
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
                {/* Left Arrow */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-e-full p-4"
                  disabled={selectedImage === 0}
                >
                  <IoIosArrowBack />
                </button>
                {/* Right Arrow */}
                <button
                  onClick={handleNextImage}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-s-full p-4"
                  disabled={selectedImage === product.images.length - 1}
                >
                  <IoIosArrowForward />
                </button>
              </div>
              {/* Thumbnail List */}
              <div className="flex overflow-x-auto mt-4">
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
          {/* Product Options */}
          <div className="w-full pl-4">
            <ProductOptions
              options={product.options}
              handleOptionClick={(option) => setSelectedOption(option)}
              selectedOption={selectedOption}
            />
            <ProductColors />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
