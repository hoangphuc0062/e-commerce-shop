const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/dbconnect");
const initRoutes = require("./routes/index");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8888;

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      process.env.DASHBOARD_URL,
      process.env.WEB_URL,
    ].filter(Boolean),
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();

initRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on this port ` + port);
  console.log(process.env.CLIENT_URL, process.env.DASHBOARD_URL);
});
