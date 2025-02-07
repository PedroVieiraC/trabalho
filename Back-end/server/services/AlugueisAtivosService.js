const aluguelRepository = require('../repositories/AlugueisAtivosRepository');

class AlugueisAtivosService {
  get(cpfCliente, callback) {
    aluguelRepository.get(cpfCliente, callback);
  }

  update(idAluguel, valor, data_fim, callback) {
    aluguelRepository.update(idAluguel, valor, data_fim, callback);
  }

  remove(idAluguel, callback) {
    aluguelRepository.remove(idAluguel, callback);
  }
}

module.exports = new AlugueisAtivosService();
