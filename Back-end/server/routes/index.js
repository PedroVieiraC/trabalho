const express = require('express');
const router = express.Router();

const equipamentosRouter = require('./equipamentos');

router.use('/equipamentos', equipamentosRouter);

module.exports = router;