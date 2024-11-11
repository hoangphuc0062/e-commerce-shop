import sendRequest from "../ultils/request";

const CartServices = {
  getCart: () => sendRequest("get", "/customers/get-cart"),

  deleteAllCart: (data) =>
    sendRequest("delete", "/customers/delete-all-cart", { data }),

  addCart: (data) => sendRequest("post", "/customers/add-cart", data),

  updateCart: (data) => sendRequest("put", "/customers/update-cart", data),
};

export default CartServices;
