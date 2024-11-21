const Order = require("../models/orderModel");
const Customer = require("../models/customerModel");
const Coupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");
const StatusCodes = require("http-status-codes");
const moment = require("moment");
const sendMail = require("../ultils/sendMail");

const getAllOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("orderBy", "name email");
  return res.status(200).json(orders);
});

const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const userCart = await Customer.findById(userId).select("cart");
  let products = [];
  var total = 0;
  var shippingFee = 0;
  if (userCart) {
    products = userCart.cart.map((el) => ({
      pid: el.pid,
      attributeId: el.attributeId,
      quantity: el.quantity,
      price: el.price,
    }));
    if (products.length > 0) {
      total = req.body.total;
    }
    if (req.body.coupon) {
      const coupon = await Coupon.findOne({ code: req.body.coupon });
      if (coupon) {
        total = total - (total * coupon.discount) / 100;
      }
    }

    if (req.body.shippingFee) {
      shippingFee = req.body.shippingFee;
    }
  }

  let updateAddress = `${req.body.address.province}, ${req.body.address.district}, ${req.body.address.ward}, ${req.body.address.street}`;
  let updateCustomer = {
    address: [updateAddress],
    name: req.body.name,
    phone: req.body.phone,
    sex: req.body.sex,
  };
  const rs = await Customer.findById(userId);
  if (rs) {
    await rs.UpdateCustomer(updateCustomer);
    // res.json(rs);
  } else {
    res.status(404).json({ message: "Customer not found" });
  }

  let order = new Order({
    products,
    orderBy: userId,
    coupon: req.body.coupon,
    total,
    paymentMethod: req.body.paymentMethod,
    shippingFee,
    note: req.body.note,
  });
  order = await order.save();

  if (order) {
    await Customer.findByIdAndUpdate(userId, {
      $push: { purchaseHistory: { pid: order._id, date: Date.now() } },
    });
  }

  return res.status(201).json(order);
});

const updateStatus = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);
  if (order) {
    order.status = req.body.status;
    const updatedOrder = await order.save();
    return res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// thanh toán vnpay

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
const create_payment_url = async (req, res) => {
  // #swagger.tags = ['vnpay']
  // #swagger.summary = 'add'
  process.env.TZ = "Asia/Ho_Chi_Minh";

  let date = new Date();
  let createDate = moment(date).format("YYYYMMDDHHmmss");

  let ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  let tmnCode = process.env.VNP_TMNCODE;
  let secretKey = process.env.VNP_HASHSECRET;
  let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  let returnUrl = process.env.VNP_RETURN_URL;

  let orderId = req.body.orderId;
  let amount = req.body.amount;

  let bankCode = "";

  let locale = "";
  if (locale === null || locale === "") {
    locale = "vn";
  }
  let currCode = "VND";
  let vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = "Thanh toan maGD:" + orderId;
  vnp_Params["vnp_OrderType"] = "Update Pro";
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }
  vnp_Params = sortObject(vnp_Params);
  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
  res.set("Content-Type", "text/html");
  res.send(JSON.stringify(vnpUrl));
};

const vnpay_return = async (req, res) => {
  // #swagger.tags = ['vnpay']
  // #swagger.summary = 'check'
  let { day = 30 } = req.body;
  let vnp_Params = req.query;
  let secureHash = vnp_Params["vnp_SecureHash"];
  let gia = vnp_Params["vnp_Amount"];
  let hash = secureHash;

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  let secretKey = "DENHJRMJZSHXENEAWJVJWBBENOMZAXST";
  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  if (vnp_Params["vnp_ResponseCode"] === "00") {
    let statusPayment = "Paid";
    res.json({ statusPayment });
  } else {
    res.json({ statusPayment: "Not paid" });
  }
};

// send email

const sendSuccessEmail = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch the order details
    const order = await Order.findOne({ orderBy: userId }).populate(
      "orderBy",
      "email"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const orderId = order._id;

    // Update the order status
    await Order.findByIdAndUpdate(orderId, {
      status: "Success",
      statusPayment: "Paid",
    });

    // Send the email
    const email = order.orderBy.email;
    const html = `<h1>Thank you for your order</h1>`;
    const subject = "Order Success";

    // Ensure sendMail is awaited if it's an async function
    await sendMail(email, html, subject);

    // Respond with success
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending success email:", error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

const sendMailOrderConfirmation = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch the order details
    const order = await Order.findOne({ orderBy: userId }).populate(
      "orderBy",
      "email"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const orderId = order._id;

    // Update the order status
    await Order.findByIdAndUpdate(orderId, {
      status: "Success",
      statusPayment: "Paid",
    });

    // Send the email
    const email = order.orderBy.email;
    const html = `<h1>Thank you for your order</h1>`;
    const subject = "Order Success";

    // Ensure sendMail is awaited if it's an async function
    await sendMail(email, html, subject);

    // Respond with success
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending success email:", error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

module.exports = {
  getAllOrder,
  createOrder,
  updateStatus,
  create_payment_url,
  vnpay_return,
  sendSuccessEmail,
};
