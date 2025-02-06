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

    async update(id, equipamento) {
        // Verifica se o equipamento existe antes de atualizar
        const existe = await equipamentoRepository.verificaridExistente(id);
        if (!existe) {
            throw new Error("Equipamento não encontrado.");
        }
    
        return await equipamentoRepository.update(id, equipamento);
    }
    
    async delete(id) {
        return await equipamentoRepository.delete(id);
      }
      
}

// Exporta uma instância da classe
module.exports = new EquipamentoService();