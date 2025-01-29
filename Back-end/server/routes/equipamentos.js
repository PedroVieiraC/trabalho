const express = require('express');
const router = express.Router();

const equipamentosController = require('../controllers/EquipamentosController');

router.get('/', equipamentosController.getAll);

module.exports = router;