const express = require('express');
const router = express.Router();
const clientController = require('../controllers/ClientController');
const multer = require('multer');
const upload = multer().single('profileImage');


router.post('/create', upload, clientController.createClient);
router.get('/list', clientController.listAllClients);
router.get('/list/:id', clientController.listClientById);
router.put('/up/:id', clientController.editClient);

module.exports = router;