const express = require('express');

const router = express.Router();

const equipamentosRoutes = require('./equipamentos');

router.use('/equipamentos', equipamentosRoutes);

module.exports = router;