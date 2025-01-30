// routes/clienteRoutes.js
const express = require('express');
const clienteController = require('../controllers/clienteController');

const router = express.Router();

// Rota para cadastrar um novo cliente
router.post('/cadastrar', clienteController.cadastrarCliente);

module.exports = router;