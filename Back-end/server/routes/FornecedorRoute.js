const express = require("express");

const FornecedorController = require("../controllers/FornecedorController");


const router = express.Router();

router.post("/fornecedor", FornecedorController.adicionarFornecedor);
router.put("/fornecedor/:cnpj", FornecedorController.atualizarFornecedor);
router.delete("/fornecedor/:cnpj", FornecedorController.removerFornecedor);

module.exports = router;
