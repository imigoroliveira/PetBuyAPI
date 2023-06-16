const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');

router.post('/Order', orderController.efetuarOrder);
router.put('/Order/:codigo/status', orderController.editarStatusOrder);
router.get('/Order/cliente/:clienteId', orderController.retornarOrderPorCliente);
router.get('/Order', orderController.retornarListaOrders);

module.exports = router;