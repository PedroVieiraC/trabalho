const express = require('express');
const alugueisAtivosController = require('../controllers/AlugueisAtivosController');

const router = express.Router();

// Definição da rota correta
router.get('/:cpfCliente', alugueisAtivosController.get); 

module.exports = router;
