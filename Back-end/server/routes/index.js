const express = require('express');
const router = express.Router();
const clienteRouter = require('./clienteRoutes');
const equipamentoRoutes = require('./EquipamentoRoute');


router.use('/api/equipamento', equipamentoRoutes); // Usando a variável correta
router.use('/api/cliente', clienteRouter);

module.exports = router;