const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');
const auth = require('../auth/auth');

router.use(auth.autorizar);
router.post('/order', orderController.efetuarOrder);
router.put('/order/:codigo/status', orderController.editarStatusOrder);
router.get('/order/cliente/:clienteId', orderController.retornarOrderPorCliente);
router.get('/order', orderController.retornarListaOrders);

module.exports = router;