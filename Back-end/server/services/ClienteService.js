// services/clienteService.js
const clienteRepository = require('../repositories/ClienteRepository');

class ClienteService {
    getAll(callback){
        clienteRepository.getAll(callback);
    }

    async cadastrarCliente(cliente) {
        const {cpf, nome, cep, numero, complemento, telefone, senha} = cliente;

        // Verificar se o CPF já está cadastrado
        const cpfExistente = await clienteRepository.verificarCpfExistente(cpf);
        if (cpfExistente) {
            throw new Error('CPF já cadastrado.');
        }

        // Cadastrar o cliente
        await clienteRepository.cadastrarCliente({ cpf, nome, cep, numero, complemento, telefone, senha });
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

     async update(id, cpf) {
            // Verifica se o equipamento existe antes de atualizar
            const existe = await clienteRepository.verificarCpfExistente(cpf);
            if (!existe) {
                throw new Error("CPF não encontrado.");
            }
        
            return await clienteRepository.update(id, cpf);
        }
        
        async delete(cpf) {
            return await clienteRepository.delete(cpf);
          }
       
}



module.exports = new ClienteService();