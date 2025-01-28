const equipamentoRepository = require('../repositories/EventoRepository.js');

class EquipamentoService {
    getAll(callback) {
        equipamentoRepository.getAll(callback);
    }
}