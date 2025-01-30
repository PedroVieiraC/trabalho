const db = require('../config/db');

class EquipamentoRepository {
    getAll(callback) {
        const sql = 'SELECT * FROM EQUIPAMENTO';
        db.query(sql, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result.rows); // Retorna apenas as linhas (dados)
            }
        });
    }

    get(id, callback) {
        const sql = 'SELECT * FROM EQUIPAMENTO WHERE id = $1';
        db.query(sql, [id], (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result.rows[0]); // Retorna apenas a primeira linha (dado único)
            }
        });
    }
}

// Exporta uma instância da classe
module.exports = new EquipamentoRepository();