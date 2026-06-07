const express = require('express');
const authMiddleware = require('../middlewares/auth');
const itemController = require('../controllers/itemController');
const loanController = require('../controllers/loanController');

const router = express.Router();

router.use(authMiddleware);

// Items
router.get('/items', itemController.listItems);
router.post('/items', itemController.createItem);
router.put('/items/:id', itemController.updateItem);
router.delete('/items/:id', itemController.deleteItem);

// Loans
router.get('/loans', loanController.listLoans);
router.post('/loans', loanController.createLoan);
router.put('/loans/:id/status', loanController.updateLoanStatus);

module.exports = router;
