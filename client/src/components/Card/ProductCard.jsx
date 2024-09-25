import { products } from "../../data/Product/Products";
import icons from "../../ultils/icon";

export const ProductCard = () => {
  const { AiOutlineHeart } = icons;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-2 gap-2">
      {products.map((product) => (
        <div
          key={product.id}
          className="relative w-full rounded-lg shadow-md overflow-hidden cursor-pointer"
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-auto"
          />
          <span className="absolute top-2 left-2 bg-main text-white text-xs font-bold px-2 py-1 rounded">
            Giảm {product.discount}%
          </span>
          <span className="absolute top-2 right-2 border-2 border-main text-main text-xs font-bold px-2 py-1 rounded">
            Trả góp 0%
          </span>
          <div className="p-4">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground border rounded-md p-1">
                {product.screen}
              </p>
              <p className="text-sm text-muted-foreground border rounded-md p-1">
                {product.ram}
              </p>
              <p className="text-sm text-muted-foreground border rounded-md p-1">
                {product.rom}
              </p>
            </div>
            <p className="text-xl font-bold text-primary">
              {product.salePrice}đ{" "}
              <span className="line-through text-muted">{product.price}đ</span>
            </p>
          </div>
        </div>
      ))}
      
    </div>
  );
};
