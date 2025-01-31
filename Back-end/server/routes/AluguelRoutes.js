const express = require('express');
const aluguelController = require('../controllers/AluguelController');

const router = express.Router();

// Definição da rota correta
router.get('/:cpfCliente', aluguelController.get); 

module.exports = router;
