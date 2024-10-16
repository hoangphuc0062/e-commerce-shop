import sendRequest from "../utils/resquest";

const PostService = {
  createPost: (data) => sendRequest("post", "/posts/create", data),

  updatePost: (id, data) => sendRequest("put", `/posts/${id}`, data),

  deletePost: (id) => sendRequest("delete", `/posts/${id}`),
  deleteMany: (data) => sendRequest("delete", "/posts/", data),

  getAll: () => sendRequest("get", "/posts/"),
  getPostById: (id) => sendRequest("get", `/posts/id/${id}`),
  getPostBySlug: (slug) => sendRequest("get", `/posts/${slug}`),
};

export default PostService;
