const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  tags: Array
});

module.exports = Category = mongoose.model("category", CategorySchema);
