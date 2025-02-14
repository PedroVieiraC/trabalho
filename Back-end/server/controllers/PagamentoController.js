const pagamentoService = require('../services/PagamentoService');

class PagamentoController {
  async create(req, res) {
    // Espera receber: idAluguel, qtdeParcelas, valorTotal e dataVencimentoInicial
    const { idAluguel, qtdeParcelas, valorTotal, dataVencimentoInicial } = req.body;
    if (!idAluguel || !qtdeParcelas || !valorTotal || !dataVencimentoInicial) {
      return res.status(400).json({ message: "Dados insuficientes para criar pagamento." });
    }
    try {
      const result = await pagamentoService.create(idAluguel, qtdeParcelas, valorTotal, dataVencimentoInicial);
      res.status(201).json(result);
    } catch (error) {
      console.error("Erro no PagamentoController.create:", error);
      res.status(500).json({ message: error.message });
    }
  }

  async getByClient(req, res) {
    const cpfCliente = req.params.cpfCliente;
    try {
      const result = await pagamentoService.getByClient(cpfCliente);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateStatus(req, res) {
    const { idAluguel, parcelaNumero } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Status é obrigatório." });
    }
    try {
      const result = await pagamentoService.updateStatus(idAluguel, parcelaNumero, status);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async remove(req, res) {
    const { idAluguel, parcelaNumero } = req.params;
    try {
      const result = await pagamentoService.remove(idAluguel, parcelaNumero);
      res.json({ message: "Pagamento removido com sucesso!", result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new PagamentoController();
