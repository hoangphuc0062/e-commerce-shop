/* eslint-disable react/prop-types */

export default function Discount({ discountOptions, setDiscountCode }) {
  return (
    <div>
      {discountOptions.map((discount) => (
        <div
          key={discount.id}
          className="flex items-center justify-between p-3 border rounded-md mb-2 bg-white"
        >
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/40" // Replace with actual discount image URL
              alt="Discount"
              className="w-10 h-10 object-cover rounded mr-3"
            />
            <div>
              <p className="font-semibold">{discount.description}</p>
              <p className="text-gray-500 text-sm">{discount.minOrder}</p>
              <p className="text-gray-400 text-xs">
                Mã: {discount.code} | HSD: {discount.expiry}
              </p>
            </div>
          </div>
          <button
            className="px-4 py-1 bg-blue-500 text-white text-sm rounded-md"
            onClick={() => setDiscountCode(discount.code)}
          >
            Áp dụng
          </button>
        </div>
      ))}
    </div>
  );
}
