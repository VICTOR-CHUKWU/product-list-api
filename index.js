const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const product = require("./routes/product.route");
const user = require("./routes/user.routes");
const connectDb = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/errorhandler");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//route
app.use("/api/v1/products", product);
app.use("/api/v1/products/user", user);
app.use(notFound);
app.use(errorHandlerMiddleware);

app.get("/", (req, res) => {
  res.send("welcome to openFabric product app");
});

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(` app is listening to port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
