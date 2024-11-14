import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
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

const emptyCartImage =
  "https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-443f6.appspot.com/o/cart%2Fno-cart-1.png?alt=media&token=dc3dc5e6-ecd8-4b2d-8bc9-e5f6fd887b92";

export default function Cart() {
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
      products: [],
    },
    validationSchema: Yup.object({
      // Bổ sung các field cần thiết nếu muốn kiểm tra
    }),
    onSubmit: async (values) => {
      console.log(values);
    },
  });

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

  const total = products.reduce(
    (acc, product) =>
      selectedProducts.includes(product.id)
        ? acc + product.price * product.quantity
        : acc,
    0
  );

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
      if (result.type === "auth/updateCart/fulfilled") {
        handleToast("success", "Cập nhật giỏ hàng thành công");
        dispatch(getCart());
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
      id: "cod",
      label: "Thanh toán khi nhận hàng",
      imageSrc:
        "https://donghosieucap.vn/wp-content/uploads/2023/05/Hanghieusieucap-3.jpg",
      discountText: "Giảm thêm tới 500.000đ",
    },
    {
      id: "card",
      label: "Thanh toán qua thẻ",
      imageSrc:
        "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQIIlNgicC8kReaUlb4bMvSmTmfdcZClOraJKdpObsgNXAPfTUy",
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
    formik.setFieldValue(
      "products",
      selectedProducts.map((id) => {
        const product = products.find((prod) => prod.id === id);
        return {
          id: product.productId,
          price: product.price,
          quantity: product.quantity,
          attributeId: product.attributeValue?.id,
        };
      })
    );
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
          <Error />
          <button className="w-full py-3 mt-5 bg-indigo-600 text-white font-semibold rounded text-center">
            Tiếp tục mua hàng
          </button>
        </>
      )}
    </div>
  );
}
