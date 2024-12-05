const asyncHandler = require("express-async-handler");
const StatusCodes = require("http-status-codes");
const moment = require("moment");
const juice = require("juice");
const fs = require("fs");
require("dotenv").config();
const clipboardy = require("clipboardy");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const Customer = require("../models/customerModel");
const Coupon = require("../models/couponModel");
const sendMail = require("../ultils/sendMail");

const generateSKU = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const generateUniqueSKU = async () => {
  let sku;
  let isUnique = false;

  while (!isUnique) {
    sku = generateSKU(10); // Adjust the length as needed
    const existingOrder = await Order.findOne({ SKU: sku });
    if (!existingOrder) {
      isUnique = true;
    }
  }

  return sku;
};

const getAllOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("orderBy", "name email")
    .sort({ date: -1 });
  return res.status(200).json(orders);
});

const getOrderByUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const orders = await Order.find({
    orderBy: userId,
  }).populate("products.pid");
  return res.status(200).json(orders);
});

const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const {
    address,
    name,
    phone,
    sex,
    coupon,
    shippingFee,
    note,
    paymentMethod,
  } = req.body;
  // thông tin giỏ hàng
  const userCart = await Customer.findById(userId).select("cart");
  if (!userCart || !userCart.cart || userCart.cart.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const products = userCart.cart.map((el) => ({
    pid: el.pid,
    attributeId: el.attributeId,
    quantity: el.quantity,
    price: el.price,
  }));

  let total = req.body.total || 0;
  if (req.body.coupon) {
    const couponExist = await Coupon.findOne({ code: coupon });
    if (couponExist) {
      total -= (total * coupon.discount) / 100;
    }
  }

  const fee = shippingFee || 0;
  total += fee;

  if (
    !address ||
    !address.district ||
    !address.ward ||
    !address.street ||
    !address.province
  ) {
    return res.status(400).json({ message: "Address is required" });
  }

  const formattedAddress = [
    address.street,
    address.ward,
    address.district,
    address.province,
  ]
    .filter(Boolean)
    .join(", ");

  // Cập nhật thông tin khách hàng
  const customer = await Customer.findById(userId);
  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  await customer.UpdateCustomer({
    address: [formattedAddress],
    name,
    phone,
    sex,
  });

  const sku = await generateUniqueSKU();

  // Tạo đơn hàng mới
  let order = new Order({
    products,
    orderBy: userId,
    coupon: coupon,
    total,
    paymentMethod,
    shippingFee,
    note,
    SKU: sku,
  });

  order = await order.save();

  // Cập nhật lịch sử mua hàng
  await Customer.findByIdAndUpdate(userId, {
    $push: { purchaseHistory: { pid: order._id, date: Date.now() } },
  });

  return res.status(201).json(order);
});

const updateOrder = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  if (!_id || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }

  const rs = await Order.findByIdAndUpdate(_id, req.body, { new: true });

  return res.status(200).json({
    mes: rs ? "Update Order successfully" : "Update Order Failed",
    rs,
  });
});

const deleteOrder = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  if (!_id) return res.status(404).json({ mes: "Missing _id" });

  const existOrder = await Order.findOne({ _id });

  if (!existOrder) return res.status(404).json({ mes: "Order not found" });

  const rs = await Order.findByIdAndDelete(_id);

  return res.status(200).json({
    mes: rs ? "Delete Order Successful" : "Delete Order Failed",
  });
});
// nhan vien ban hang tao don hang cho khach hang

// thanh toán tiền mặt

const createInStoreOrder = asyncHandler(async (req, res) => {
  const {
    customerId,
    total,
    shippingFee,
    name,
    email,
    phone,
    sex,
    products,
    coupon,
  } = req.body;
  let customer;

  if (customerId) {
    customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
  } else {
    // Create a new customer if customerId is not provided
    if (!name || !email || !phone) {
      return res
        .status(400)
        .json({ message: "Customer information is required" });
    }

    customer = new Customer({
      name,
      email,
      phone,
      sex,
    });
    await customer.save();
  }

  let orderTotal = total || 0;
  if (coupon) {
    const couponDoc = await Coupon.findOne({ code: coupon });
    if (couponDoc) {
      orderTotal -= (orderTotal * couponDoc.discount) / 100;
    }
  }
  orderTotal += shippingFee || 0;

  if (!products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "Product information is required" });
  }

  const orderProducts = products.map((product) => ({
    pid: product.productsId,
    attributeId: product.attributeId,
    quantity: product.quantity,
    price: product.price,
  }));

  const order = new Order({
    products: orderProducts,
    orderBy: customer._id,
    total: orderTotal,
    paymentMethod: "Cash",
    shippingFee: shippingFee || 0,
  });

  await order.save();
  return res.status(201).json(order);
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
    const userId = req.user?._id;
    if (!userId) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const order = await Order.findOne({ orderBy: userId })
      .populate({
        path: "orderBy",
        select: "email name phone address",
      })
      .lean();

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const { _id: orderId, SKU, date, paymentMethod, orderBy } = order;

    // Update order status
    await Order.findByIdAndUpdate(orderId, {
      status: "Success",
      statusPayment: "Paid",
    });
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      if (product.attributeId && product.attributeId !== null) {
        await Product.updateOne(
          { _id: product.pid, "variants.attributeId": product.attributeId },
          { $inc: { "variants.$.onStock": -product.quantity } }
        );
      } else {
        await Product.updateOne(
          { _id: product.pid },
          { $inc: { onStock: -product.quantity } }
        );
      }
    }
    await Customer.findByIdAndUpdate(orderBy._id, {
      $set: { cart: [] }, // Clear the cart
      $push: { purchaseHistory: { pid: order._id, date: Date.now() } },
    });
    const email = orderBy.email;
    const html = generateEmailTemplate({
      SKU,
      date,
      paymentMethod,
      orderBy,
      baseUrl: `${process.env.WEB_URL}`,
    });

    const inlinedHtml = juice(html);
    await sendMail(email, inlinedHtml, "Đặt hàng thành công");

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending success email:", error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

const generateEmailTemplate = ({
  SKU,
  date,
  paymentMethod,
  orderBy,
  baseUrl,
}) => {
  clipboardy.write(`${SKU}`);
  return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
</head>

<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
    <section
        style="background-color: #ffffff; padding: 16px; margin: 20px auto; max-width: 600px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center;">
        <div style="padding: 16px;">
            <h2 style="font-size: 24px; color: #333333; margin-bottom: 8px;">Cảm ơn bạn đã đặt hàng!</h2>
            <img src="https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-443f6.appspot.com/o/status%2Fsuccess.gif?alt=media&token=4b3eb1f3-abea-43a2-96a6-0e0c71b6d4b5" alt="Xác nhận đơn hàng thành công">
            <div style="color: #555555; margin-bottom: 16px;">
                <div style="style="text-align: center;">
                <p style="font-size:" >Mã đơn hàng:</p>
                <p style="border:none; color: #007bff; font-weight: 700; background: #ffffff; font-size: 16px;text-align: center;">
                    ${SKU}
                </p>
               </div>
                Đơn hàng của bạn sẽ được xử lý ít phút. Chúng tôi sẽ thông báo cho bạn qua email khi đơn hàng của bạn đã được chuyển đi.
                </div>
            </p>
            <div
                style="background-color: #f8f9fa; border: 1px solid #e1e1e1; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
                <dl style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <dt style="color: #888888;">Ngày</dt>
                    <dd style="color: #333333; font-weight: bold;">${new Date(
                      date
                    ).toLocaleDateString("vi-VN")}</dd>
                </dl>
                <dl style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <dt style="color: #888888;">Phương thức thanh toán</dt>
                    <dd style="color: #333333; font-weight: bold;">${
                      paymentMethod === "cash"
                        ? "Thanh toán khi nhận hàng"
                        : "Thanh toán online"
                    }</dd>
                </dl>
                <dl style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <dt style="color: #888888;">Tên</dt>
                    <dd style="color: #333333; font-weight: bold;">${
                      orderBy.name
                    }</dd>
                </dl>
                <dl style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <dt style="color: #888888;">Địa chỉ</dt>
                    <dd style="color: #333333; font-weight: bold;">${
                      Array.isArray(orderBy.address)
                        ? orderBy.address.join(", ")
                        : orderBy.address
                    }</dd>
                </dl>
                <dl style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <dt style="color: #888888;">Điện thoại</dt>
                    <dd style="color: #333333; font-weight: bold;">${
                      orderBy.phone
                    }</dd>
                </dl>
            </div>
            <div style="text-align: center; margin-top: 16px;">
                <a href="${baseUrl}/look-up-order"
                    style="background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold; display: inline-block; margin-right: 8px;">Theo
                    dõi đơn hàng của bạn</a>
                <a href="${baseUrl}/"
                    style="background-color: #f8f9fa; color: #555555; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold; display: inline-block; border: 1px solid #e1e1e1;">Quay
                    lại mua sắm</a>
            </div>
        </div>
    </section>
</body>

</html>
  `;
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

// get order by sku

const getOrderBySKU = async (req, res) => {
  const { sku } = req.params;
  if (!sku) {
    return res.status(400).json({ message: "SKU is required" });
  }
  const order = await Order.findOne({ SKU: sku })
    .populate(
      "products.pid",
      "-SKU -slug -historicalPrice -priceInMarket -category -brand -inStock -onStock -inComing -minInventory -maxInventory"
    )
    .populate("orderBy", "name email phone address");

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  return res.status(200).json(order);
};

module.exports = {
  getAllOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  create_payment_url,
  vnpay_return,
  sendSuccessEmail,
  getOrderByUser,
  createInStoreOrder,
  getOrderBySKU,
};
