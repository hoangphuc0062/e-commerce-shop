import sendRequest from "../ultils/request";

const PostSevice = {
  getPost: () => sendRequest("get", "/blogs/"),
  getBySlug: (slug) =>sendRequest("get",`/blogs/${slug}`)

}

export default PostSevice;