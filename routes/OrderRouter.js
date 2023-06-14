import { Router } from 'express';
const router = Router();
import { efetuarOrder, editarStatusOrder, retornarOrderPorCliente, retornarListaOrders } from '../controllers/OrderController';

router.post('/Order', efetuarOrder);
router.put('/Order/:codigo/status', editarStatusOrder);
router.get('/Order/cliente/:clienteId', retornarOrderPorCliente);
router.get('/Order', retornarListaOrders);

export default router;