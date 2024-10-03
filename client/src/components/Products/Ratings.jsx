import { products } from "../../data/Product/Products";

const Ratings = () => {
  return (
    <div>
      <div className="flex text-[18px] text-yellow-500">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={
              index < products.rating ? "text-yellow-500" : "text-gray-300"
            }
            aria-hidden="true"
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
}

export default Ratings;
