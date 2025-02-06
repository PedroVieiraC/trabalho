const equipamentoRepository = require('../repositories/EquipamentoRepository');

class EquipamentoService {
    getAll(callback) {
        equipamentoRepository.getAll(callback);
    }

    get(id, callback) {
        equipamentoRepository.get(id, callback);
    }

    async cadastrarEquipamento(equipamento) {
        const {nome, cnpj_fornecedor, quantidade, descricao, valor_diaria, url_imagem } = equipamento;

        // Cadastrar o equipamento
        await equipamentoRepository.cadastrarEquipamento({nome, cnpj_fornecedor, quantidade, descricao, valor_diaria, url_imagem });
    }
}

// Exporta uma instância da classe
module.exports = new EquipamentoService();