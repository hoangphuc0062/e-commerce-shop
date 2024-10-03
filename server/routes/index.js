const userRouter = require("./userRoute");
const productRouter = require("./productRoute");
const categoryRouter = require("./catogoryRoute");
const couponRouter = require("./couponRoute");
const orderRouter = require("./orderRoute");
const customerRouter = require("./customerRoute");
const brandRouter = require("./brandRoute");
const staffRouter = require("./staffRoute");
const seryRouter = require("./seriesRoute");
const webConfigRouter = require("./webConfigRoute");
const tagRouter = require("./tagRoute");
const storeRouter = require("./storeRoute");
const wareHouseRouter = require("./wareHouseRoute");
const bannerCollectionRouter = require("./bannerCollectionRoute");
const shippingUnitRouter = require("./shippingUnitRoute");
const globalSeoRouter = require("./globalSeoRoute");
const { notFound, errHandler } = require("../middlewares/errHandler");
const initRoutes = (app) => {
  app.use("/api/users", userRouter);
  app.use("/api/products", productRouter);
  app.use("/api/categories", categoryRouter);
  app.use("/api/coupon", couponRouter);
  app.use("/api/orders", orderRouter);

  app.use("/api/brands", brandRouter);
  app.use("/api/customers", customerRouter);
  app.use("/api/staffs", staffRouter);
  app.use("/api/series", seryRouter);

  app.use("/api/webConfig", webConfigRouter);
  app.use("/api/tags", tagRouter);
  app.use("/api/stores", storeRouter);
  app.use("/api/wareHouses", wareHouseRouter);
  app.use("/api/bannerCollection", bannerCollectionRouter);
  app.use("/api/shippingUnits", shippingUnitRouter);
  app.use("/api/globalSeo", globalSeoRouter);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRoutes;
