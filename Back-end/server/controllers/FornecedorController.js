const fornecedorService = require("../services/FornecedorService");

class FornecedorController {

  getAll(req, res) {
    fornecedorService.getAll((error, results) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(results);
      }
    });
  }

  get(req, res) {
    const cnpj = req.params.cnpj; // Pega o cnpj da URL
    fornecedorService.get(cnpj, (error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(result);
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
    const cnpjAntigo = req.params.cnpj;  // valor antigo
    const { cnpj: cnpjNovo, nomeFantasia, telefone, email } = req.body; // novo valor no body
    if (!cnpjNovo || !nomeFantasia || !telefone || !email) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }
    try {
      const resultado = await fornecedorService.atualizarFornecedor(cnpjAntigo, { cnpj: cnpjNovo, nomeFantasia, telefone, email });
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
