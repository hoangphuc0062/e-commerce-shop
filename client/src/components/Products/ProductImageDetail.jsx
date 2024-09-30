import { useState } from "react";
import { products } from "../../data/products";
const ProductImageDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const handleNextImage = () => {
    if (selectedImage < products.images.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  const handlePrevImage = () => {
    if (selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  return (
    <div className="flex flex-col items-center md:flex-row">
      {/* Main Image Display */}
      <div className="relative md:w-1/2">
        <img
          src={products.images[selectedImage]}
          alt="Product"
          className="w-full h-64 rounded-lg shadow-lg" // Adjusted height
        />
        {/* Left Arrow */}
        <button
          onClick={handlePrevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2"
          disabled={selectedImage === 0}
        >
          &lt;
        </button>
        {/* Right Arrow */}
        <button
          onClick={handleNextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2"
          disabled={selectedImage === products.images.length - 1}
        >
          &gt;
        </button>
      </div>

      {/* Thumbnail List */}
      <div className="flex overflow-x-auto mt-4 md:mt-0 md:ml-4 space-x-2">
        {products.images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`border-2 ${
              index === selectedImage ? "border-red-500" : "border-gray-200"
            } rounded-lg p-1`}
          >
            <img src={image} alt="Thumbnail" className="w-16 h-16" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageDetail;
