const createProduct = async (client, data) => {
  const { name, price } = data;

  if (!name || !price) {
    throw new Error("Missing required fields: name and price");
  }

  const query = `
    INSERT INTO public.products (name, price)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const result = await client.query(query, [name, price]);
  return result.rows[0];
};

const insertProductMaterials = async (client, productId, materials) => {
  for (const material of materials) {
    const query = `
      INSERT INTO public.product_materials
        (product_id, raw_material_id, quantity_required)
      VALUES ($1, $2, $3);
    `;

    await client.query(query, [
      productId,
      material.raw_material_id,
      material.quantity_required,
    ]);
  }
};

//BUSCANDO PRODUTO COM MATÈRIAIS-PRIMAS
const getAllProductsWithMaterials = async (client) => {
  const query = `
    SELECT 
      p.id AS product_id,
      p.name AS product_name,
      p.price AS product_price,
      pm.quantity_required,
      rm.id AS raw_material_id,
      rm.name AS raw_material_name,
      rm.stock_quantity
    FROM products p
    LEFT JOIN product_materials pm ON pm.product_id = p.id
    LEFT JOIN raw_materials rm ON rm.id = pm.raw_material_id
    ORDER BY p.id;
  `;

  const result = await client.query(query);

  // Resultado obj com array de matérias-primas
  const productsMap = {};

  result.rows.forEach(row => {
    if (!productsMap[row.product_id]) {
      productsMap[row.product_id] = {
        id: row.product_id,
        name: row.product_name,
        price: row.product_price,
        materials: []
      };
    }

    if (row.raw_material_id) {
      productsMap[row.product_id].materials.push({
        id: row.raw_material_id,
        name: row.raw_material_name,
        stock_quantity: row.stock_quantity,
        quantity_required: row.quantity_required
      });
    }
  });

  return Object.values(productsMap);
};

// RF004 - produtos produzidos
const getProducibleProducts = async (client) => {
  const query = `
    SELECT
      p.id AS product_id,
      p.name,
      p.price,
      MIN(rm.stock_quantity / pm.quantity_required) AS max_quantity
    FROM products p
    JOIN product_materials pm ON pm.product_id = p.id
    JOIN raw_materials rm ON rm.id = pm.raw_material_id
    GROUP BY p.id, p.name, p.price
    HAVING MIN(rm.stock_quantity / pm.quantity_required) > 0
    ORDER BY p.price DESC;
  `;

  const result = await client.query(query);
  return result.rows;
};

module.exports = {
  createProduct,
  insertProductMaterials,
  getAllProductsWithMaterials,
  getProducibleProducts
};
