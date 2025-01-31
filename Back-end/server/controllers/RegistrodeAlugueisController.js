const registrodeAlugueisService = require('../services/RegistrodeAlugueisService');

class RegistrodeAlugueisController {
  getAll(req, res) {
    registrodeAlugueisService.getAll((error, results) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(results);
      }
    });
  }

  get(req, res) {
    const cpfCliente = req.params.cpfCliente; // Certo: deve corresponder à rota
    registrodeAlugueisService.get(cpfCliente, (error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(result);
      }
    });
  }
}


module.exports = new RegistrodeAlugueisController();