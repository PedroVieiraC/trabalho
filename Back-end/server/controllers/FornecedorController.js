const FornecedorService = require("../service/FornecedorService");

const FornecedorController = {
  async adicionarFornecedor(req, res) {
    try {
      const fornecedor = req.body;
      const resultado = await FornecedorService.adicionarFornecedor(fornecedor);
      res.status(201).json(resultado);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async atualizarFornecedor(req, res) {
    try {
      const { cnpj } = req.params;
      const fornecedor = req.body;
      const resultado = await FornecedorService.atualizarFornecedor(cnpj, fornecedor);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async removerFornecedor(req, res) {
    try {
      const { cnpj } = req.params;
      const resultado = await FornecedorService.removerFornecedor(cnpj);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = FornecedorController;
