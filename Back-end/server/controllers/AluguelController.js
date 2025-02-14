const aluguelService = require('../services/AluguelService');

class AluguelController {
  async create(req, res) {
    const cpfCliente = req.params.cpfCliente;
    // Recebe equipamentos e parcelas; o parâmetro total é enviado, mas não será usado
    const { equipamentos, total, parcelas } = req.body;
    try {
      const novoAluguel = await aluguelService.create(cpfCliente, equipamentos, parcelas);
      res.status(201).json({ idAluguel: novoAluguel.id });
    } catch (error) {
      console.error('Erro ao criar aluguel:', error);
      res.status(500).json({ message: error.message });
    }
  }

  get(req, res) {
    const cpfCliente = req.params.cpfCliente;
    aluguelService.get(cpfCliente, (error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(result);
      }
    });
  }
}

module.exports = new AluguelController();
