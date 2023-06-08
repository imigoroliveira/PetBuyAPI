const express = require('express');
const router = express.Router();
const multer = require('multer');
const CostumerController = require('../controllers/CostumerController');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/create', upload.single('image'), CostumerController.createCostumer);
router.get('/list', CostumerController.listAllCostumers);
router.get('/list/:id', CostumerController.listCostumerById);
router.put('/up/:id', CostumerController.editCostumer);

module.exports = router;