const registrodeAlugueisRepository = require('../repositories/RegistrodeAlugueisRepository');

class RegistrodeAlugueisService {
  get(cpfCliente, callback) {
    registrodeAlugueisRepository.get(cpfCliente, callback);
  }
}

module.exports = new RegistrodeAlugueisService();