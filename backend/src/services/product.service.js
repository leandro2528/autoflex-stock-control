const pool = require('../config/database');
const {
  createProduct,
  insertProductMaterials
} = require('../models/product.model');

const createProductWithMaterials = async (data) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const newProduct = await createProduct(client, data);

    if (data.materials && data.materials.length > 0) {
      await insertProductMaterials(client, newProduct.id, data.materials);
    }

    await client.query('COMMIT');

    return newProduct;

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
//Chaama model
const { getAllProductsWithMaterials } = require('../models/product.model');

const getProducts = async () => {
  const client = await pool.connect();
  try {
    const products = await getAllProductsWithMaterials(client);
    return products;
  } finally {
    client.release();
  }
};

module.exports = {
  createProductWithMaterials,
  getProducts
};

