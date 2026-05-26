const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/db'); 

const app = express();

app.use(cors());
app.use(express.json());

//apenas pra testar inicialmente
app.get('/', (req, res) => {
  res.json({ message: "Bem-vindo à API do TrackIt!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`sservidor rodando na porta ${PORT}`);
});