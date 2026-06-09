// const express = require("express");
// const pool = require("../config/db");
// const eventController = require("../controllers/eventController");

// const router = express.Router();

// router.get("/loans/:id/events", eventController.listLoanEvents);
// router.post("/loans/:id/events", eventController.createLoanEvent);

// router.get("/users/:id/loans", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const userResult = await pool.query(
//       "SELECT * FROM users WHERE id = $1",
//       [id]
//     );

//     if (userResult.rows.length === 0) {
//       return res.status(404).json({ message: "Usuario nao encontrado." });
//     }

//     const loansResult = await pool.query(
//       `SELECT * FROM loans
//        WHERE lender_id = $1 OR borrower_id = $1
//        ORDER BY created_at DESC`,
//       [id]
//     );

//     return res.status(200).json(loansResult.rows);
//   } catch (error) {
//     return res.status(500).json({
//       message: "Erro ao listar emprestimos do usuario.",
//       error: error.message,
//     });
//   }
// });

// module.exports = router;

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
      `SELECT 
        l.id,
        l.lender_id,
        l.borrower_id,
        l.item_id,
        l.status,
        l.due_date,
        l.created_at,
        i.name AS item_name,
        u_lender.name AS lender_name,
        u_lender.email AS lender_email,
        u_borrower.name AS borrower_name,
        u_borrower.email AS borrower_email
       FROM loans l
       LEFT JOIN items i ON l.item_id = i.id
       LEFT JOIN users u_lender ON l.lender_id = u_lender.id
       LEFT JOIN users u_borrower ON l.borrower_id = u_borrower.id
       WHERE l.lender_id = $1 OR l.borrower_id = $1
       ORDER BY l.created_at DESC`,
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