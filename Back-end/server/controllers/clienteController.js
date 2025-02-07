const clienteService = require('../services/ClienteService');

class ClienteController {
    async getAll(req, res) {
        try {
            const clientes = await clienteService.getAll();
            res.json(clientes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

        get(req, res) {
          const cpf = req.params.cpf; 
          clienteService.get(cpf, (error, result) => {
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

    async update(req, res) {
        const cpfAntigo = req.params.cpf;  // valor antigo vindo da URL
        const { cpf: cpfNovo, nome, cep, numero, complemento, telefone, senha } = req.body; // novo valor no body
        if (!cpfNovo || !nome || !cep || !numero || !telefone || !senha) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }
        try {
            const clienteAtualizado = await clienteService.update(cpfAntigo, { cpf: cpfNovo, nome, cep, numero, complemento, telefone, senha });
            res.json({ message: "Cliente atualizado com sucesso!", cliente: clienteAtualizado });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    

    async delete(req, res) {
        const cpf = req.params.cpf;
        try {
            const clienteDeletado = await clienteService.delete(cpf);
            res.json({ message: "Cliente deletado com sucesso!", cliente: clienteDeletado });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new ClienteController();
