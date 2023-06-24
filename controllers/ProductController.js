const productModel = require('../models/ProductModel');
const auth = require('../auth/auth');
const ProductModel = require('../models/ProductModel');

class ProductController {
  // Endpoint para criar um produto
  async createProduct(req, res) {
    try {
      const product = req.body;
      const profileImageBuffer = req.file.buffer;
  
      const max = await ProductModel.findOne({}).sort({ code: -1 });
      product.code = max == null ? 1 : max.code + 1;
  
      if (await ProductModel.findOne({ name: product.name })) {
        return res.status(400).json({ error: 'Produto já registrado!' });
      }
  
      product.image = profileImageBuffer;
  
      const result = await ProductModel.create(product);
      auth.incluirToken(result);
  
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  // Endpoint para editar um produto usando o ID como parâmetro
  async editProduct(req, res) {
    try {
      const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found :(' });
      }
      res.json(updatedProduct);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Endpoint para listar todos os produtos existentes
  async listAllProducts(req, res) {
    try {
      const products = await productModel.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Endpoint para listar um produto específico por ID
  async listProductById(req, res) {
    try {
      const product = await productModel.findOne({ _id: req.params.id });
      if (!product) {
        return res.status(404).json({ error: 'Product not found :(' });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new ProductController();
