import sendRequest from "../ultils/request";

const webConfigService = {
  get: () => sendRequest("get", "/webConfig"),
};

export default webConfigService;
