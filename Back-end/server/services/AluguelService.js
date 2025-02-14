const aluguelRepository = require('../repositories/AluguelRepository');

class AluguelService {
  async create(cpfCliente, equipamentos, /* total, */ parcelas) {
    // Cria o registro na tabela ALUGUEL (data_inicio e data_fim serão definidos pelo default)
    const novoAluguel = await aluguelRepository.create(cpfCliente, parcelas);
    
    // Para cada equipamento, registra o item na tabela ALUGUEISATIVOS
    for (let equipamento of equipamentos) {
      await aluguelRepository.adicionarEquipamento(novoAluguel.id, equipamento);
    }
    
    return novoAluguel;
  }
  
  get(cpfCliente, callback) {
    aluguelRepository.get(cpfCliente, callback);
  }
}

module.exports = new AluguelService();
