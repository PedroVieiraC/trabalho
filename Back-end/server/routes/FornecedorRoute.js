const express = require("express");

const FornecedorController = require("../controllers/FornecedorController");


const router = express.Router();

router.post("/", FornecedorController.adicionarFornecedor);
router.put("/:cnpj", FornecedorController.atualizarFornecedor);
router.delete("/:cnpj", FornecedorController.removerFornecedor);

module.exports = router;
