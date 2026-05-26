// arquivo temporário para o servidor não quebrar. layza vai substituir isso aqui

const authController = {
  signUp: async (req, res) => {
    return res.json({ message: "rota sign up aquiiiiii" });
  },
  login: async (req, res) => {
    return res.json({ message: "rota de login aquiiiii" });
  }
};

module.exports = authController;