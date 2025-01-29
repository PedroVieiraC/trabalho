const express = require('express');
const router = express.Router();

const equipamentosRouter = require('./equipamentosRoute');

router.use('/equipamentos', equipamentosRouter);

module.exports = router;