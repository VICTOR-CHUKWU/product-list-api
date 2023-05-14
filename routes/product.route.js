const express = require("express");
const router = express.Router();
const {
  getProduct,
  getProducts,
  editProduct,
  deleteProduct,
  createProduct,
} = require("../controller/productController");
const authMidleware = require("../middleware/auth");

router.get("/", getProducts);

router.post("/", authMidleware, createProduct);

router.patch("/:id", editProduct);

router.delete("/:id", deleteProduct);

router.get("/:id", getProduct);

module.exports = router;
