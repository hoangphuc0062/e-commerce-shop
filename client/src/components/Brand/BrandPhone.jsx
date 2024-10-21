import { Link } from "react-router-dom";

const BrandPhone = ({ brands }) => {
  return (
    <>
      <div className="hidden md:flex flex-wrap gap-1">
        {brands.map((brand) => (
          <Link
            key={brand.name}
            to={`/brands/${brand.slug}`}
            className="border border-gray-300 w-[98px] h-[28px] md:w-[120px] md:h-[36px] lg:w-[140px] lg:h-[40px] flex justify-center items-center bg-white transition-transform transform hover:scale-105 hover:border-main"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-[80px] h-[18px] md:w-[90px] md:h-[22px] lg:w-[100px] lg:h-[26px] object-contain"
            />
          </Link>
        ))}
      </div>

      <div className="md:hidden bg-white p-4 z-50 overflow-x-auto whitespace-nowrap">
        <div className="flex space-x-4">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              to={`/brands/${brand.slug}`}
              className="border border-gray-300 w-[98px] h-[28px] flex justify-center items-center bg-white transition-transform transform hover:scale-105 hover:border-main shrink-0"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-[80px] h-[18px] object-contain"
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default BrandPhone;
