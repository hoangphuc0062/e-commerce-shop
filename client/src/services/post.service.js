import sendRequest from "../ultils/request";

const PostSevice = {
  getPost: () => sendRequest("get", "/blogs/"),
  getBySlug: (slug) => sendRequest("get", `/blogs/${slug}`),
  ratings: ({ bid, star, comment }) => {
    return sendRequest("put", `/blogs/ratings`, {
      bid,
      star,
      comment,
    });
  },
};

export default PostSevice;
