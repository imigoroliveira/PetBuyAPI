const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const multer = require('multer');
const upload = multer();



router.post('/create', upload.single('image'), productController.createProduct);
router.get('/list', productController.listAllProducts);
router.get('/list/:id', productController.listProductByCode);
router.put('/up/:id', productController.editProduct);

module.exports = router;