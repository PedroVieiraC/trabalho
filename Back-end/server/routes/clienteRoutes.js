// routes/clienteRoutes.js
const express = require('express');
const clienteController = require('../controllers/ClienteController');

const router = express.Router();

router.get('/',clienteController.getAll);

router.post('/cadastrar', clienteController.cadastrarCliente);

router.post('/login', clienteController.login);

router.put('/:id', clienteController.update);

router.delete('/:id', clienteController.delete);


module.exports = router;