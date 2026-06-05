const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Conexão com banco e rotas (ajustado para subir apenas um nível da pasta /api)
require('../src/config/db'); 
const authRoutes = require('../src/routes/authRoutes'); 
const authMiddleware = require('../src/middlewares/auth'); 

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Rota de teste na raiz
app.get("/", (req, res) => {
  res.send("A API ESTÁ ONLINE E FUNCIONANDO!");
});

// Rotas da API
app.use("/api/auth", authRoutes); 

app.get("/users", authMiddleware, (req, res) => {
  res.json({
    message: "Rota protegida funcionando!",
    userId: req.userId,
  });
});


if (process.env.NODE_ENV === 'production') {
  module.exports = app;
} else {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando localmente na porta ${PORT}`);
  });
}