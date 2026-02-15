const productService = require('../services/product.service');

const createProduct = async (req, res) => {
  try {
    const data = req.body;

    // Validação 
    if (!data || !data.name || !data.price) {
      return res.status(400).json({
        error: "Missing required fields: name and price"
      });
    }

    // Se materiais = array
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

//Add geProduct
const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (error) {
    console.error('ERROR DETAIL:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts
};

