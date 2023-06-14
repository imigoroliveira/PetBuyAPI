const express = require('express');
const router = express.Router();
const multer = require('multer');
const ProductController = require('../controllers/ProductController');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/create', upload.single('image'), ProductController.createProduct);
router.get('/list', ProductController.listAllProducts);
router.get('/list/:id', ProductController.listProductByCode);
router.put('/up/:id', ProductController.editProduct);

module.exports = router;