import { Link } from "react-router-dom";
import Ratings from "../Products/Ratings";
import Favorites from "../Button/Favorites";
import { useState } from "react";
import Heading from "../Heading/Heading";
import icons from "../../ultils/icon";

export const ProductCard = ({ products }) => {
  const { FaSortAmountDownAlt, FaSortAmountDown, FaPercent, IoEye } = icons;
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSortOptionClick = (option, field, order) => {
    setSelectedOption(option);
    setSortBy(field);
    setSortOrder(order);
    console.log(`Sorting by ${field} in ${order} order.`);
  };

  const getButtonClass = (option) => {
    return selectedOption === option
      ? "border-2 border-main bg-blue-50 p-2 rounded text-gray-800 flex items-center space-x-2"
      : "border-2 border-gray-300 p-2 rounded text-gray-800 flex items-center space-x-2";
  };
  const [sortBy, setSortBy] = useState("salePrice");
  const [sortOrder, setSortOrder] = useState("asc");

  const sortedProducts = products?.slice().sort((a, b) => {
    if (sortBy === "salePrice") {
      return sortOrder === "asc"
        ? a.options[0].salePrice - b.options[0].salePrice
        : b.options[0].salePrice - a.options[0].salePrice;
    } else if (sortBy === "discount") {
      return sortOrder === "asc"
        ? a.discount - b.discount
        : b.discount - a.discount;
    } else if (sortBy === "views") {
      return sortOrder === "asc" ? a.views - b.views : b.views - a.views;
    }
    return 0;
  });

  return (
    <>
      <section className="w-full p-2">
        <Heading title="Sắp Xếp Theo" />
        <div className="flex flex-wrap space-x-2 items-center">
          <button
            className={getButtonClass("Giá Cao - Thấp")}
            onClick={() =>
              handleSortOptionClick("Giá Cao - Thấp", "salePrice", "desc")
            }
          >
            <FaSortAmountDown />
            <span>Giá Cao - Thấp</span>
          </button>
          <button
            className={getButtonClass("Giá Thấp - Cao")}
            onClick={() =>
              handleSortOptionClick("Giá Thấp - Cao", "salePrice", "asc")
            }
          >
            <FaSortAmountDownAlt />
            <span>Giá Thấp - Cao</span>
          </button>
          <button
            className={getButtonClass("Khuyến Mãi Hot")}
            onClick={() =>
              handleSortOptionClick("Khuyến Mãi Hot", "discount", "desc")
            }
          >
            <FaPercent />
            <span>Khuyến Mãi Hot</span>
          </button>
          <button
            className={getButtonClass("Xem nhiều")}
            onClick={() => handleSortOptionClick("Xem nhiều", "views", "desc")}
          >
            <IoEye />
            <span>Xem nhiều</span>
          </button>
        </div>
      </section>
      <section className="w-full">
        <div className="flex flex-wrap p-2 gap-2">
          {sortedProducts?.map((product) => (
            <div
              key={product.id}
              className="relative w-[calc(50%-8px)] sm:w-[calc(50%-8px)] md:w-[calc(33.33%-8px)] lg:w-[calc(25%-8px)] xl:w-[calc(20%-8px)] rounded-lg shadow-md overflow-hidden"
            >
              {/* Product Link */}
              <Link to={`/phone/${product.slug}`} className="block">
                {/* Product Image */}
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full object-cover"
                />
                {/* Discount Label */}
                {product.discount && (
                  <div className="absolute top-0 left-0 w-20">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/voi-tay-nguyen-datn.appspot.com/o/Nhan_cwuwhd.png?alt=media&token=1c12f273-922f-47db-88d2-09c5b5e0a6fa"
                      alt="Discount Label"
                      className="w-full object-cover"
                    />
                    <span className="absolute top-1 left-2 flex items-center justify-center text-white font-bold text-sm">
                      Giảm {product.discount}%
                    </span>
                  </div>
                )}

                {/* Installment Label */}
                <span className="absolute top-0 right-0 bg-main text-white text-xs font-bold px-1 py-0.5 rounded">
                  Trả góp {product.installmentRate || "0%"}
                </span>

                {/* Product Details */}
                <div className="p-2">
                  <h2 className="text-sm font-semibold truncate text-ellipsis">
                    {product.name}
                  </h2>
                  <div className="flex items-center gap-1">
                    <p className="text-xs text-muted-foreground border rounded-md p-1">
                      {product.screen}
                    </p>
                    <p className="text-xs text-muted-foreground border rounded-md p-1">
                      {product.options[0].ram}
                    </p>
                    <p className="text-xs text-muted-foreground border rounded-md p-1">
                      {product.options[0].rom}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-primary pt-1">
                    {product.options[0].salePrice > 0
                      ? `${product.options[0].salePrice.toLocaleString()}đ `
                      : "Giá liên hệ"}
                    {product.options[0].salePrice > 0 && (
                      <span className="line-through text-muted text-xs text-gray-500">
                        {product.options[0].price.toLocaleString()}đ
                      </span>
                    )}
                  </p>
                </div>
              </Link>

              {/* Rating and Favorite Icon */}
              <div className="flex items-center justify-between p-2">
                <Ratings />
                <Favorites />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
