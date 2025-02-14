const express = require('express');
const aluguelController = require('../controllers/AluguelController');

const router = express.Router();

// Obter aluguéis por CPF
router.get('/:cpfCliente', aluguelController.get);


router.post('/:cpfCliente', aluguelController.create);

module.exports = router;
