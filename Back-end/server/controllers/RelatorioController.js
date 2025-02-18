const relatorioService = require('../services/RelatorioService');

class RelatorioController {
  getClienteMaiorValor(req, res) {
    relatorioService.getClienteMaiorValor((error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(result);
      }
    });
  }

  getClienteTodosEquipamentos(req, res) {
    relatorioService.getClienteTodosEquipamentos((error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(result);
      }
    });
  }

  getEquipamentoMaisAlugado(req, res) {
    relatorioService.getEquipamentoMaisAlugado((error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(result);
      }
    });
  }

  getReceitaPorMes(req, res) {
    relatorioService.getReceitaPorMes((error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(result);
      }
    });
  }

  getClientesPagamentosAtrasados(req, res) {
    relatorioService.getClientesPagamentosAtrasados((error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(result);
      }
    });
  }

  getEquipamentosEstoqueAbaixoMedia(req, res) {
    relatorioService.getEquipamentosEstoqueAbaixoMedia((error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(result);
      }
    });
  }

  getClientesAlugueisAtivos(req, res) {
    relatorioService.getClientesAlugueisAtivos((error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(result);
      }
    });
  }
  
}

module.exports = new RelatorioController();
