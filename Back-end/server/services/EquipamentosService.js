const equipamentoRepository = require('../repositories/EquipamentosRepository');

class EquipamentosService {
    getAll(callback) {
        equipamentoRepository.getAll(callback);
    }
}

// Exporta uma instância da classe
module.exports = new EquipamentosService();