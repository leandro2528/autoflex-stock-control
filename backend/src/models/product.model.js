const pool = require('../config/database');

const createProduct = async (client, { name, price }) => {
  const query = `
    INSERT INTO products (name, price)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [name, price];

  const result = await client.query(query, values);
  return result.rows[0];
};

const insertProductMaterials = async (client, productId, materials) => {
  for (const material of materials) {
    const query = `
      INSERT INTO product_materials (product_id, raw_material_id, quantity_required)
      VALUES ($1, $2, $3);
    `;
    const values = [
      productId,
      material.raw_material_id,
      material.quantity_required
    ];

    await client.query(query, values);
  }
};

module.exports = {
  createProduct,
  insertProductMaterials
};
