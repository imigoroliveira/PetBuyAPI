const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../controllers/ProductController');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/create', upload.single('image'), productController.createProduct);
router.get('/list', productController.listAllProducts);
router.get('/list/:id', productController.listProductByCode);
router.put('/up/:id', productController.editProduct);

module.exports = router;