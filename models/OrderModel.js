const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    unique: true,
  },
  precoTotal: {
    type: Number,
    required: true,
  },
  produtos: [{
    produto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Produto',
    },
    quantidade: {
      type: Number,
      required: true,
    },
  }],
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true,
  },
  dateOrder: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Aguardando Pagamento', 'Faturado', 'Enviado', 'Cancelado'],
    default: 'Aguardando Pagamento',
  },
});

const OrderModel = mongoose.model('order', OrderSchema);

module.exports = OrderModel;