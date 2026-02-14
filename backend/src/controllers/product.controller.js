// src/controllers/product.controller.js

const productService = require('../services/product.service');

const createProduct = async (req, res) => {
  try {
    const data = req.body;

    // Validação mínima
    if (!data || !data.name || !data.price) {
      return res.status(400).json({
        error: "Missing required fields: name and price"
      });
    }

    // Se houver materiais, garantir que seja array
    if (data.materials && !Array.isArray(data.materials)) {
      return res.status(400).json({
        error: "Materials must be an array"
      });
    }

    const product = await productService.createProductWithMaterials(data);

    res.status(201).json({
      message: "Product created successfully",
      product
    });
  } catch (error) {
    console.error('ERROR DETAIL:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProduct
};
