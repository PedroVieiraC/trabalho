const aluguelService = require('../services/AluguelService');

class AluguelController {
  getAll(req, res) {
    equipamentoService.getAll((error, results) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(results);
      }
    });
  }

  get(req, res) {
    const id = req.params.id; // Pega o ID da URL
    aluguelService.get(id, (error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(result);
      }
    });
  }
}


const criarAluguel = async (req, res) => {
  try {
    const { cpfCliente, equipamentos, valorSeguro } = req.body;
    const aluguel = await aluguelService.criarAluguel(cpfCliente, equipamentos, valorSeguro);
    res.status(201).json(aluguel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = new AluguelController();