const express = require('express');
const router = express.Router();
const multer = require('multer');
const CategoryController = require('../controllers/CategoryController');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/create', upload.single('image'), CategoryController.createCategory);
router.get('/list', CategoryController.listCategory);
router.get('/list/:id', CategoryController.listCategoryByCode);
router.put('/up/:id', CategoryController.editCategory);

module.exports = router;