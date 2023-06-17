const express = require('express');
const router = express.Router();
const multer = require('multer');
const costumerController = require('../controllers/CostumerController');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });
/**
 * @swagger
 * /api/Teste:
 *   get:
 *     summary: Descrição breve da rota
 *     description: Descrição mais detalhada da rota
 *     responses:
 *       200:
 *         description: Resposta bem-sucedida
 */
router.post('/create', upload.single('image'), costumerController.createCostumer);
router.get('/list', costumerController.listAllCostumers);
router.get('/list/:code', costumerController.listCostumerById);
router.put('/up/:id', costumerController.editCostumer);

module.exports = router;