const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Testar a conexão ao iniciar
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('erro ao conectar ao NeonDB:', err.stack);
  } else {
    console.log('conectado ao NeonDB/portgreSQL com sucesso às:', res.rows[0].now);
  }
});

module.exports = pool;