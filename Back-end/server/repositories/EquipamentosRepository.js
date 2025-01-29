const db = require('../config/db');

class EquipamentosRepository {
    getAll(callback) {
        const sql = 'SELECT * FROM equipamentos';
        db.query(sql, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result.rows); // Retorna apenas as linhas (dados)
            }
        });
    }

    get(id, callback) {
        const sql = 'SELECT * FROM equipamentos WHERE id = $1';
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
module.exports = new EquipamentosRepository();