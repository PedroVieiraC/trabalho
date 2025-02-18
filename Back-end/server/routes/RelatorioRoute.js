const express = require('express');
const router = express.Router();
const relatorioController = require('../controllers/RelatorioController');

// Definição das rotas para os relatórios:
router.get('/clienteMaiorValor', relatorioController.getClienteMaiorValor);
router.get('/clienteTodosEquipamentos', relatorioController.getClienteTodosEquipamentos);
router.get('/equipamentoMaisAlugado', relatorioController.getEquipamentoMaisAlugado);
router.get('/receitaPorMes', relatorioController.getReceitaPorMes);
router.get('/clientesPagamentosAtrasados', relatorioController.getClientesPagamentosAtrasados);
router.get('/equipamentosEstoqueAbaixoMedia', relatorioController.getEquipamentosEstoqueAbaixoMedia);
router.get('/clientesAlugueisAtivos', relatorioController.getClientesAlugueisAtivos);


module.exports = router;
