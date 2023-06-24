const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    unique: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Produto',
    },
    quantity: {
      type: Number,
      required: true,
    },
  }],
  client: {
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
  creditCardName: {
    type: String,
    required: true,
    unique: true,
  },
  creditCardNumber: {
    type: String,
    required: true,
    unique: true,
  },
  creditCardCvc: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
    unique: true,
  },
});

const OrderModel = mongoose.model('orders', OrderSchema);

module.exports = OrderModel;