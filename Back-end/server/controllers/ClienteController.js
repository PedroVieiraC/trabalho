const clienteService = require('../services/ClienteService');

class ClienteController {
    getAll(req, res){
        clienteService.getAll((error, result) => {
            if (error) {
                res.status(500).send(error);
            } else {
                res.send(result);
            }
        });
    }

    async cadastrarCliente(req, res) {
        const { cpf, nome, cep, numero, complemento, telefone, senha } = req.body;        
        try {
            await clienteService.cadastrarCliente({ cpf, nome, cep, numero, complemento, telefone, senha });
            res.status(201).json({ message: 'Cliente cadastrado com sucesso!' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req, res) {
        const { cpf, senha } = req.body;
        try {
            const cliente = await clienteService.login(cpf, senha);
            res.status(200).json(cliente);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new ClienteController();