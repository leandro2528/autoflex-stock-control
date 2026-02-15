const pool = require('../config/database');

const getProductionCapacity = async () => {
  const query = `
    SELECT
      p.id AS product_id,
      p.name,
      p.price,
      MIN(FLOOR(rm.stock_quantity / pm.quantity_required)) AS max_quantity
    FROM products p
    JOIN product_materials pm ON pm.product_id = p.id
    JOIN raw_materials rm ON rm.id = pm.raw_material_id
    GROUP BY p.id, p.name, p.price
    HAVING MIN(FLOOR(rm.stock_quantity / pm.quantity_required)) > 0
    ORDER BY p.price DESC;
  `;

  const { rows } = await pool.query(query);
  return rows;
};

module.exports = {
  getProductionCapacity
};
