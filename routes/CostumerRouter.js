const express = require('express');
const router = express.Router();
const multer = require('multer');
const costumerController = require('../controllers/costumerController');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/create', upload.single('image'), costumerController.createCostumer);
router.get('/list', costumerController.listAllCostumers);
router.get('/list/:id', costumerController.listCostumerById);
router.put('/up/:id', costumerController.editCostumer);

module.exports = router;