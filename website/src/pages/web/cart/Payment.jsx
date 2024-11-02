import React from "react";

export default function Payment({
  paymentMethods,
  selectedMethod,
  setSelectedMethod,
}) {
  return (
    <div>
      {paymentMethods.map((method, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-md shadow-md w-full max-w-[600px] mx-auto mb-5"
        >
          <div
            onClick={() => {
              setSelectedMethod(method.id);
              console.log(selectedMethod);
            }}
            className="flex items-center justify-between p-4 border border-gray-300 rounded-md"
          >
            <div className="flex items-center">
              <img
                src={method.imageSrc}
                alt="Payment Method"
                className="mr-2 w-12 h-12"
              />
              <span className="text-red-600 font-bold">{method.label}</span>
            </div>
            <span className="text-sm text-gray-600">{method.discountText}</span>
            <input
              type="radio"
              name="paymentMethod"
              className="ml-2 text-gray-400"
              checked={selectedMethod === method.id}
              onChange={() => {
                setSelectedMethod(method.id);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
