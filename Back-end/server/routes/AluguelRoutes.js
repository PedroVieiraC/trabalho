const express = require('express');
const aluguelController = require('../controllers/AluguelController');

const router = express.Router();

//router.post('/aluguel', aluguelController.criarAluguel);
router.get('/aluguel/:cpfCliente', aluguelController.get);


module.exports = router;