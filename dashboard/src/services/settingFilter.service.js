import sendRequest from "../utils/resquest";

const SettingFilterService = {
  getAll: () => sendRequest("get", "/setting-filters/filter/"),
  getSlugByCategory: (category) =>
    sendRequest("post", "/setting-filters/filter/get-category", category),
  create: (data) => sendRequest("post", "/setting-filters/filter/", data),
  deleteAll: (id) => sendRequest("delete", `/setting-filters/filter/${id}`),
  deleteOne: (id, filterButtonId) =>
    sendRequest("delete", `/setting-filters/filter/${id}/${filterButtonId}`),

  update: (id, filterButtonId, data) =>
    sendRequest(
      "put",
      `/setting-filters/filter/update/${id}/${filterButtonId}`,
      data
    ),

  getById: (id) => sendRequest("get", `/setting-filters/filter/${id}`),

  updateSettingFilter: (id, data) =>
    sendRequest("put", `/setting-filters/filter/${id}`, data),
};

export default SettingFilterService;
