const aluguelRepository = require('../repositories/AlugueisAtivosRepository');

class AlugueisAtivosService {
  get(cpfCliente, callback) {
    aluguelRepository.get(cpfCliente, callback);
  }
}

module.exports = new AlugueisAtivosService();