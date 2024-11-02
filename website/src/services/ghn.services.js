import axios from "axios";

const apiUrl = "https://online-gateway.ghn.vn/shiip/public-api";
const apiKey = "7293aab0-b9b0-11ee-b38e-f6f098158c7e";

// Base request instance
const request = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    Token: apiKey,
  },
});

// Helper to send requests and handle errors
const sendRequest = async (method, path, params = {}) => {
  try {
    const response = await request({ method, url: path, params });
    return response.data.data;
  } catch (error) {
    console.error(`Error in request to ${path}:`, error);
    throw error;
  }
};

// API functions
export const getProvinces = () => sendRequest("get", "/master-data/province");

export const getDistricts = (provinceID) =>
  sendRequest("get", "/master-data/district", { province_id: provinceID });

export const getWards = (districtID) =>
  sendRequest("get", "/master-data/ward", { district_id: districtID });

// Fetch available services for a given district
export const fetchService = async (districtId) => {
  const services = await sendRequest(
    "get",
    "/v2/shipping-order/available-services",
    {
      shop_id: 4868495,
      from_district: 1788,
      to_district: districtId,
    }
  );
  return services?.[0]?.service_id || null;
};

// Calculate shipping fee based on parameters
export const fetchFee = async (wardCode, districtId, serviceId) => {
  const feeData = await sendRequest("get", "/v2/shipping-order/fee", {
    from_district_id: 1788,
    to_district_id: districtId,
    to_ward_code: wardCode,
    service_id: serviceId,
    height: 50,
    length: 20,
    weight: 200,
    width: 20,
    insurance_value: 0,
  });
  return feeData?.total || null;
};
