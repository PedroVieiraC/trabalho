const express = require('express');
const router = express.Router();
const clienteRouter = require('./clienteRoutes');
const equipamentoRoutes = require('./EquipamentoRoute');
const aluguelRoutes = require('./AluguelRoutes');


router.use('/api/equipamento', equipamentoRoutes); 
router.use('/api/cliente', clienteRouter);

router.use('/api/aluguel', aluguelRoutes);


module.exports = router;