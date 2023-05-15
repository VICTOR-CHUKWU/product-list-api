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

router.patch("/:id", authMidleware, editProduct);

router.delete("/:id", authMidleware, deleteProduct);

router.get("/:id", getProduct);

module.exports = router;
