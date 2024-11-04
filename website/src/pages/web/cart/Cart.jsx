import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { faker } from "@faker-js/faker";

import Error from "../../../components/status/Error";
import {
  fetchFee,
  fetchService,
  getDistricts,
  getProvinces,
  getWards,
} from "../../../services/ghn.services";

import CartItem from "./CartItem";
import Payment from "./Payment";
import Info from "./info";
import Discount from "./discount";

export default function Cart() {
  const [selectedMethod, setSelectedMethod] = useState(null);
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

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      sex: "",
      address: [],
      note: "",
      paymentMethods: "",
      status: "",
      shippingFee: "",
      discount: "",
      total: "",
      products: [],
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      name: Yup.string().required("Required"),
      phone: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      note: Yup.string(),
      paymentMethods: Yup.string().required("Required"),
      status: Yup.string().required("Required"),
      shippingFee: Yup.number().required("Required"),
      discount: Yup.number().required("Required"),
      total: Yup.number().required("Required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  useEffect(() => {
    // Fetch provinces
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
      // Fetch districts based on selected province
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
      // Fetch wards based on selected district
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
  // console.log(shippingFee);
  function createRandomProduct() {
    return {
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      image: faker.image.avatar(),
      price: faker.commerce.price(),
      discountPercent: faker.number.int({ min: 0, max: 50 }),
      description: faker.commerce.productDescription(),
      rating: faker.number.int({ min: 1, max: 5 }),
      review: faker.number.int({ min: 0, max: 1000 }),
      category: faker.commerce.department(),
      brand: faker.commerce.department(),
      discount: faker.number.int({ min: 0, max: 50 }),
      slug: faker.lorem.slug(),
      images: [faker.image.url(300, 300, "tech", true)],
      quantity: faker.number.int({ min: 1, max: 10 }),
    };
  }
  const [products, setProducts] = useState(
    Array.from({ length: 6 }, createRandomProduct)
  );
  const [selectAll, setSelectAll] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const handleQuantityChange = (productId, newQuantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
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
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedProducts(products.map((product) => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleCheck = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };
  const handleRemoveSelected = () => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => !selectedProducts.includes(product.id))
    );
    setSelectedProducts([]);
  };
  const handleUpdateSelected = () => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        selectedProducts.includes(product.id)
          ? { ...product, quantity: 1 }
          : product
      )
    );
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

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleApplyCode = () => {
    console.log("Applied discount code:", discountCode);
    // Add logic for applying discount code
  };
  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const steps = [
    { label: "Giỏ hàng", icon: "solar:cart-check-outline" },
    {
      label: "Thông tin đặt hàng",
      icon: "mdi:badge-account-horizontal-outline",
    },
    { label: "Thanh toán", icon: "ion:card-outline" },
    { label: "Hoàn tất", icon: "mdi:success-circle-outline" },
  ];
  return (
    <>
      <div className="max-w-5xl mx-auto p-4 bg-white rounded-md shadow-md">
        {/* Progress Steps */}
        <div className="pb-5">
          <ol className="flex items-center w-full text-sm font-medium text-center bg-indigo-100 pt-3 pb-1 text-gray-500 dark:text-gray-400 sm:text-base">
            {steps.map((step, index) => (
              <li
                key={index}
                className="relative flex items-center w-full justify-center cursor-pointer"
                onClick={() => setCurrentStep(index)}
              >
                {/* Left line for all except the first step */}
                {index !== 0 && (
                  <span
                    className={`absolute left-0 top-[22px] transform -translate-y-1/2 w-[50%] h-[1px] border-t ${
                      index <= currentStep
                        ? "border-solid border-indigo-600"
                        : "border-dotted border-gray-400"
                    }`}
                  ></span>
                )}

                <div className="relative z-10 flex flex-col items-center">
                  {/* Icon with conditional background for active step */}
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full ${
                      index === currentStep || index < currentStep
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-400 border border-gray-400"
                    }`}
                  >
                    <Icon icon={step.icon} width={30} />
                  </div>
                  <span
                    className={`h-8 hidden sm:block ${
                      index === currentStep || index < currentStep
                        ? "text-indigo-600 font-semibold"
                        : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Right line for all except the last step */}
                {index < steps.length - 1 && (
                  <span
                    className={`absolute right-0 top-[22px] transform -translate-y-1/2 w-[50%] h-[1px] border-t ${
                      index < currentStep
                        ? "border-solid border-indigo-600"
                        : "border-dotted border-gray-400"
                    }`}
                  ></span>
                )}
              </li>
            ))}
          </ol>
        </div>
        {/* Cart Review Step */}
        {currentStep === 0 && (
          <div>
            <div className="flex items-center mb-4 justify-between">
              <div>
                {" "}
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="mr-2"
                />
                <span>Chọn tất cả</span>
              </div>
              {selectedProducts.length > 0 && (
                <>
                  <div>
                    <button
                      className="ml-4 px-4 py-2 bg-indigo-500 text-white rounded"
                      onClick={handleUpdateSelected}
                    >
                      Cập nhật
                    </button>
                    <button
                      className="ml-4 px-4 py-2 bg-red-500 text-white rounded"
                      onClick={handleRemoveSelected}
                    >
                      Xóa tất cả
                    </button>
                  </div>
                </>
              )}
            </div>
            {products.map((product) => (
              <CartItem
                key={product.id}
                product={product}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveProduct}
                isChecked={selectedProducts.includes(product.id)}
                onCheck={handleCheck}
              />
            ))}

            <div className=" p-4 ">
              {/* Discount Button */}
              <button
                onClick={toggleDropdown}
                className="flex items-center px-4 py-2  text-blue-600  hover:bg-indigo-100 rounded-md"
              >
                <Icon
                  icon="mdi:tag-outline"
                  className="text-blue-600 mr-2"
                  width={20}
                />
                Sử dụng mã giảm giá
                <Icon
                  icon={isDropdownOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
                  className="text-blue-600 ml-2"
                  width={20}
                />
              </button>

              {/* Dropdown content */}
              {isDropdownOpen && (
                <div className="mt-4 border rounded-md p-4 bg-indigo-50">
                  {/* Discount Code Input */}
                  <div className="flex items-center mb-4">
                    <input
                      type="text"
                      placeholder="Nhập mã giảm giá/Phiếu mua hàng"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={handleApplyCode}
                      className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                      Áp dụng
                    </button>
                  </div>
                  {/* Discount Options */}
                  <Discount
                    discountOptions={discountOptions}
                    setDiscountCode={setDiscountCode}
                  />
                </div>
              )}
            </div>

            <div className="flex justify-between items-center text-lg font-semibold mb-4">
              <p>Tổng tiền:</p>
              <p className="text-indigo-600">
                {subTotal.toLocaleString("vi-VN")} VND
              </p>
            </div>

            <button
              onClick={handleNextStep}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded text-center"
            >
              ĐẶT HÀNG NGAY
            </button>
          </div>
        )}

        {/* Customer Information Step */}
        {currentStep === 1 && (
          <div>
            <Info
              selectedProvince={selectedProvince}
              selectedDistrict={selectedDistrict}
              selectedWard={selectedWard}
              setProvinceID={setProvinceID}
              setDistrictID={setDistrictID}
              setWardID={setWardID}
              formik={formik}
            />

            <div className="flex justify-between items-center text-lg  mb-4">
              <p>Tiền ship</p>
              <p className="text-indigo-600">
                {shippingFee.toLocaleString("vi-VN")} VND
              </p>
            </div>
            <div className="flex justify-between items-center text-lg font-semibold mb-4">
              <p>Tổng tiền:</p>
              <p className="text-indigo-600">
                {subTotal.toLocaleString("vi-VN")} VND
              </p>
            </div>

            <button
              onClick={handleNextStep}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded text-center"
            >
              ĐẶT HÀNG NGAY
            </button>
          </div>
        )}
        {/* Payment Step */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">
              Phương thức thanh toán
            </h2>
            <div className="mb-4">
              {/* Payment Options Array to avoid repetition */}
              <Payment
                paymentMethods={paymentMethods}
                selectedMethod={selectedMethod}
                setSelectedMethod={setSelectedMethod}
              />
            </div>

            <div className="flex justify-between items-center text-lg font-semibold mb-4">
              <p>Tổng tiền:</p>
              <p className="text-indigo-600">
                {subTotal.toLocaleString("vi-VN")} VND
              </p>
            </div>

            <button
              onClick={handleNextStep}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded text-center"
            >
              ĐẶT HÀNG NGAY
            </button>
          </div>
        )}

        {/* Confirmation Step */}
        {currentStep === 3 && (
          <>
            {/* <Success /> */}
            <Error />
            <button className="w-full py-3 mt-5 bg-indigo-600 text-white font-semibold rounded text-center">
              Tiếp tục mua hàng
            </button>
          </>
        )}
      </div>
    </>
  );
}
