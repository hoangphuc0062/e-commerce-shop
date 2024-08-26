const userRouter = require("./user");
const productRouter = require("./product");
const categoryRouter = require("./catogory");
const couponRouter = require("./coupon");
const orderRouter = require("./order");
const { notFound, errHandler } = require("../middlewares/errHandler");
const initRoutes = (app) => {
  app.use("/api/users", userRouter);
  app.use("/api/products", productRouter);
  app.use("/api/categories", categoryRouter);
  app.use("/api/coupon", couponRouter);
  app.use("/api/orders", orderRouter);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRoutes;
