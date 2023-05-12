const express = require("express");
const router = express.Router();
const {
  getProduct,
  getProducts,
  editProduct,
  deleteProduct,
  createProduct,
} = require("../controller/productController");

router.get("/", getProducts);

router.post("/", createProduct);

router.patch("/:id", editProduct);

router.delete("/:id", deleteProduct);

router.get("/:id", getProduct);

module.exports = router;
