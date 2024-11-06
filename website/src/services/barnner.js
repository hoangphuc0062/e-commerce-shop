import sendRequest from "../ultils/request";

const BannerServices = {
  getBanners: () => sendRequest("get", "/BannerCollection"),
};

export default BannerServices;
