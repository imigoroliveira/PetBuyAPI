const multer = require('multer');
const productModel = require('../models/productModel');

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
            const newProduct = await productModel.create(req.body);
            res.status(201).json(newProduct);
        } catch (err) {
            res.status(500).json({ error: err.message });
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
    async listProductByCode(req, res) {
        try {
            const product = await productModel.findOne({ code: req.params.code });
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