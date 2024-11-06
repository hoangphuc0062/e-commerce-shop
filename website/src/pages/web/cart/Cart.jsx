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

import Payment from "./Payment";
import Info from "./info";
import ProgressSteps from "./ProgressSteps";
import CartReview from "./shopping/CartReview";

const emptyCartImage =
  "https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-443f6.appspot.com/o/cart%2Fno-cart-1.png?alt=media&token=dc3dc5e6-ecd8-4b2d-8bc9-e5f6fd887b92";

export default function Cart() {
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
      // email: Yup.string().email("Invalid email").required("Required"),
      // name: Yup.string().required("Required"),
      // phone: Yup.string().required("Required"),
      // address: Yup.string().required("Required"),
      // paymentMethods: Yup.string().required("Required"),
      // shippingFee: Yup.number().required("Required"),
      // discount: Yup.number().required("Required"),
      // total: Yup.number().required("Required"),
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
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
        };
      })
    );
    formik.setFieldValue("shippingFee", shippingFee);
    formik.setFieldValue("discount", 0); // adjust for discount application
    formik.setFieldValue("total", subTotal);
    const province = selectedProvince?.find(
      (province) => String(province.id) === String(provinceID)
    );
    const district = selectedDistrict?.find(
      (district) => String(district.id) === String(districtID)
    );
    const ward = selectedWard?.find(
      (ward) => String(ward.id) === String(wardID)
    );
    formik.setFieldValue("address.province", province?.name);
    formik.setFieldValue("address.district", district?.name);
    formik.setFieldValue("address.ward", ward?.name);
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
      <div className="max-w-5xl mx-auto p-4 bg-white rounded-md shadow-md h-auto">
        {/* Progress Steps */}
        <ProgressSteps
          steps={steps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
        {/* Cart Review Step */}
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
            toggleDropdown={toggleDropdown}
            isDropdownOpen={isDropdownOpen}
            subTotal={subTotal}
            discountCode={discountCode}
            setDiscountCode={setDiscountCode}
            handleApplyCode={handleApplyCode}
            discountOptions={discountOptions}
            emptyCartImage={emptyCartImage}
          />
        )}

        {/* Customer Information Step */}
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
          {/* Payment Step */}
          {currentStep === 2 && (
            <div>
              <div className="mb-4">
                {/* Payment Options Array to avoid repetition */}
                <Payment
                  paymentMethods={paymentMethods}
                  formik={formik}
                  subTotal={subTotal}
                />
              </div>

              <button
                // onClick={handleNextStep}
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
