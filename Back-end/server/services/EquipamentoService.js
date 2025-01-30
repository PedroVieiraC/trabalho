const equipamentoRepository = require('../repositories/EquipamentoRepository');

class EquipamentoService {
    getAll(callback) {
        equipamentoRepository.getAll(callback);
    }

    get(id, callback) {
        equipamentoRepository.get(id, callback);
    }
}

// Exporta uma instância da classe
module.exports = new EquipamentoService();