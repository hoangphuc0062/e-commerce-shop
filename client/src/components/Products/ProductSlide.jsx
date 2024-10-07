import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { products } from "../../data/Product/Products";
import { Link } from "react-router-dom"; // Added import for Link
import Favorites from "../Button/Favorites";
import Ratings from "./Ratings";
const ProductSlide = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>
        {products.map((product) => (
          <div
            key={product.id}
            className="relative rounded-lg shadow-md overflow-hidden cursor-pointer px-2 py-2"
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
                <div className="absolute top-0 left-0 h-6 w-14 md:w-16">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/voi-tay-nguyen-datn.appspot.com/o/Nhan_cwuwhd.png?alt=media&token=1c12f273-922f-47db-88d2-09c5b5e0a6fa"
                    alt="Discount Label"
                    className="h-full w-full object-cover"
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
      </Slider>
    </div>
  );
};

export default ProductSlide;
