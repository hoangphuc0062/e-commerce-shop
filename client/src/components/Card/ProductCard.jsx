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
          className="relative w-[250px] md:w-[250px] lg:w-[250px] rounded-lg shadow-md overflow-hidden"
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
              <div className="absolute top-0 left-0 h-8">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/voi-tay-nguyen-datn.appspot.com/o/Nhan_cwuwhd.png?alt=media&token=1c12f273-922f-47db-88d2-09c5b5e0a6fa"
                  alt="Discount Label"
                  className="h-full w-full object-cover"
                />
                <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                  Giảm {product.discount}%
                </span>
              </div>
            )}

            {/* Installment Label */}
            <span className="absolute top-0 right-0 bg-main text-white text-xs font-bold px-2 py-1 rounded">
              Trả góp {product.installmentRate || "0%"}
            </span>

            {/* Product Details */}
            <div className="p-4">
              <h2 className="text-lg font-semibold truncate text-ellipsis">
                {product.name}
              </h2>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground border rounded-md p-1">
                  {product.screen}
                </p>
                <p className="text-sm text-muted-foreground border rounded-md p-1">
                  {product.options[0].ram}
                </p>
                <p className="text-sm text-muted-foreground border rounded-md p-1">
                  {product.options[0].rom}
                </p>
              </div>
              <p className="text-[16px] font-bold text-primary pt-2">
                {product.options[0].salePrice > 0
                  ? `${product.options[0].salePrice.toLocaleString()}đ `
                  : "Giá liên hệ"}
                {product.options[0].salePrice > 0 && (
                  <span className="line-through text-muted">
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
