const express = require('express');
const router = express.Router();
const clienteRouter = require('./clienteRoutes');
const equipamentoRoutes = require('./EquipamentoRoutes');
const aluguelRoutes = require('./AluguelRoutes');
const alugueisAtivosRoutes = require('./AlugueisAtivosRoutes');
const registrodeAlugueisRoutes = require('./registrodeAlugueisRoutes');
const fornecedorRoutes = require('./FornecedorRoute');
const pagamentoRoutes = require('./PagamentoRoute');
const relatorioRoutes = require('./RelatorioRoute');

router.use('/api/equipamento', equipamentoRoutes); 
router.use('/api/cliente', clienteRouter);
router.use('/api/aluguel', aluguelRoutes); 
router.use('/api/alugueisAtivos', alugueisAtivosRoutes); 
router.use('/api/registrodeAlugueis', registrodeAlugueisRoutes); 
router.use('/api/fornecedor', fornecedorRoutes);
router.use('/api/pagamento', pagamentoRoutes);
router.use('/api/relatorio', relatorioRoutes);

module.exports = router;
