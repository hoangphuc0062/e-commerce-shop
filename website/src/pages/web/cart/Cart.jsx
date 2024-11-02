import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Error from "../../../components/status/Error";
import {
  fetchFee,
  fetchService,
  getDistricts,
  getProvinces,
  getWards,
} from "../../../services/ghn.services";

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
  console.log(shippingFee);

  const product = {
    name: "PC GVN x ASUS Advanced Ai (Intel Core Ultra 9 285K/ VGA RTX 4090)",
    originalPrice: 140930000,
    discountedPrice: 140000000,
    quantity: 1,
    imageUrl: "https://via.placeholder.com/80", // Replace with actual image URL
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
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div className="flex items-center">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded mr-4"
                />
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-indigo-600 font-semibold">
                    {product.discountedPrice.toLocaleString("vi-VN")}₫
                  </p>
                  <p className="text-gray-500 line-through">
                    {product.originalPrice.toLocaleString("vi-VN")}₫
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <button className="text-gray-500 text-sm mr-4">Xóa</button>
                <div className="flex items-center border px-2 py-1 rounded-md">
                  <button className="px-2">-</button>
                  <p className="px-2">{product.quantity}</p>
                  <button className="px-2">+</button>
                </div>
              </div>
            </div>

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
                          <p className="font-semibold">
                            {discount.description}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {discount.minOrder}
                          </p>
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
              )}
            </div>

            <div className="flex justify-between items-center text-lg font-semibold mb-4">
              <p>Tổng tiền:</p>
              <p className="text-indigo-600">
                {product.discountedPrice.toLocaleString("vi-VN")}₫
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
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">
                Thông tin khách mua hàng
              </h2>
              <div className="flex items-center mb-2">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="title"
                    value="Anh"
                    checked
                    onChange={() => {}}
                  />
                  <span className="ml-1">Anh</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="title"
                    value="Chị"
                    onChange={() => {}}
                  />
                  <span className="ml-1">Chị</span>
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nhập họ tên"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Nhập số điện thoại"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Nhập gmail"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <select
                className="w-full px-3 py-2 border rounded-md"
                onChange={(e) => setProvinceID(e.target.value)}
              >
                <option>Chọn Tỉnh, Thành phố</option>
                {selectedProvince?.map((province) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
              </select>
              <select
                className="w-full px-3 py-2 border rounded-md"
                onChange={(e) => setDistrictID(e.target.value)}
              >
                <option>Chọn Quận, Huyện</option>
                {selectedDistrict?.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
              <select
                className="w-full px-3 py-2 border rounded-md"
                onChange={(e) => setWardID(e.target.value)}
              >
                <option>Chọn Phường, Xã</option>
                {selectedWard?.map((ward) => (
                  <option key={ward.id} value={ward.id}>
                    {ward.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Số nhà, tên đường"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="flex items-center mb-4">
              <input type="checkbox" />
              <span className="ml-2">Xuất hóa đơn cho đơn hàng</span>
            </div>

            <div className="flex justify-between items-center text-lg font-semibold mb-4">
              <p>Tổng tiền:</p>
              <p className="text-indigo-600">
                {product.discountedPrice.toLocaleString("vi-VN")}₫
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
                      <span className="text-red-600 font-bold">
                        {method.label}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {method.discountText}
                    </span>
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

            <div className="flex justify-between items-center text-lg font-semibold mb-4">
              <p>Tổng tiền:</p>
              <p className="text-indigo-600">
                {product.discountedPrice.toLocaleString("vi-VN")}₫
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
