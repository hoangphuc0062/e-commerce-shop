import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

import Error from "../../../components/status/Error";
import {
  fetchFee,
  fetchService,
  getDistricts,
  getProvinces,
  getWards,
} from "../../../services/ghn.services";

import Payment from "./Payment";
import Info from "./Info";
import ProgressSteps from "./ProgressSteps";
import CartReview from "./shopping/CartReview";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCart,
  getCart,
  resetState,
  updateCart,
} from "../../../redux/slices/auth";
import { handleToast } from "../../../ultils/toast";
import {
  createOrder,
  sendMail,
  vnPay,
  vnPAYReturn,
} from "../../../redux/slices/order";
import { useLocation } from "react-router-dom";
import Success from "../../../components/status/Success";

const emptyCartImage =
  "https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-443f6.appspot.com/o/cart%2Fno-cart-1.png?alt=media&token=dc3dc5e6-ecd8-4b2d-8bc9-e5f6fd887b92";

export default function Cart() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [selectedWard, setSelectedWard] = useState([]);
  const [provinceID, setProvinceID] = useState(null);
  const [districtID, setDistrictID] = useState(null);
  const [ServiceId, setServiceId] = useState(null);
  const [wardID, setWardID] = useState(null);
  const [shippingFee, setShippingFee] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [statusPayment, setStatusPayment] = useState();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      sex: "",
      address: {
        province: "",
        district: "",
        ward: "",
        street: "",
      },
      note: "",
      paymentMethod: "",
      status: "",
      shippingFee: "",
      discount: "",
      total: "",
    },
    validationSchema: Yup.object({
      // Bổ sung các field cần thiết nếu muốn kiểm tra
    }),
    onSubmit: async (values) => {
      dispatch(createOrder(values)).then((result) => {
        if (result.type === "order/createOrder/fulfilled") {
          if (values.paymentMethod === "vnpay") {
            const data = {
              orderId: result.payload._id,
              amount: values.total,
            };
            dispatch(vnPay(data)).then((result) => {
              if (result.type === "order/vnPay/fulfilled") {
                window.open(result.payload);
                setCurrentStep((prev) => prev + 1);
              }
            });
          } else if (values.paymentMethod === "cash") {
            setCurrentStep((prev) => prev + 1);
            setStatusPayment(true);
          }
        } else {
          handleToast("error", "Đặt hàng thất bại");
        }
      });
    },
  });

  const vnp_Amount = params.get("vnp_Amount");
  const vnp_BankCode = params.get("vnp_BankCode");
  const vnp_BankTranNo = params.get("vnp_BankTranNo");
  const vnp_CardType = params.get("vnp_CardType");
  const vnp_OrderInfo = params.get("vnp_OrderInfo");
  const vnp_PayDate = params.get("vnp_PayDate");
  const vnp_ResponseCode = params.get("vnp_ResponseCode");
  const vnp_TmnCode = params.get("vnp_TmnCode");
  const vnp_TransactionNo = params.get("vnp_TransactionNo");
  const vnp_TransactionStatus = params.get("vnp_TransactionStatus");
  const vnp_TxnRef = params.get("vnp_TxnRef");
  const vnp_SecureHash = params.get("vnp_SecureHash");

  useEffect(() => {
    if (
      vnp_Amount &&
      vnp_BankCode &&
      vnp_BankTranNo &&
      vnp_CardType &&
      vnp_OrderInfo &&
      vnp_PayDate &&
      vnp_ResponseCode &&
      vnp_TmnCode &&
      vnp_TransactionNo &&
      vnp_TransactionStatus &&
      vnp_TxnRef &&
      vnp_SecureHash
    ) {
      dispatch(
        vnPAYReturn({
          vnp_Amount,
          vnp_BankCode,
          vnp_BankTranNo,
          vnp_CardType,
          vnp_OrderInfo,
          vnp_PayDate,
          vnp_ResponseCode,
          vnp_TmnCode,
          vnp_TransactionNo,
          vnp_TransactionStatus,
          vnp_TxnRef,
          vnp_SecureHash,
        })
      ).then((result) => {
        if (result.type === "order/vnPAYReturn/fulfilled") {
          if (result.payload.statusPayment === "Paid") {
            setCurrentStep(3);
            setStatusPayment(true);
            dispatch(sendMail());
          } else {
            setCurrentStep(3);
            setStatusPayment(false);
          }
        } else {
          setCurrentStep(3);
          setStatusPayment(false);
        }
      });
    }
  }, [
    dispatch,
    vnp_Amount,
    vnp_BankCode,
    vnp_BankTranNo,
    vnp_CardType,
    vnp_OrderInfo,
    vnp_PayDate,
    vnp_ResponseCode,
    vnp_TmnCode,
    vnp_TransactionNo,
    vnp_TransactionStatus,
    vnp_TxnRef,
    vnp_SecureHash,
  ]);

  const statusGetCart = useSelector((state) => state.auth.statusGetCart);
  const datacart = useSelector((state) => state.auth.dataCart);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProvinces().then((provinces) => {
      if (provinces) {
        setSelectedProvince(
          provinces.map((item) => ({
            id: item.ProvinceID,
            name: item.ProvinceName,
          }))
        );
      }
    });
  }, []);

  useEffect(() => {
    if (provinceID) {
      getDistricts(provinceID).then((districts) => {
        if (districts) {
          setSelectedDistrict(
            districts.map((item) => ({
              id: item.DistrictID,
              name: item.DistrictName,
            }))
          );
        }
      });
    }
  }, [provinceID]);

  useEffect(() => {
    if (districtID) {
      getWards(districtID).then((wards) => {
        if (wards) {
          setSelectedWard(
            wards.map((item) => ({
              id: item.WardCode,
              name: item.WardName,
            }))
          );
        }
      });
    }
  }, [districtID]);

  useEffect(() => {
    if (districtID) {
      fetchService(districtID).then((serviceId) => {
        if (serviceId) {
          setServiceId(serviceId);
        }
      });
    }
  }, [districtID]);

  useEffect(() => {
    if (wardID && districtID && ServiceId) {
      fetchFee(wardID, districtID, ServiceId).then((fee) => {
        if (fee) {
          setShippingFee(fee);
        }
      });
    }
  }, [wardID, districtID, ServiceId]);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    if (statusGetCart === "success" && datacart) {
      setProducts(datacart);
    }
    dispatch(resetState({ key: "statusGetCart", value: "idle" }));
  }, [statusGetCart, datacart, dispatch]);

  const [selectAll, setSelectAll] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleQuantityChange = (productId, attributeId, newQuantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === productId &&
        product.attributeValue?.id === attributeId
          ? { ...product, quantity: newQuantity }
          : product
      )
    );
  };

  const total = products.reduce((acc, product) => {
    const uniqueId = `${product.productId}-${
      product.attributeValue?.id || "null"
    }`;
    return selectedProducts.includes(uniqueId)
      ? acc + product.price * product.quantity
      : acc;
  }, 0);

  const subTotal = total + shippingFee;

  const handleRemoveProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const handleSelectAll = () => {
    if (!selectAll) {
      setSelectedProducts(
        products.map(
          (product) =>
            `${product.productId}-${product.attributeValue?.id || "null"}`
        )
      );
    } else {
      setSelectedProducts([]);
    }
    setSelectAll(!selectAll);
  };

  const handleCheck = (productId, attributeId) => {
    const uniqueId = `${productId}-${attributeId || "null"}`;
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(uniqueId)
        ? prevSelected.filter((id) => id !== uniqueId)
        : [...prevSelected, uniqueId]
    );
    setSelectAll(true);
  };

  const handleRemoveSelected = () => {
    const updatedProducts = products
      .map((product) => {
        const uniqueId = `${product.productId}-${
          product.attributeValue?.id || "null"
        }`;
        if (selectedProducts.includes(uniqueId)) {
          return {
            productId: product.productId,
            attributeId: product.attributeValue?.id || null,
            quantity: product.quantity,
          };
        }
        return null;
      })
      .filter((item) => item !== null);

    dispatch(deleteCart(updatedProducts)).then((result) => {
      if (result.type === "auth/deleteCart/fulfilled") {
        handleToast("success", "Xoá sản phẩm thành công");
        dispatch(getCart());
      }
    });

    // Reset selected products and "select all" checkbox
    setSelectedProducts([]);
    setSelectAll(false);
  };

  const handleUpdateSelected = () => {
    const updatedProducts = products
      .map((product) => {
        const uniqueId = `${product.productId}-${
          product.attributeValue?.id || "null"
        }`;
        if (selectedProducts.includes(uniqueId)) {
          return {
            productId: product.productId,
            attributeId: product.attributeValue?.id || null,
            quantity: product.quantity,
          };
        }
        return null;
      })
      .filter((item) => item !== null);

    dispatch(updateCart(updatedProducts)).then((result) => {
      console.log(result);
      if (result.type === "auth/updateCart/fulfilled") {
        handleToast("success", "Cập nhật giỏ hàng thành công");
        dispatch(getCart());
      } else if (result.type === "auth/updateCart/rejected") {
        const mes = result.payload.message;
        if (mes === "Insufficient stock for product") {
          handleToast(
            "error",
            "Số lượng sản phẩm trong giỏ hàng vượt quá số lượng tồn kho"
          );
        }
      }
    });

    // Reset selected products and "select all" checkbox
    setSelectedProducts([]);
    setSelectAll(false);
  };

  const discountOptions = [
    {
      id: 1,
      description: "Giảm 100.000đ",
      minOrder: "Đơn hàng từ 3000K",
      code: "DAILY100",
      expiry: "Thứ 7, 23:59 30 11, 2024",
      amount: 100000,
    },
    {
      id: 2,
      description: "Giảm 50.000đ",
      minOrder: "Đơn hàng từ 1000K",
      code: "DAILY50",
      expiry: "Thứ 7, 23:59 30 11, 2024",
      amount: 50000,
    },
  ];

  const paymentMethods = [
    {
      id: "cash",
      label: "Thanh toán khi nhận hàng",
      imageSrc:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-443f6.appspot.com/o/logo%20payment%2Fcash.jpg?alt=media&token=5ba3b882-72ef-4cc8-9ca9-75770d0d4c59",
      discountText: "Giảm thêm tới 500.000đ",
    },
    {
      id: "vnpay",
      label: "Thanh toán qua VNPay",
      imageSrc:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-443f6.appspot.com/o/logo%20payment%2Fvnpay.webp?alt=media&token=2ac62e2b-bd88-431f-917a-570122a4ca7a",
      discountText: "Giảm thêm tới 500.000đ",
    },
  ];

  const steps = [
    { label: "Giỏ hàng", icon: "solar:cart-check-outline" },
    {
      label: "Thông tin đặt hàng",
      icon: "mdi:badge-account-horizontal-outline",
    },
    { label: "Thanh toán", icon: "ion:card-outline" },
    { label: "Hoàn tất", icon: "mdi:success-circle-outline" },
  ];

  const handleApplyCode = () => {
    console.log("Applied discount code:", discountCode);
  };

  const handleNextStep = () => {
    if (currentStep === 0 && selectedProducts.length === 0) {
      alert("Please select at least one product to proceed.");
      return;
    }

    if (currentStep === 1) {
      formik.validateForm().then((errors) => {
        if (Object.keys(errors).length === 0) {
          updateFormValues();
          setCurrentStep((prev) => prev + 1);
        } else {
          alert("Please fill in all required information.");
        }
      });
      return;
    }

    updateFormValues();
    setCurrentStep((prev) => prev + 1);
  };

  const updateFormValues = () => {
    formik.setFieldValue("shippingFee", shippingFee);
    formik.setFieldValue("discount", 0);
    formik.setFieldValue("total", subTotal);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white rounded-md shadow-md h-auto">
      <ProgressSteps
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      {currentStep === 0 && (
        <CartReview
          products={products}
          setProducts={setProducts}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          handleNextStep={handleNextStep}
          handleQuantityChange={handleQuantityChange}
          handleRemoveProduct={handleRemoveProduct}
          handleSelectAll={handleSelectAll}
          selectAll={selectAll}
          handleUpdateSelected={handleUpdateSelected}
          handleRemoveSelected={handleRemoveSelected}
          handleCheck={handleCheck}
          subTotal={subTotal}
          discountCode={discountCode}
          setDiscountCode={setDiscountCode}
          handleApplyCode={handleApplyCode}
          discountOptions={discountOptions}
          emptyCartImage={emptyCartImage}
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={() => setIsDropdownOpen(!isDropdownOpen)}
        />
      )}
      <form onSubmit={formik.handleSubmit}>
        {currentStep === 1 && (
          <>
            <Info
              selectedProvince={selectedProvince}
              selectedDistrict={selectedDistrict}
              selectedWard={selectedWard}
              setProvinceID={setProvinceID}
              setDistrictID={setDistrictID}
              setWardID={setWardID}
              formik={formik}
              shippingFee={shippingFee}
              subTotal={subTotal}
            />
            <button
              onClick={handleNextStep}
              className={`w-full py-3 font-semibold rounded text-center ${
                formik.isValid
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              ĐẶT HÀNG NGAY
            </button>
          </>
        )}
        {currentStep === 2 && (
          <div>
            <Payment
              paymentMethods={paymentMethods}
              formik={formik}
              subTotal={subTotal}
            />
            <button
              type="submit"
              className={`w-full py-3 font-semibold rounded text-center ${
                formik.isValid
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              ĐẶT HÀNG NGAY
            </button>
          </div>
        )}
      </form>
      {currentStep === 3 && (
        <>
          {statusPayment ? <Success /> : <Error />}
          <button className="w-full py-3 mt-5 bg-indigo-600 text-white font-semibold rounded text-center">
            Tiếp tục mua hàng
          </button>
        </>
      )}
    </div>
  );
}
