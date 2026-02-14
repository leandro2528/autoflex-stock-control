const express = require("express");

const cors = require("cors");

const pool = require("./config/database");

const productRoutes = require("./routes/product.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);

app.get("/", async (req, res) => {
   try {
    const result = await pool.query("SELECT NOW()");
        res.json({
            message: "AutoFlex Stock Control API running",
            database_time: result.rows[0],
   });
   } catch (error){
    console.error(error); 
    res.status(500).json({ error: "Database connnection failed" });
   }
});

module.exports = app;

