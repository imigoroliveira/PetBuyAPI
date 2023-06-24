const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');


router.post('/create', upload, ProductController.createProduct);
router.get('/list', ProductController.listAllProducts);
router.get('/list/:id', ProductController.listProductById);
router.put('/up/:id', ProductController.editProduct);

module.exports = router;