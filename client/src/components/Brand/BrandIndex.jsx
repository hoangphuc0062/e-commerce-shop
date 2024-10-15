import { Link } from 'react-router-dom';

const BrandIndex = ({ brands }) => {
  return (
    <div className="flex overflow-x-auto sm:overflow-visible gap-2">
      {brands.map((brand, index) => (
        <Link
          key={index}
          to={`/brands/${brand.id}`}
          className="flex-shrink-0 bg-gray-200 text-gray-800 px-3 py-1 rounded cursor-pointer text-sm sm:text-base hover:bg-main hover:text-white"
        >
          {brand.name}
        </Link>
      ))}
      <Link
        to="/brands/all"
        className="flex-shrink-0 bg-gray-200 text-gray-800 px-3 py-1 rounded cursor-pointer text-sm sm:text-base hover:bg-main hover:text-white"
      >
        Xem tất cả
      </Link>
    </div>
  );
};

export default BrandIndex;
