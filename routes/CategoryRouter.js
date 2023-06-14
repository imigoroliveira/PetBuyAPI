const express = require('express');
const router = express.Router();
const multer = require('multer');
const categoryController = require('../controllers/categoryController');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/create', upload.single('image'), categoryController.createCategory);
router.get('/list', categoryController.listCategory);
router.get('/list/:id', categoryController.listCategoryByCode);
router.put('/up/:id', categoryController.editCategory);

module.exports = router;