const express = require("express");

const FornecedorController = require("../controller/FornecedorController");
const equipamentoController = require('../controllers/EquipamentoController');


const router = express.Router();

router.post("/fornecedor", FornecedorController.adicionarFornecedor);
router.put("/fornecedor/:cnpj", FornecedorController.atualizarFornecedor);
router.delete("/fornecedor/:cnpj", FornecedorController.removerFornecedor);

module.exports = router;
