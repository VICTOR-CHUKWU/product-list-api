const Product = require("../models/product.model");
const asyncWrapper = require("../middleware/async");
const { createCustomeError } = require("../errors/customeError");

const getProducts = asyncWrapper(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products: products });
});
const getProduct = asyncWrapper(async (req, res, next) => {
  // const task = await Task.findById(req.params.id).exec();
  const product = await Product.findOne({ _id: req.params.id }).exec();
  if (!product) {
    return next(
      createCustomeError(`can not get product with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ product: product });
});

const createProduct = asyncWrapper(async (req, res, next) => {
  const { name } = req.body;
  const product = await Product.create(req.body);
  if (!name) {
    return next(
      createCustomeError("can not create product without name field", 400)
    );
  }
  res.status(201).json({ product: product });
});

const deleteProduct = asyncWrapper(async (req, res, next) => {
  const product = await Product.findByIdAndRemove(req.params.id);
  if (!product) {
    return next(
      createCustomeError(`can not delete product with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    product: null,
    status: "success",
    message: "product deleted succesfully",
  });
});

const editProduct = asyncWrapper(async (req, res, next) => {
  const { id: productId } = req.params;
  const product = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return next(
      createCustomeError(`can not update product with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ product });
});

module.exports = {
  getProduct: getProduct,
  getProducts: getProducts,
  editProduct: editProduct,
  deleteProduct: deleteProduct,
  createProduct: createProduct,
};
