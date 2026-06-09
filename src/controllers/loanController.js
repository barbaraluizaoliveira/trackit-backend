const appModel = require('../models/appModel');

const loanController = {
  listLoans: async (req, res) => {
    try {
      const [coisasQueMeDevem, coisasQueEuDevo] = await Promise.all([
        appModel.findLoansAsLender(req.userId),
        appModel.findLoansAsBorrower(req.userId)
      ]);

      return res.status(200).json({
        coisasQueMeDevem,
        coisasQueEuDevo
      });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar emprestimos.', error: error.message });
    }
  },

  createLoan: async (req, res) => {
    try {
      const { borrowerId, itemId, dueDate } = req.body;

      if (!borrowerId || !itemId) {
        return res.status(400).json({ message: 'borrowerId e itemId sao obrigatorios.' });
      }

      const loan = await appModel.createLoan(req.userId, borrowerId, itemId, dueDate);
      return res.status(201).json(loan);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar emprestimo.', error: error.message });
    }
  },

  updateLoanStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ message: 'O status e obrigatorio.' });
      }

      const loan = await appModel.updateLoanStatus(id, req.userId, status);

      if (!loan) {
        return res.status(404).json({ message: 'Emprestimo nao encontrado ou sem permissao.' });
      }

      return res.status(200).json(loan);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar status do emprestimo.', error: error.message });
    }
  },
};

module.exports = loanController;