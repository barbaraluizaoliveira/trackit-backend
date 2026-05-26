const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); //layza vai criar este arquivo depois

//rotas publicas que layza vai implementar
router.post('/auth/signup', authController.signUp);
router.post('/auth/login', authController.login);

module.exports = router;