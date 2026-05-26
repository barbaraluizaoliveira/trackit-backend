const pool = require('../config/db');

const appModel = {
  // ==========================================
  // QUERIES PARA OS ITENS (Matheus vai usar)
  // ==========================================

  // Listar todos os itens do usuário logado
  findItemsByUserId: async (userId) => {
    const query = 'SELECT * FROM items WHERE user_id = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [userId]);
    return result.rows;
  },

  // Criar um item atrelado ao usuário logado
  createItem: async (userId, name, description) => {
    const query = `
      INSERT INTO items (user_id, name, description) 
      VALUES ($1, $2, $3) 
      RETURNING *
    `;
    const result = await pool.query(query, [userId, name, description]);
    return result.rows[0];
  },

  // Atualizar item (Apenas se pertencer ao usuário logado - Regra do Professor!)
  updateItem: async (itemId, userId, name, description) => {
    const query = `
      UPDATE items 
      SET name = $1, description = $2 
      WHERE id = $3 AND user_id = $4 
      RETURNING *
    `;
    const result = await pool.query(query, [name, description, itemId, userId]);
    return result.rows[0];
  },

  // Deletar item (Apenas se pertencer ao usuário logado)
  deleteItem: async (itemId, userId) => {
    const query = 'DELETE FROM items WHERE id = $1 AND user_id = $2 RETURNING *';
    const result = await pool.query(query, [itemId, userId]);
    return result.rowCount > 0; // Retorna true se deletou algo, false se não encontrou/não era dono
  },

  // ==========================================
  // QUERIES PARA OS EMPRÉSTIMOS (Matheus e Vinícius vão usar)
  // ==========================================

  // Listar empréstimos onde o usuário é quem emprestou OU quem pegou emprestado
  findLoansByUserId: async (userId) => {
    const query = `
      SELECT l.*, i.name as item_name, u1.name as lender_name, u2.name as borrower_name
      FROM loans l
      JOIN items i ON l.item_id = i.id
      JOIN users u1 ON l.lender_id = u1.id
      JOIN users u2 ON l.borrower_id = u2.id
      WHERE l.lender_id = $1 OR l.borrower_id = $1
      ORDER BY l.created_at DESC
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  },

  // Criar um novo empréstimo
  createLoan: async (lenderId, borrowerId, itemId, dueDate) => {
    const query = `
      INSERT INTO loans (lender_id, borrower_id, item_id, due_date) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `;
    const result = await pool.query(query, [lenderId, borrowerId, itemId, dueDate]);
    return result.rows[0];
  },

  // Atualizar status do empréstimo (Ex: marcar como 'returned')
  updateLoanStatus: async (loanId, userId, status) => {
    const query = `
      UPDATE loans 
      SET status = $1 
      WHERE id = $2 AND (lender_id = $3 OR borrower_id = $3) 
      RETURNING *
    `;
    const result = await pool.query(query, [status, loanId, userId]);
    return result.rows[0];
  }
};

module.exports = appModel;