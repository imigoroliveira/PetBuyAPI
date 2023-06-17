const multer = require('multer');
const categoryModel = require('../models/categoryModel');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});

class CategoryController {
  //Endpoint to create a category
  async createCategory(req, res) {
      try {
          const nCategory = await categoryModel.create(req.body);
          res.status(201).json(nCategory);
      } catch (err) {
          res.status(500).json({ error: err.message });
      }
  }
  //Endpoint to edit category using Id as parameter
  async editCategory(req, res) {
      try{
          const upCategory = await categoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
          if (!upCategory) {
          return res.status(404).json({ error: 'Category not found :(' });
          }
          res.json(upCategory);
      } catch(err){
          res.status(500).json({ error: err.message });
      }
  }

  //Endpoint to list all existing customers
  async listAllCategory(req, res) {
      try {
          const category = await categoryModel.find();
          res.json(category);
      } catch (err) {
          res.status(500).json({ error: err.message });
      }
  }
  
  //Endpoint to list especific customer by Id
  async listCategoryById(req, res) {
      try {
          const category = await categoryModel.findOne({ code: req.params.code });
          if (!category) {
            return res.status(404).json({ error: 'Category not found :(' });
          }
          res.json(category);
      } catch (err) {
          res.status(500).json({ error: err.message });
      }
  }
}
  
module.exports = new CategoryController();