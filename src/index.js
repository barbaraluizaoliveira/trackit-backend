const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/db'); 

// 1. IMPORTAR AS ROTAS: sempre que criarem um arquivo novo de rotas, vamos importa aqui
const authRoutes = require('./routes/authRoutes'); 

const app = express();

app.use(cors());
app.use(express.json());

// 2. ATIVAR AS ROTAS: avisa pro Express para usar as rotas importadas
app.use(authRoutes); 

// apenas pra testar inicialmente kk
app.get('/', (req, res) => {
  res.json({ message: "bem vindo a api do TrackIt!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`sservidor rodando na porta ${PORT}`);
});