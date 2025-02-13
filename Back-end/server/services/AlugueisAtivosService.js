const aluguelRepository = require('../repositories/AlugueisAtivosRepository');

class AlugueisAtivosService {
  get(cpfCliente, callback) {
    aluguelRepository.get(cpfCliente, callback);
  }

  update(idAluguel, novaDataFim, callback) {
    aluguelRepository.update(idAluguel, novaDataFim, callback);
  }

  remove(idAluguel, callback) {
    aluguelRepository.remove(idAluguel, callback);
  }
}

module.exports = new AlugueisAtivosService();
