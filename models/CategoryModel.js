const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  codigo: String,
  name: String,
  description: String,
});

module.exports = mongoose.model('categories', categorySchema);