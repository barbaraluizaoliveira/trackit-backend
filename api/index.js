const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('../src/config/db'); 

const authRoutes = require('../src/routes/authRoutes');
const relationRoutes = require('../src/routes/relationRoutes');
const appRoutes = require('../src/routes/appRoutes');
const authMiddleware = require('../src/middlewares/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/", relationRoutes);
app.use("/", appRoutes);

app.get("/users", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, email, created_at FROM users ORDER BY id ASC");
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar usuarios do banco de dados.",
      error: error.message
    });
  }
});

app.get('/', (req, res) => {
  res.json({ message: "bem vindo a api do TrackIt!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});