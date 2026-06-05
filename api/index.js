const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Ajuste: subindo dois níveis para chegar em 'src'
require('../../config/db'); 
const authRoutes = require('../../routes/authRoutes'); 
const authMiddleware = require('../../middlewares/auth'); 

const app = express();

app.get("/", (req, res) => {
  res.send("A API ESTÁ ONLINE E FUNCIONANDO!");
});

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Ajustado: A rota agora responde em /api/auth/...
app.use("/api/auth", authRoutes); 

app.get("/users", authMiddleware, (req, res) => {
  res.json({
    message: "Rota protegida funcionando!",
    userId: req.userId,
  });
});

const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Ajuste: Caminhos corrigidos para a estrutura /api/index.js -> /src/...
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

// Rota principal de autenticação
app.use("/api/auth", authRoutes); 

// Rota de teste
app.get("/users", authMiddleware, (req, res) => {
  res.json({
    message: "Rota protegida funcionando!",
    userId: req.userId,
  });
});

// Lógica de exportação para Vercel vs Local
if (process.env.NODE_ENV === 'production') {
  module.exports = app;
} else {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando localmente na porta ${PORT}`);
  });
}