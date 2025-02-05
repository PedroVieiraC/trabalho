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
    
    async cadastrarEquipamento(equipamento) {
        const {id, nome, cnpj_fornecedor, quantidade, descricao, valor_diaria, url_imagem} = equipamento;
        const query = `
            INSERT INTO EQUIPAMENTO VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;
        const values = [id, nome, cnpj_fornecedor, quantidade, descricao, valor_diaria, url_imagem];

        try {
            const { rows } = await db.query(query, values);
            return rows[0]; // Retorna o equipamento inserido
        } catch (error) {
            throw new Error('Erro ao cadastrar equipamento: ' + error.message);
        }
    }

    async verificaridExistente(id) {
        const query = 'SELECT ID FROM EQUIPAMENTO WHERE ID = $1';
        const values = [id];
    
        try {
            const result = await db.query(query, values);
            return result.rows.length > 0;
        } catch (error) {
            throw new Error('Erro ao verificar ID: ' + error.message);
        }
    }
}

// Exporta uma instância da classe
module.exports = new EquipamentoRepository();