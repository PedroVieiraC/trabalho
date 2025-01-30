const express = require('express');
const router = express.Router();

const equipamentosRouter = require('./EquipamentoRoute');

router.use('/equipamento', equipamentosRouter);

module.exports = router;