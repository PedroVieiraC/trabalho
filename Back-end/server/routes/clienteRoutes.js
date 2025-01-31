// routes/clienteRoutes.js
const express = require('express');
const clienteController = require('../controllers/ClienteController');

const router = express.Router();

router.get('/',clienteController.getAll);

// Rota para cadastrar um novo cliente
router.post('/cadastrar', clienteController.cadastrarCliente);

module.exports = router;