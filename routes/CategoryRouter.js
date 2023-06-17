const express = require('express');
const router = express.Router();
const multer = require('multer');
const categoryController = require('../controllers/CategoryController');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get('/list', categoryController.listAllCategory);
router.get('/list/:id', categoryController.listCategoryById);
router.post('/create', categoryController.createCategory);
router.put('/up/:id', categoryController.editCategory);

module.exports = router;