const express = require('express');
const alugueisAtivosController = require('../controllers/AlugueisAtivosController');

const router = express.Router();

// Retorna os aluguéis ativos de um cliente (usando CPF)
router.get('/:cpfCliente', alugueisAtivosController.get);

// Atualiza um aluguel ativo (usando somente o idAluguel)
router.put('/:idAluguel', alugueisAtivosController.update);

// Remove um aluguel ativo (usando somente o idAluguel)
router.delete('/:idAluguel', alugueisAtivosController.remove);

module.exports = router;
