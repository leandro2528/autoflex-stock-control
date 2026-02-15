// src/models/rawMaterial.model.js

const createRawMaterial = async (client, data) => {
  const { name, stock_quantity } = data;

  if (!name || stock_quantity === undefined) {
    throw new Error('Missing required fields: name or stock_quantity');
  }

  const query = `
    INSERT INTO raw_materials (name, stock_quantity)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const result = await client.query(query, [name, stock_quantity]);
  return result.rows[0];
};

const getAllRawMaterials = async (client) => {
  const result = await client.query(`
    SELECT id, name, stock_quantity, created_at
    FROM raw_materials
    ORDER BY id
  `);
  return result.rows;
};

const updateRawMaterial = async (client, id, data) => {
  const { name, stock_quantity } = data;

  const query = `
    UPDATE raw_materials
    SET name = COALESCE($1, name),
        stock_quantity = COALESCE($2, stock_quantity)
    WHERE id = $3
    RETURNING *;
  `;

  const result = await client.query(query, [name, stock_quantity, id]);
  return result.rows[0];
};

const deleteRawMaterial = async (client, id) => {
  await client.query(`DELETE FROM raw_materials WHERE id = $1`, [id]);
  return { message: 'Deleted successfully' };
};

module.exports = {
  createRawMaterial,
  getAllRawMaterials,
  updateRawMaterial,
  deleteRawMaterial
};
