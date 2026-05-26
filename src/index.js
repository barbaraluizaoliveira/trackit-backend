const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/db'); 

// 1. IMPORTAR AS ROTAS
const authRoutes = require('./routes/authRoutes'); 
const relationRoutes = require('./routes/relationRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// 2. ATIVAR AS ROTAS
app.use(authRoutes); 
app.use(relationRoutes);

// apenas pra testar inicialmente kk
app.get('/', (req, res) => {
  res.json({ message: "bem vindo a api do TrackIt!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});