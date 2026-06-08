const pool = require('../config/db');

const userModel = {
  findByEmail: async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0]; 
  },

  create: async (name, email, hashedPassword) => {
    const query = `
      INSERT INTO users (name, email, password) 
      VALUES ($1, $2, $3) 
      RETURNING id, name, email, created_at
    `;
    const result = await pool.query(query, [name, email, hashedPassword]);
    return result.rows[0]; 
  },

  findById: async (id) => {
    const query = 'SELECT id, name, email, created_at FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
};

module.exports = userModel;