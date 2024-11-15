import sendRequest from "../ultils/request";

const PostSevice = {
  getPost: () => sendRequest("get", "/blogs/"),
  getBySlug: (slug) => sendRequest("get", `/blogs/${slug}`),
  ratings: ({ postId, star, comment }) =>
    sendRequest("put", `/blogs/ratings`, { postId, star, comment }),
};

export default PostSevice;
