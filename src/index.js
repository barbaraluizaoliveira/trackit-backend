const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/db'); // Se der erro de módulo aqui, mude para: require('../config/db') ou require('./config/db') dependendo de onde está a pasta config

const authRoutes = require('./routes/authRoutes'); 
const authMiddleware = require('./middlewares/auth'); 

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes); 

// Rota de teste para validar o middleware
app.get("/users", authMiddleware, (req, res) => {
  res.json({
    message: "Rota protegida funcionando!",
    userId: req.userId,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});