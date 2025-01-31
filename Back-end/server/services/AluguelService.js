const aluguelRepository = require('../repositories/AluguelRepository');

class AluguelService {
  get(id,callback){
    aluguelRepository.get(id,callback);
  }
}

// Exporta uma instância da classe
module.exports = new AluguelService();