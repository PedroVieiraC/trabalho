const equipamentoRepository = require('../repositories/EquipamentoRepository');

class EquipamentoService {
    getAll(callback) {
        equipamentoRepository.getAll(callback);
    }

    get(id, callback) {
        equipamentoRepository.get(id, callback);
    }

    async cadastrarEquipamento(equipamento) {
        const { id, nome, cnpj_fornecedor, quantidade, descricao, valor_diaria, url_imagem } = equipamento;

        // Verificar se o id já está cadastrado
        const idExistente = await equipamentoRepository.verificaridExistente(id);
        if (idExistente) {
            throw new Error('id já cadastrado.');
        }

        // Cadastrar o equipamento
        await equipamentoRepository.cadastrarEquipamento({ id, nome, cnpj_fornecedor, quantidade, descricao, valor_diaria, url_imagem });
    }
}

// Exporta uma instância da classe
module.exports = new EquipamentoService();