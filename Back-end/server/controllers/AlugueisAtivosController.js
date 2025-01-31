const alugueisAtivosService = require('../services/AlugueisAtivosService');

class AlugueisAtivosController {
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
    const cpfCliente = req.params.cpfCliente;
    alugueisAtivosService.get(cpfCliente, (error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(result);
      }
    });
  }
}


module.exports = new AlugueisAtivosController();