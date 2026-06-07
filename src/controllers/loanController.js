const appModel = require('../models/appModel');

const loanController = {
  listLoans: async (req, res) => {
    try {
      const loans = await appModel.findLoansByUserId(req.userId);
      return res.status(200).json(loans);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar empréstimos.', error: error.message });
    }
  },

  createLoan: async (req, res) => {
    try {
      const { borrowerId, itemId, dueDate } = req.body;
      if (!borrowerId || !itemId) {
        return res.status(400).json({ message: 'borrowerId e itemId são obrigatórios.' });
      }
      const loan = await appModel.createLoan(req.userId, borrowerId, itemId, dueDate);
      return res.status(201).json(loan);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar empréstimo.', error: error.message });
    }
  },

  updateLoanStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ message: 'O status é obrigatório.' });
      }
      const loan = await appModel.updateLoanStatus(req.userId, id, status);
      if (!loan) {
        return res.status(404).json({ message: 'Empréstimo não encontrado ou sem permissão.' });
      }
      return res.status(200).json(loan);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar status do empréstimo.', error: error.message });
    }
  },
};

module.exports = loanController;
