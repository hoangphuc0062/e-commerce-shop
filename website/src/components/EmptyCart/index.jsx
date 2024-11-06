import { Link } from "react-router-dom";

export default function EmptyCart({
  emptyCartImage,
  to,
  classNameString,
  title,
  content,
  button,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center text-gray-500">
      <img
        src={
          emptyCartImage
            ? emptyCartImage
            : "https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-443f6.appspot.com/o/cart%2Fno-cart-1.png?alt=media&token=dc3dc5e6-ecd8-4b2d-8bc9-e5f6fd887b92"
        }
        alt="Empty Cart"
        className={
          classNameString ? classNameString : "w-30 h-30 mb-5 object-cover"
        }
      />

      <p className="text-main text-lg font-semibold">
        {title ? title : "Giỏ hàng của bạn trống"}
      </p>
      <p className="text-gray-500 text-sm font-light">
        {content
          ? content
          : "Hãy chắc chắn rằng bạn đã thêm sản phẩm vào giỏ hàng"}
      </p>
      <Link
        to={to}
        className="w-full bg-indigo-600 text-white p-2 rounded-lg text-center mt-2"
      >
        {button ? button : "Tiếp tục mua sắm"}
      </Link>
    </div>
  );
}
