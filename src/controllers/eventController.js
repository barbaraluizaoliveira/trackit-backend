const pool = require("../config/db");

async function listLoanEvents(req, res) {
  try {
    const { id } = req.params;

    const loanResult = await pool.query(
      "SELECT * FROM loans WHERE id = $1",
      [id]
    );

    if (loanResult.rows.length === 0) {
      return res.status(404).json({ message: "Emprestimo nao encontrado." });
    }

    const eventsResult = await pool.query(
      "SELECT * FROM loan_events WHERE loan_id = $1 ORDER BY created_at ASC",
      [id]
    );

    return res.status(200).json(eventsResult.rows);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao listar historico de eventos do emprestimo.",
      error: error.message,
    });
  }
}

async function createLoanEvent(req, res) {
  try {
    const { id } = req.params;
    const { description } = req.body;

    if (!description || description.trim() === "") {
      return res.status(400).json({
        message: "O campo description e obrigatorio. Ex: Item entregue.",
      });
    }

    const loanResult = await pool.query(
      "SELECT * FROM loans WHERE id = $1",
      [id]
    );

    if (loanResult.rows.length === 0) {
      return res.status(404).json({ message: "Emprestimo nao encontrado." });
    }

    const eventResult = await pool.query(
      `INSERT INTO loan_events (loan_id, description)
       VALUES ($1, $2)
       RETURNING *`,
      [id, description.trim()]
    );

    return res.status(201).json(eventResult.rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao criar evento no historico do emprestimo.",
      error: error.message,
    });
  }
}

module.exports = {
  listLoanEvents,
  createLoanEvent,
};