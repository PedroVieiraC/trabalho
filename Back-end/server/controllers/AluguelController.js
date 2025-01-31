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
    const cpfCliente = req.params.cpfCliente; // Certo: deve corresponder à rota
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