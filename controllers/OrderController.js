const OrderModel = require('../models/OrderModel');
const nodemailer = require('nodemailer');


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

  async sendEmail(email, subject, message) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'petbuy016@gmail.com',
          pass: 'PetBuy@2023!', 
        },
      });
  
      const mailOptions = {
        from: 'petbuy016@gmail.com', // Insira o seu endereço de e-mail do Gmail
        to: email,
        subject: subject,
        text: message,
      };
  
      await transporter.sendMail(mailOptions);
      console.log('E-mail enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar o e-mail:', error);
    }

  }
}

module.exports = new OrderController();