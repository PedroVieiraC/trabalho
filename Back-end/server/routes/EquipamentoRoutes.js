const express = require('express');
const router = express.Router();

const equipamentoController = require('../controllers/EquipamentoController');
const ClienteController = require('../controllers/ClienteController');

router.get('/', equipamentoController.getAll);
router.get('/:id', equipamentoController.get);

router.post('/cadastrar', equipamentoController.cadastrarEquipamento);

module.exports = router;