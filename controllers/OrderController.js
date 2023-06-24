const OrderModel = require('../models/OrderModel');

class OrderController {
  async createOrder(req, res) {
    try {
      const orderData = req.body;
      const newOrder = await OrderModel.create(orderData);
      res.status(201).json(newOrder);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async editarStatusOrder(req, res) {
    try {
      const { codigo } = req.params;
      const { status } = req.body;
      const OrderAtualizado = await OrderModel.findOneAndUpdate(
        { codigo },
        { status },
        { new: true }
      );
      if (!OrderAtualizado) {
        return res.status(404).json({ error: 'Pedido não encontrado :(' });
      }
      res.json(OrderAtualizado);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async retornarOrderPorCliente(req, res) {
    try {
      const { clienteId } = req.params;
      const Orders = await OrderModel.find({ cliente: clienteId });
      res.json(Orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async retornarListaOrders(req, res) {
    try {
      const Orders = await OrderModel.find();
      res.json(Orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async sendEmail(req, res) {
    try {
      const { email, subject, message } = req.body;

      await sendEmail(email, subject, message);

      res.json({ message: 'E-mail enviado com sucesso!' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }


}

module.exports = new OrderController();