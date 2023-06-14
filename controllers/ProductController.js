const multer = require('multer');
const ProductModel = require('../models/ProductModel');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});

const upload = multer({ storage: storage });

class ProductController {
    // Endpoint para criar um produto
    async createProduct(req, res) {
        try {
            const newProduct = await ProductModel.create(req.body);
            res.status(201).json(newProduct);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    
    // Endpoint para editar um produto usando o ID como parâmetro
    async editProduct(req, res) {
        try {
            const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
            const products = await ProductModel.find();
            res.json(products);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    
    // Endpoint para listar um produto específico por ID
    async listProductByCode(req, res) {
        try {
            const product = await ProductModel.findOne({ code: req.params.code });
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