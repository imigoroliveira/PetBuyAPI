const multer = require('multer');
const costumerModel = require('../models/costumerModel');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});


const upload = multer({ storage: storage });

class CostumerController {
    //Endpoint to create a costumer
    async createCostumer(req, res) {
        try {
            const nCostumer = await costumerModel.create(req.body);
            res.status(201).json(nCostumer);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    //Endpoint to edit costumer using Id as parameter
    async editCostumer(req, res) {
        try{
            const upCostumer = await costumerModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!upCostumer) {
            return res.status(404).json({ error: 'Costumer not found :(' });
            }
            res.json(upCostumer);
        } catch(err){
            res.status(500).json({ error: err.message });
        }
    }

    //Endpoint to list all existing customers
    async listAllCostumers(req, res) {
        try {
            const costumers = await costumerModel.find();
            res.json(costumers);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    
    //Endpoint to list especific customer by Id
    async listCostumerById(req, res) {
        try {
            const costumer = await costumerModel.findOne({ code: req.params.code });
            if (!costumer) {
              return res.status(404).json({ error: 'Costumer not found :(' });
            }
            res.json(costumer);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
    
module.exports = new CostumerController();