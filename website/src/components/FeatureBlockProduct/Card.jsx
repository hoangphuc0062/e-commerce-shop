/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import { Icon } from "@iconify/react";
import { formatCurrency } from "../../utils/helper";

const ProductCard = ({ data }) => {
  const discountedPrice = data.price * (1 - data.discountPercent / 100);
  return (
    <div className="hover:shadow-xl">
      <div className="relative shadow-md overflow-hidden ">
        {data.discountPercent > 0 && (
          <div className="absolute top-0 left-0 w-24">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/voi-tay-nguyen-datn.appspot.com/o/Nhan_cwuwhd.png?alt=media&token=1c12f273-922f-47db-88d2-09c5b5e0a6fa"
              alt="Discount Label"
              className="w-full object-cover"
            />
            <span className="absolute flex items-center justify-center text-white font-bold text-sm top-1.5 left-3">
              Giảm {data.discountPercent}%
            </span>
          </div>
        )}
        <Link to={`/slug/${data.slug}`}>
          <img
            src={data.image}
            alt={data.name}
            className="w-full object-cover"
          />
          <div className="p-2 text-start">
            <h2 className="text-xl font-semibold line-clamp-1">{data.name}</h2>
            <div className="flex gap-2">
              <span className="text-main font-bold">
                {formatCurrency(discountedPrice)}
              </span>
              {data.discountPercent > 0 && (
                <span className="line-through text-gray-500">
                  {data.price.toLocaleString()}đ
                </span>
              )}
            </div>
          </div>
        </Link>
        <div className="flex items-center justify-between p-2">
          <div className="flex">
            {[...Array(data.rating)].map((_, i) => (
              <Icon
                key={i}
                icon="ic:outline-star"
                width="1.5rem"
                height="1.5rem"
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
