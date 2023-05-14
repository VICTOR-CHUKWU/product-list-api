const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, "name is required"], trim: true },
  user_id: { type: String, required: [true, "id is required"] },
  price: { type: String, required: [true, "price is required"], trim: true },
  type: { type: String, required: [true, "type is required"], trim: true },
  location: {
    type: String,
    required: [true, "location is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "description is required"],
    trim: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
