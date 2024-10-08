import { Link } from "react-router-dom";
import { products } from "../../data/Product/Products";
import Ratings from "../Products/Ratings";
import Favorites from "../Button/Favorites";

export const ProductCard = () => {
  return (
    <div className="flex flex-wrap p-2 gap-2">
      {products.map((product) => (
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
                  <span className="line-through text-muted text-xs">
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
  );
};
