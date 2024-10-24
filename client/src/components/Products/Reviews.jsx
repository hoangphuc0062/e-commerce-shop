const Reviews = ({ product, reviews }) => {
  return (
    <div>
      <div className="p-4 rounded-lg shadow-md w-full flex flex-col gap-4 lg:w-[1010px] lg:h-[508px] overflow-y-auto scrollbar-hide">
        <h2 className="text-lg font-semibold text-black dark:text-white">
          Đánh giá & nhận xét {product?.name}
        </h2>
        <div className="flex flex-col gap-2">
          {reviews?.map((review) => (
            <div key={review?.id} className="p-2 border-b border-gray-200">
              <div className="flex gap-2">
                <h3 className="font-bold text-black dark:text-white">
                  {review?.name}
                </h3>
                <p className="text-sm text-zinc-500">{review?.date}</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex text-yellow-500">
                  {/* Responsive text sizes */}
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`${
                        index < review?.rating ? "text-yellow-500" : "text-gray-300"
                      } sm:text-sm md:text-base lg:text-lg xl:text-xl`}
                      aria-hidden="true"
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p>{review?.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
