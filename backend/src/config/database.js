// config/database.js
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD, // certifique-se que .env tem DB_PASSWORD
  port: process.env.DB_PORT,
});

// Teste rápido da conexão (opcional)
pool.connect()
  .then(client => {
    console.log("Conectado ao banco de dados com sucesso!");
    client.release();
  })
  .catch(err => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });

module.exports = pool;
