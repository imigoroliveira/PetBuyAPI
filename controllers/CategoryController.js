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
  // Endpoint para cadastrar uma Category
  async createCategory(req, res) {
    try {
      const novaCategory = await categoryModel.create(req.body);
      res.status(201).json(novaCategory);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Endpoint para editar uma Category usando o código como parâmetro
  async editCategory(req, res) {
    try {
      const { codigo } = req.params;
      const CategoryAtualizada = await categoryModel.findOneAndUpdate(
        { codigo },
        req.body,
        { new: true }
      );
      if (!CategoryAtualizada) {
        return res.status(404).json({ error: 'Category Not Found :(' });
      }
      res.json(CategoryAtualizada);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Endpoint para retornar a lista completa de Categorys
  async listCategory(req, res) {
    try {
      const Categorys = await categoryModel.find();
      res.json(Categorys);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Endpoint para retornar uma Category pelo código
  async listCategoryByCode(req, res) {
    try {
      const { codigo } = req.params;
      const Category = await categoryModel.findOne({ codigo });
      if (!Category) {
        return res.status(404).json({ error: 'Category Not Found :(' });
      }
      res.json(Category);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new CategoryController();