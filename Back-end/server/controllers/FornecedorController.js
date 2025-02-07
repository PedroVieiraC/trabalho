const fornecedorService = require("../services/FornecedorService");

class FornecedorController{

    getAll(req, res) {
      fornecedorService.getAll((error, results) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.send(results);
        }
      });
    }

  
  async adicionarFornecedor(req, res) {
    try {
      const fornecedor = req.body;
      const resultado = await fornecedorService.adicionarFornecedor(fornecedor);
      res.status(201).json(resultado);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async atualizarFornecedor(req, res) {
    try {
      const { cnpj } = req.params;
      const fornecedor = req.body;
      const resultado = await fornecedorService.atualizarFornecedor(cnpj, fornecedor);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async removerFornecedor(req, res) {
    try {
      const { cnpj } = req.params;
      const resultado = await fornecedorService.removerFornecedor(cnpj);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new FornecedorController();
