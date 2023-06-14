const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  codigo: String,
  nome: String,
  descricao: String,
});

module.exports = mongoose.model('categorySchema', categorySchema);