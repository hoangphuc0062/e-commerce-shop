import sendRequest from "../ultils/request";

const TagsService = {
  getAllTags: () => sendRequest("get", "/tags/"),
};

export default TagsService;
