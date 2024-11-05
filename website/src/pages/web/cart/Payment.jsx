/* eslint-disable react/prop-types */

export default function Payment({ paymentMethods, formik, subTotal }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Phương thức thanh toán</h2>
      {paymentMethods.map((method, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-md shadow-md w-full max-w-[600px] mx-auto mb-5"
        >
          <div
            onClick={() => {
              formik.setFieldValue("paymentMethod", method.id);
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
              checked={formik.values.paymentMethod === method.id}
              onChange={() => {
                formik.setFieldValue("paymentMethod", method.id);
              }}
            />
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center text-lg font-semibold mb-4">
        <p>Tổng tiền:</p>
        <p className="text-indigo-600">
          {subTotal.toLocaleString("vi-VN")} VND
        </p>
      </div>
    </div>
  );
}
