import sendRequest from "../utils/resquest";

const SettingFilterService = {
  getAll: () => sendRequest("get", "/setting-filters/filter/"),
};

export default SettingFilterService;
