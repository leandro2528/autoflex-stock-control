const express = require("express");
const cors = require("cors");
const pool = require("./config/database");

const productRoutes = require("./routes/product.routes");
const rawMaterialRoutes = require('./routes/rawMaterial.routes');

const app = express(); 

app.use(cors());
app.use(express.json());
app.use('/raw_materials', rawMaterialRoutes);

app.use("/products", productRoutes);


app.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        current_database() AS database,
        current_schema() AS schema
    `);

    res.json({
      message: "AutoFlex Stock Control API running",
      db_info: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
