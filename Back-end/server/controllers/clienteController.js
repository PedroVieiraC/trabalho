// controllers/clienteController.js
const clienteService = require('../services/clienteService');

class ClienteController {
    // Cadastrar um novo cliente
    async cadastrarCliente(req, res) {
        const { cpf, nome, cep, numero, complemento, telefone, senha } = req.body;

        try {
            // Chamar o serviço para cadastrar o cliente
            await clienteService.cadastrarCliente({ cpf, nome, cep, numero, complemento, telefone, senha });
            res.status(201).json({ message: 'Cliente cadastrado com sucesso!' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new ClienteController();