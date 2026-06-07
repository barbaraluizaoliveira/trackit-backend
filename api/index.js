const express = require('express');
const cors = require('cors');
require('dotenv').config();

require('../src/config/db'); 

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