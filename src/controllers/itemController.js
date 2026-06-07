const appModel = require('../models/appModel');

const itemController = {
  listItems: async (req, res) => {
    try {
      const items = await appModel.findItemsByUserId(req.userId);
      return res.status(200).json(items);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar itens.', error: error.message });
    }
  },

  createItem: async (req, res) => {
    try {
      const { name, description } = req.body;
      if (!name) {
        return res.status(400).json({ message: 'O nome do item é obrigatório.' });
      }
      const item = await appModel.createItem(req.userId, name, description);
      return res.status(201).json(item);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar item.', error: error.message });
    }
  },

  updateItem: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const item = await appModel.updateItem(id, req.userId, name, description);
      if (!item) {
        return res.status(404).json({ message: 'Item não encontrado ou sem permissão.' });
      }
      return res.status(200).json(item);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar item.', error: error.message });
    }
  },

  deleteItem: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await appModel.deleteItem(id, req.userId);
      if (!deleted) {
        return res.status(404).json({ message: 'Item não encontrado ou sem permissão.' });
      }
      return res.status(200).json({ message: 'Item deletado com sucesso.' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao deletar item.', error: error.message });
    }
  },
};

module.exports = itemController;
