const aluguelRepository = require('../repositories/AluguelRepository');

class AluguelService {
  get(cpfCliente, callback) {
    aluguelRepository.get(cpfCliente, callback);
  }
}

module.exports = new AluguelService();