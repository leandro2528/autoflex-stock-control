const express = require("express");
const cors = require("cors");
const pool = require("./config/database");

const productRoutes = require("./routes/product.routes");

const app = express(); // ✅ ESSA LINHA É O PROBLEMA RESOLVIDO

app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);

// rota raiz (diagnóstico simples e seguro)
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
