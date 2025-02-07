const alugueisAtivosService = require('../services/AlugueisAtivosService');

class AlugueisAtivosController {
  // Retorna os aluguéis ativos para um determinado cliente (por CPF)
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

  // Atualiza um aluguel ativo: permite atualizar o novo VALOR e DATA_FIM
  update(req, res) {
    const idAluguel = req.params.idAluguel;
    // O front-end envia, no body, os seguintes dados:
    // { "valor": <novo_valor>, "data_fim": "<nova_data_fim>" }
    const { valor, data_fim } = req.body;
    
    alugueisAtivosService.update(idAluguel, valor, data_fim, (error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send({ message: "Aluguel ativo atualizado com sucesso!" });
      }
    });
  }

  // Remove um aluguel ativo (usando somente o idAluguel)
  remove(req, res) {
    const idAluguel = req.params.idAluguel;
    alugueisAtivosService.remove(idAluguel, (error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send({ message: "Aluguel ativo removido com sucesso!" });
      }
    });
  }
}

module.exports = new AlugueisAtivosController();
