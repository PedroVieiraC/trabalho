const db = require('../config/db');

class ClienteRepository {

    

    async getAll() {
        const sql = 'SELECT * FROM CLIENTE';
        try {
            const { rows } = await db.query(sql);
            return rows;
        } catch (error) {
            throw new Error('Erro ao buscar clientes: ' + error.message);
        }
    }

    async get(cpf, callback) {

        const sql = 'SELECT * FROM CLIENTE WHERE cpf = $1';
        
        db.query(sql, [cpf], (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result.rows[0]); // Retorna apenas a primeira linha (dado único)
            }
        });
    }

    async cadastrarCliente(cliente) {
        const { cpf, nome, cep, numero, complemento, telefone, senha } = cliente;
        const query = `
            INSERT INTO CLIENTE (CPF, NOME, CEP, NUMERO, COMPLEMENTO, TELEFONE, SENHA)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;
        const values = [cpf, nome, cep, numero, complemento, telefone, senha];
        try {
            const { rows } = await db.query(query, values);
            return rows[0];
        } catch (error) {
            throw new Error('Erro ao cadastrar cliente: ' + error.message);
        }
    }

    async verificarCpfExistente(cpf) {
        const query = 'SELECT CPF FROM CLIENTE WHERE CPF = $1';
        const values = [cpf];
        try {
            const result = await db.query(query, values);
            return result.rows.length > 0;
        } catch (error) {
            throw new Error('Erro ao verificar CPF: ' + error.message);
        }
    }

    async buscarClientePorCpf(cpf) {
        const query = 'SELECT * FROM CLIENTE WHERE CPF = $1';
        const values = [cpf];
        try {
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error('Erro ao buscar cliente: ' + error.message);
        }
    }

    async update(cpf, cliente) {
        const { nome, cep, numero, complemento, telefone, senha } = cliente;
        const query = `
            UPDATE CLIENTE 
            SET nome = $2, cep = $3, numero = $4, complemento = $5, telefone = $6, senha = $7 
            WHERE cpf = $1 RETURNING *;
        `;
        const values = [cpf, nome, cep, numero, complemento, telefone, senha];
        try {
            const { rows } = await db.query(query, values);
            if (rows.length === 0) {
                throw new Error("Cliente não encontrado.");
            }
            return rows[0];
        } catch (error) {
            throw new Error("Erro ao atualizar cliente: " + error.message);
        }
    }

    async delete(cpf) {
        const query = "DELETE FROM CLIENTE WHERE cpf = $1 RETURNING *;";
        const values = [cpf];
        try {
            const { rows } = await db.query(query, values);
            if (rows.length === 0) {
                throw new Error("Cliente não encontrado.");
            }
            return rows[0];
        } catch (error) {
            throw new Error("Erro ao deletar cliente: " + error.message);
        }
    }
}

module.exports = new ClienteRepository();
