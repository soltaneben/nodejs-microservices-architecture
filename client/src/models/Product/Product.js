const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  price: Number,
  category_id: String,
  created_at: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Product = mongoose.model("product", ProductSchema);
