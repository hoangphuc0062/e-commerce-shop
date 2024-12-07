import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { trackingOrder } from "../../../redux/slices/order";
import "ldrs/ring";
import { formatCurrency, translate } from "../../../utils/helper";
import ReCAPTCHA from "react-google-recaptcha";
import { handleToast } from "../../../ultils/toast";

export const ViewOrder = () => {
  const dispatch = useDispatch();
  const [orderId, setOrderId] = useState();
  const [subTotal, setSubTotal] = useState(0);
  const [captchaValue, setCaptchaValue] = useState(null);
  const captchaRef = useRef(null);

  const { statusTracking, trackingData } = useSelector((state) => state.order);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!captchaValue) {
      handleToast("error", "Vui lòng xác nhận bạn không phải là robot.");
      return;
    }
    dispatch(trackingOrder(orderId));

    if (captchaRef.current) {
      captchaRef.current.reset();
      setCaptchaValue(null); // Đặt lại trạng thái CAPTCHA
    }
  };

  useEffect(() => {
    if (trackingData?.products) {
      const total = trackingData.products.reduce((acc, product) => {
        const productTotal =
          Number(product?.pid?.price) *
          Number(product?.quantity) *
          (product?.pid?.discount
            ? 1 - Number(product?.pid?.discount) / 100
            : 1);
        return acc + productTotal;
      }, 0);

      setSubTotal(total); // Cập nhật subTotal
    }
  }, [trackingData]);
  const defaultAddress = trackingData?.orderBy?.address.find(
    (addr) => addr.isDefault
  );

  return (
    <div
      className="flex flex-col justify-center items-center min-h-[400px] gap-2"
      onSubmit={handleSubmit}
    >
      <h1 className="text-[32px]">Tra cứu đơn hàng</h1>
      <div className="w-full p-2">
        <form className="relative flex w-full gap-2">
          <div className="w-full">
            <input
              type="search"
              id="default-search"
              className="block w-full  p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập mã đơn hàng ?"
              onChange={(e) => setOrderId(e.target.value)}
            />
            <ReCAPTCHA
              ref={captchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={(value) => setCaptchaValue(value)}
              className="mt-4"
            />
            <button
              className="bg-main text-white p-2 rounded mt-2"
              type="submit"
            >
              Tra cứu đơn hàng
            </button>
          </div>
        </form>
      </div>
      {statusTracking === "loading" && (
        <l-ring
          size="40"
          stroke="5"
          bg-opacity="0"
          speed="2"
          color="black"
        ></l-ring>
      )}
      {statusTracking === "success" && (
        <div className="flex flex-col md:flex-row items-start text-left gap-3 w-full p-2 ">
          <div className="flex w-full md:w-2/3">
            <div className="bg-white w-full p-4 rounded-md shadow-md">
              <h2 className="text-lg font-bold border-b pb-2 mb-4">
                DANH SÁCH SẢN PHẨM
              </h2>

              <div>
                {trackingData?.products?.map((product, index) => (
                  <div className="flex items-center border-b" key={index}>
                    {/* Hình ảnh sản phẩm */}
                    <img
                      src={product?.pid?.thumbnail}
                      alt={product?.pid?.name}
                      className="w-24 h-24 object-cover mr-4"
                    />

                    <div>
                      {/* Tên sản phẩm */}
                      <p className="font-semibold">{product?.pid?.name}</p>

                      {/* Giá sản phẩm */}
                      <p>
                        Giá:{" "}
                        {formatCurrency(
                          Number(product?.pid?.price) // Ép kiểu số
                        )}
                      </p>

                      {/* Số lượng */}
                      <p>
                        Số lượng: {Number(product?.quantity)}{" "}
                        {product?.pid?.unit} {/* Ép kiểu số */}
                      </p>

                      {/* Giảm giá */}
                      <p>
                        Giảm:{" "}
                        {Number(
                          product?.pid?.discount ? product?.pid?.discount : 0
                        )}
                        {"%"}
                        {/* Ép kiểu số */}
                      </p>

                      {/* Thành tiền */}
                      <p className="text-left font-bold">
                        Thành tiền:{" "}
                        {formatCurrency(
                          Number(product?.pid?.price) *
                            Number(product?.quantity) *
                            Number(
                              product?.pid?.discount
                                ? 1 - product?.pid?.discount / 100
                                : 1
                            ) // Ép kiểu số
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/3 gap-1 shadow-lg rounded-lg">
            <div className="bg-white w-full px-4 ">
              <h2 className="text-lg font-bold border-b pb-2 mb-4">
                THÔNG TIN GIAO NHẬN
              </h2>
              {trackingData?.orderBy && (
                <div>
                  <p>Họ tên: {trackingData?.orderBy?.name}</p>
                  <p>Điện thoại: {trackingData?.orderBy.phone}</p>
                  <p>Email: {trackingData?.orderBy.email}</p>
                  <p>
                    Địa chỉ:
                    {defaultAddress
                      ? `${defaultAddress?.street}, ${defaultAddress?.wards}, ${defaultAddress?.districts}, ${defaultAddress?.provinces}`
                      : "No default address found"}
                  </p>
                </div>
              )}
            </div>
            {trackingData && (
              <div className="bg-white px-4">
                <h2 className="text-lg font-bold border-b pb-2 mb-4">
                  THANH TOÁN
                </h2>
                <div className="flex justify-between">
                  <p>Trị giá đơn hàng:</p>
                  <p>{formatCurrency(subTotal)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Phương thức thanh toán:</p>
                  <p>{translate(trackingData?.paymentMethod)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Trạng thái đơn hàng:</p>
                  <p>{translate(trackingData?.status)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Giảm giá:</p>
                  <p>{trackingData?.coupon ? trackingData.coupon : 0}</p>
                </div>
                <div className="flex justify-between">
                  <p>Phí giao hàng:</p>
                  <p>{formatCurrency(trackingData?.shippingFee)}</p>
                </div>

                <div className="border-t my-2"></div>
                <div className="flex justify-between font-bold py-2">
                  <p>Tổng thanh toán:</p>
                  <p>{formatCurrency(trackingData?.total)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {statusTracking === "failed" && (
        <div className="text-red-500">Đơn hàng không tồn tại</div>
      )}
    </div>
  );
};
