// repositories/clienteRepository.js
const db = require('../config/db');

class ClienteRepository {
    // Cadastrar um novo cliente
    async cadastrarCliente(cliente) {
        const { cpf, nome, cep, numero, complemento, telefone, senha } = cliente;
        const query = `
            INSERT INTO CLIENTE (CPF, NOME, CEP, NUMERO, COMPLEMENTO, TELEFONE, SENHA)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [cpf, nome, cep, numero, complemento, telefone, senha];

        try {
            const [result] = await db.promise().execute(query, values);
            return result;
        } catch (error) {
            throw new Error('Erro ao cadastrar cliente: ' + error.message);
        }
    }

    // Verificar se um CPF já está cadastrado
    async verificarCpfExistente(cpf) {
        const query = 'SELECT CPF FROM CLIENTE WHERE CPF = ?';
        const [rows] = await db.promise().execute(query, [cpf]);
        return rows.length > 0;
    }
}

module.exports = new ClienteRepository();