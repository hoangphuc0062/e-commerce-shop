import sendRequest from "../utils/resquest";

const SettingFilterService = {
  getAll: () => sendRequest("get", "/setting-filters/filter/"),
  getSlugByCategory: (category) =>
    sendRequest("post", "/setting-filters/filter/get-category", category),
  create: (data) => sendRequest("post", "/setting-filters/filter/", data),
  deleteAll: (id) => sendRequest("delete", `/setting-filters/filter/${id}`),
  deleteOne: (id, filterButtonId) =>
    sendRequest("delete", `/setting-filters/filter/${id}/${filterButtonId}`),
};

export default SettingFilterService;
