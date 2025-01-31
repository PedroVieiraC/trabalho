const db = require('../config/db');

class ClienteRepository {
    async getAll() {
        const sql = 'SELECT * FROM CLIENTE';
        try {
            const { rows } = await db.query(sql); // O PostgreSQL retorna `{ rows }`
            return rows;
        } catch (error) {
            throw new Error('Erro ao buscar clientes: ' + error.message);
        }
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
            return rows[0]; // Retorna o cliente inserido
        } catch (error) {
            throw new Error('Erro ao cadastrar cliente: ' + error.message);
        }
    }

    async verificarCpfExistente(cpf) {
        const query = 'SELECT CPF FROM CLIENTE WHERE CPF = $1';
        try {
            const { rows } = await db.query(query, [cpf]);
            return rows.length > 0;
        } catch (error) {
            throw new Error('Erro ao verificar CPF: ' + error.message);
        }
    }
}

module.exports = new ClienteRepository();
