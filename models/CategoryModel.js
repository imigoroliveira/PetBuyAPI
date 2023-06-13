const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    unique: true,
  },
  nome: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
});

const CategoryModel = mongoose.model('Category', CategorySchema);


module.exports = CategoryModel;