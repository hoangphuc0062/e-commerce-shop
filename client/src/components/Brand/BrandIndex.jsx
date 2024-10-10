import { Brand } from "../../data/Product/Brand";

const BrandIndex = () => {
  return (
    <div className="flex overflow-x-auto sm:overflow-visible gap-2">
      {Brand.map((brand, index) => (
        <div
          key={index}
          className="flex-shrink-0 bg-gray-200 text-gray-800 px-3 py-1 rounded cursor-pointer text-sm sm:text-base hover:bg-main hover:text-white"
        >
          {brand.name}
        </div>
      ))}
      <div className="flex-shrink-0 bg-gray-200 text-gray-800 px-3 py-1 rounded cursor-pointer text-sm sm:text-base hover:bg-main hover:text-white">
        Xem tất cả
      </div>
    </div>
  );
};

export default BrandIndex;
