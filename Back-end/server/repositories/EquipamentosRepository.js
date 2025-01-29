const db = require('../config/db');

class EquipamentosRepository {
    getAll(callback) {
        const sql = 'SELECT * FROM equipamentos';
        db.query(sql, callback);
    }
}

// Exporta uma instância da classe
module.exports = new EquipamentosRepository();