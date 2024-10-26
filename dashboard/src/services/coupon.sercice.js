import sendRequest from "../utils/resquest";

const CouponService = {
  getAll: () => sendRequest("get", "/coupon/"),
  // updateCoupon: (id, data) => sendRequest("put", `/coupons/${id}`, data),
  // deleteCoupon: (id) => sendRequest("delete", `/coupons/${id}`),
  createCoupon: (data) => sendRequest("post", "/coupon/", data),
};

export default CouponService;
