const equipamentoService = require('../services/EquipamentosService.js');

class EquipamentosController {
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
    equipamentoService.get(id, (error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(result);
      }
    });
  }
}

// Exportar uma instância da classe
module.exports = new EquipamentosController();