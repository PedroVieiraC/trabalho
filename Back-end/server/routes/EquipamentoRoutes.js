const express = require('express');
const router = express.Router();

const equipamentoController = require('../controllers/EquipamentoController');

router.get('/', equipamentoController.getAll);
router.get('/:id', equipamentoController.get);

router.post('/cadastrar', equipamentoController.cadastrarEquipamento);

router.put('/:id', equipamentoController.update);

router.delete('/:id', equipamentoController.delete);

module.exports = router;