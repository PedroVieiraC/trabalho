// services/clienteService.js
const clienteRepository = require('../repositories/clienteRepository');

class ClienteService {
    // Cadastrar um novo cliente
    async cadastrarCliente(cliente) {
        const { cpf, nome, cep, numero, complemento, telefone, senha } = cliente;

        // Verificar se o CPF já está cadastrado
        const cpfExistente = await clienteRepository.verificarCpfExistente(cpf);
        if (cpfExistente) {
            throw new Error('CPF já cadastrado.');
        }

        // Cadastrar o cliente
        const resultado = await clienteRepository.cadastrarCliente({ cpf, nome, cep, numero, complemento, telefone, senha });
        return resultado;
    }
}

module.exports = new ClienteService();