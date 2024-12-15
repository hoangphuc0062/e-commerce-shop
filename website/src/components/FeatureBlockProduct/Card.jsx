/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import { Icon } from "@iconify/react";
import { formatCurrency } from "../../utils/helper";

const ProductCard = ({ data }) => {
  const discountedPrice =
    data.discount > 0
      ? data.price - (data.price * data.discount) / 100
      : data.price;

  const name = data.name;
  const rating = 5;
  return (
    <div className="hover:shadow-xl card__product ">
      <div className="relative shadow-md ">
        {/* Discount Label */}
        {data.discount > 0 && (
          <div className="absolute top-0 left-0 w-24 z-10">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/voi-tay-nguyen-datn.appspot.com/o/Nhan_cwuwhd.png?alt=media&token=1c12f273-922f-47db-88d2-09c5b5e0a6fa"
              alt="Discount Label"
              className="w-full object-cover"
            />
            <span className="absolute flex items-center justify-center text-white font-bold text-sm top-1.5 left-3">
              Giảm {data.discount}%
            </span>
          </div>
        )}
        <Link
          to={`/${data?.category?.slug}/${data?.brand?.slug}/${data?.slug}`}
        >
          <div className="h-[300px] overflow-hidden ">
            <img
              src={data.thumbnail}
              alt={name}
              className="w-full h-full object-contain product__thumbnail "
            />
          </div>
          <div className="p-2 text-start">
            <h2 className="text-xl font-semibold line-clamp-1">{name}</h2>
            <div className="flex flex-col md:flex-row gap-2">
              <span className="text-main font-bold">
                {formatCurrency(discountedPrice)}
              </span>
              {data.discount > 0 && (
                <span className="line-through text-gray-500">
                  {formatCurrency(data.price)}
                </span>
              )}
            </div>
          </div>
        </Link>
        <div className="flex items-center justify-between p-2">
          <div className="flex ">
            {[...Array(Math.floor(rating))].map((_, i) => (
              <Icon
                key={i}
                icon="ic:outline-star"
                width="1rem"
                height="1rem"
                className="text-yellow-500"
              />
            ))}
          </div>
          <div>
            <Icon
              icon="mdi-light:heart"
              width="2rem"
              height="2rem"
              className="text-blue-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
