const express = require('express');
const router = express.Router();

const equipamentoController = require('../controllers/EquipamentoController');

router.get('/', equipamentoController.getAll);
router.get('/:id', equipamentoController.get);

module.exports = router;