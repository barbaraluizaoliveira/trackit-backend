const express = require("express");
const pool = require("../config/db");
const eventController = require("../controllers/eventController");

const router = express.Router();

router.get("/loans/:id/events", eventController.listLoanEvents);
router.post("/loans/:id/events", eventController.createLoanEvent);

router.get("/users/:id/loans", async (req, res) => {
  try {
    const { id } = req.params;

    const userResult = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "Usuario nao encontrado." });
    }

    const loansResult = await pool.query(
      `SELECT * FROM loans
       WHERE lender_id = $1 OR borrower_id = $1
       ORDER BY created_at DESC`,
      [id]
    );

    return res.status(200).json(loansResult.rows);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao listar emprestimos do usuario.",
      error: error.message,
    });
  }
});

module.exports = router;