const express = require('express');
const pagamentoController = require('../controllers/PagamentoController');

const router = express.Router();

// Cria os pagamentos (vários registros de uma vez)
router.post('/', pagamentoController.create);

// Recupera os pagamentos de um cliente (usando CPF)
router.get('/:cpfCliente', pagamentoController.getByClient);

// Atualiza o status de um pagamento (usando idAluguel e parcelaNumero)
router.put('/:idAluguel/:parcelaNumero', pagamentoController.updateStatus);

// Remove um pagamento (usando idAluguel e parcelaNumero)
router.delete('/:idAluguel/:parcelaNumero', pagamentoController.remove);

module.exports = router;
