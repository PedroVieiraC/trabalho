// services/clienteService.js
const clienteRepository = require('../repositories/ClienteRepository');

class ClienteService {
    async getAll() {
        return await clienteRepository.getAll();
    }

        get(cpf, callback) {
            clienteRepository.get(cpf, callback);
        }

    async cadastrarCliente(cliente) {
        const { cpf, nome, cep, numero, complemento, telefone, senha } = cliente;

        const cpfExistente = await clienteRepository.verificarCpfExistente(cpf);
        if (cpfExistente) {
            throw new Error('CPF já cadastrado.');
        }

        return await clienteRepository.cadastrarCliente({ cpf, nome, cep, numero, complemento, telefone, senha });
    }

    async login(cpf, senha) {
        const cliente = await clienteRepository.buscarClientePorCpf(cpf);
        if (!cliente) {
            throw new Error('CPF não cadastrado.');
        }
        if (cliente.senha !== senha) {
            throw new Error('Senha incorreta.');
        }
        return cliente;
    }

    async update(cpfAntigo, cliente) {
        const existe = await clienteRepository.verificarCpfExistente(cpfAntigo);
        if (!existe) {
            throw new Error("CPF não encontrado.");
        }
        return await clienteRepository.update(cpfAntigo, cliente);
    }
    

    async delete(cpf) {
        return await clienteRepository.delete(cpf);
    }
}

module.exports = new ClienteService();
