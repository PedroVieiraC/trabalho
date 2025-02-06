// routes/clienteRoutes.js
const express = require('express');
const clienteController = require('../controllers/clienteController');

const router = express.Router();

router.get('/', clienteController.getAll);
router.get('/:cpf', clienteController.get); // Nova rota para buscar pelo CPF

router.post('/cadastrar', clienteController.cadastrarCliente);
router.post('/login', clienteController.login);

router.put('/:cpf', clienteController.update);
router.delete('/:cpf', clienteController.delete);

module.exports = router;
