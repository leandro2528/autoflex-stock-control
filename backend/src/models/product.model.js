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

module.exports = {
  createProduct,
  insertProductMaterials,
};
