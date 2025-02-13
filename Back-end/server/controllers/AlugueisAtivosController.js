const alugueisAtivosService = require('../services/AlugueisAtivosService');

class AlugueisAtivosController {
  // Retorna os aluguéis ativos para um cliente (por CPF)
  get(req, res) {
    const cpfCliente = req.params.cpfCliente;
    alugueisAtivosService.get(cpfCliente, (error, result) => {
      if (error) {
        res.status(500).json({ message: error.message });
      } else {
        res.json(result);
      }
    });
  }

  // Atualiza um aluguel ativo: espera { novaDataFim } no body
  update(req, res) {
    const idAluguel = req.params.idAluguel;
    const { novaDataFim } = req.body;
    if (!novaDataFim) {
      return res.status(400).json({ message: "Nova data final é obrigatória." });
    }
    alugueisAtivosService.update(idAluguel, novaDataFim, (error, result) => {
      if (error) {
        res.status(500).json({ message: error.message });
      } else {
        res.json(result);
      }
    });
  }

  // Remove um aluguel ativo (usando somente o idAluguel)
  remove(req, res) {
    const idAluguel = req.params.idAluguel;
    alugueisAtivosService.remove(idAluguel, (error, result) => {
      if (error) {
        res.status(500).json({ message: error.message });
      } else {
        res.json({ message: "Aluguel ativo removido com sucesso!" });
      }
    });
  }
}

module.exports = new AlugueisAtivosController();
