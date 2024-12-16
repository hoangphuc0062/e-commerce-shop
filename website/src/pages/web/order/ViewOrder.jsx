import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { trackingOrder } from "../../../redux/slices/order";
import "ldrs/ring";
import {
  formatCurrency,
  replaceGBInName,
  translate,
} from "../../../utils/helper";
import ReCAPTCHA from "react-google-recaptcha";
import { handleToast } from "../../../ultils/toast";
import BreadcrumbsCustom from "../../../components/Breadcrumbs/Breadcrumbs";
import { useMemo } from "react";

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
    if (trackingData?.cart) {
      const total = trackingData.cart.reduce((acc, product) => {
        const productTotal =
          product?.attributeValue?.price * product?.quantity
            ? product?.attributeValue?.price * product?.quantity
            : product?.price * product?.quantity;
        return acc + productTotal;
      }, 0);

      setSubTotal(total); // Cập nhật subTotal
    }
  }, [trackingData]);
  const defaultAddress = trackingData?.order?.orderBy?.address.find(
    (addr) => addr.isDefault
  );
  console.log(trackingData?.order?.orderBy);
  return (
    <>
      <div className="mt-6">
        <BreadcrumbsCustom />
      </div>
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
                  {trackingData?.cart?.map((product, index) => (
                    <div className="flex items-center border-b" key={index}>
                      {/* Hình ảnh sản phẩm */}
                      <img
                        src={
                          product?.attributeValue?.thumbnail ||
                          product?.thumbnail
                        }
                        alt={product?.name}
                        className="w-24 h-24 object-cover mr-4"
                      />

                      <div>
                        {/* Tên sản phẩm */}
                        <p className="font-semibold">
                          {" "}
                          {product?.key && product?.attributeValue?.name
                            ? replaceGBInName(
                                product?.name,
                                product?.key,
                                product?.attributeValue?.name
                              )
                            : product?.name}
                        </p>

                        {/* Giá sản phẩm */}
                        <p>
                          Giá:{" "}
                          {product?.attributeValue?.price.toLocaleString() ||
                            product?.price.toLocaleString()}
                          VND
                        </p>

                        {/* Số lượng */}
                        <p>
                          Số lượng: {Number(product?.quantity)} {product?.unit}{" "}
                          {/* Ép kiểu số */}
                        </p>

                        {/* Giảm giá */}
                        <p>
                          Giảm:{" "}
                          {Number(product?.discount ? product?.discount : 0)}
                          {"%"}
                          {/* Ép kiểu số */}
                        </p>

                        {/* Thành tiền */}
                        <p className="text-left font-bold">
                          Thành tiền:{" "}
                          {formatCurrency(
                            product?.attributeValue?.price * product?.quantity
                              ? product?.attributeValue?.price *
                                  product?.quantity
                              : product?.price * product?.quantity
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
                {trackingData?.order?.orderBy && (
                  <div>
                    <p>Họ tên: {trackingData?.order?.orderBy?.name}</p>
                    <p>Điện thoại: {trackingData?.order?.orderBy?.phone}</p>
                    <p>Email: {trackingData?.order?.orderBy?.email}</p>
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
                    <p>{translate(trackingData?.order?.paymentMethod)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Trạng thái đơn hàng:</p>
                    <p>{translate(trackingData?.order?.status)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Giảm giá:</p>
                    <p>{trackingData?.coupon ? trackingData.coupon : 0}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Phí giao hàng:</p>
                    <p>{formatCurrency(trackingData?.order?.shippingFee)}</p>
                  </div>

                  <div className="border-t my-2"></div>
                  <div className="flex justify-between font-bold py-2">
                    <p>Tổng thanh toán:</p>
                    <p>{formatCurrency(trackingData?.order?.total)}</p>
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
    </>
  );
};
