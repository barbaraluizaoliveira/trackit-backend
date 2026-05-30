const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const JWT_SECRET = process.env.JWT_SECRET || "chave_secreta";

function gerarToken(payload = {}) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1d",
  });
}

module.exports = {
  
  async signUp(req, res) {
    console.log("Dados recebidos no signUp:", req.body);
    
    const { email, password, name } = req.body;

    try {
      if (!name || !email || !password) {
        return res.status(400).json({
          error: "Por favor, preencha todos os campos (name, email, password)",
        });
      }

      const userExists = await UserModel.findByEmail(email);

      if (userExists) {
        return res.status(400).json({
          error: "E-mail já cadastrado",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const novoUsuario = await UserModel.create(
        name,
        email,
        hashedPassword
      );

      if (novoUsuario) {
        novoUsuario.password = undefined;
      }

      return res.status(201).json({
        message: "Usuário criado com sucesso",
        user: novoUsuario,
        token: gerarToken({ id: novoUsuario.id }),
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await UserModel.findByEmail(email);

      if (!user) {
        return res.status(401).json({
          error: "Usuário não encontrado",
        });
      }

      const senhaOk = await bcrypt.compare(
        password,
        user.password
      );

      if (!senhaOk) {
        return res.status(401).json({
          error: "Senha inválida",
        });
      }

      user.password = undefined;

      return res.json({
        user,
        token: gerarToken({ id: user.id }),
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  },

  async logout(req, res) {
    return res.json({
      message: "Logout realizado. Apenas descarte o token no cliente.",
    });
  },
};