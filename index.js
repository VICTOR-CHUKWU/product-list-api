const express = require("express");
const bodyParser = require("body-parser");
const task = require("./routes/product.route");
const connectDb = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/errorhandler");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//route
app.use("/api/v1/products", task);
app.use(notFound);
app.use(errorHandlerMiddleware);

app.get("/", (req, res) => {
  res.send("welcome to openAi product app");
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
