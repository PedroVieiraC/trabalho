const express = require('express');
const { getEquipamentos } = require('../controllers/equipamentosController');

const router = express.Router();

router.get('/', getEquipamentos);

module.exports = router;
