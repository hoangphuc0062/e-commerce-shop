import sendRequest from "../ultils/request";

const settingFilterService = {
  get: (params) => sendRequest("get", "/setting-filters/filter", { params }),
};

export default settingFilterService;
