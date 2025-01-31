const express = require('express');
const router = express.Router();
const clienteRouter = require('./clienteRoutes');
const equipamentoRoutes = require('./EquipamentoRoute');
const aluguelRoutes = require('./AluguelRoutes');
const alugueisAtivosRoutes = require('./AlugueisAtivosRoutes');
const registrodeAlugueisRoutes = require('./registrodeAlugueisRoutes')

router.use('/api/equipamento', equipamentoRoutes); 
router.use('/api/cliente', clienteRouter);
router.use('/api/aluguel', aluguelRoutes); 
router.use('/api/alugueisAtivos', alugueisAtivosRoutes); 
router.use('/api/registrodeAlugueis', registrodeAlugueisRoutes); 


module.exports = router;