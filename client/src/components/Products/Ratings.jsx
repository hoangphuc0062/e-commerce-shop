import { products } from "../../data/Product/Products";

const Ratings = () => {
  const rating = products.rating || 0; // Assuming products.rating is a number, fallback to 0 if undefined

  return (
    <div>
      <div className="flex text-yellow-500">
        {/* Responsive text sizes */}
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`${
              index < rating ? "text-yellow-500" : "text-gray-300"
            } sm:text-sm md:text-base lg:text-lg xl:text-xl`}
            aria-hidden="true"
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default Ratings;
