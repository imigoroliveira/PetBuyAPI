const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');
const auth = require('../auth/auth');

router.use(auth.autorizar);
router.post('/create', orderController.createOrder);
router.put('/order/:codigo/status', orderController.editarStatusOrder);
router.get('/order/cliente/:clienteId', orderController.retornarOrderPorCliente);
router.get('/order', orderController.retornarListaOrders);
router.post('/sendEmail', orderController.sendEmail);

module.exports = router;