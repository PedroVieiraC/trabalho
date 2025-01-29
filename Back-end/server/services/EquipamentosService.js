const equipamentoRepository = require('../repositories/EquipamentosRepository');

class EquipamentosService {
    getAll(callback) {
        equipamentoRepository.getAll(callback);
    }

    get(id, callback) {
        equipamentoRepository.get(id, callback);
    }
}

// Exporta uma instância da classe
module.exports = new EquipamentosService();