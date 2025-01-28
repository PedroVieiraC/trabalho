const express = require('express');

const router = express.Router();

const eventoController = require('../controllers/equipamentosController');


router.get('/', equipamentosController.getall);
//router.post('/', addEquipamento);
//router.put('/', updateEquipamento);
//router.delete('/', deleteEquipamento);

module.exports = router;
