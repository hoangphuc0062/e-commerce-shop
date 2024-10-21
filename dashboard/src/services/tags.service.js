import sendRequest from "../utils/resquest";

const TagsService = {
  getAll: () => sendRequest("get", "/tags/"),
};

export default TagsService;
