const CategoryModel = require('../models/CategoryModel');

class CategoryController {
  // Endpoint para cadastrar uma Category
  async cadastrarCategory(req, res) {
    try {
      const novaCategory = await CategoryModel.create(req.body);
      res.status(201).json(novaCategory);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Endpoint para editar uma Category usando o código como parâmetro
  async editarCategory(req, res) {
    try {
      const { codigo } = req.params;
      const CategoryAtualizada = await CategoryModel.findOneAndUpdate(
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
  async listarCategorys(req, res) {
    try {
      const Categorys = await CategoryModel.find();
      res.json(Categorys);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Endpoint para retornar uma Category pelo código
  async buscarCategoryPorCodigo(req, res) {
    try {
      const { codigo } = req.params;
      const Category = await CategoryModel.findOne({ codigo });
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