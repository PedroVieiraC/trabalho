const express = require('express');
const registrodeAlugueisController = require('../controllers/RegistrodeAlugueisController');

const router = express.Router();

// Definição da rota correta
router.get('/:cpfCliente', registrodeAlugueisController.get); 

module.exports = router;
