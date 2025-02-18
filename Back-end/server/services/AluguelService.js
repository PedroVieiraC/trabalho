const aluguelRepository = require('../repositories/AluguelRepository');

class AluguelService {
  async create(cpfCliente, equipamentos, parcelas) {
    // Assume-se que o período do aluguel seja definido pelo campo "diarias" do primeiro equipamento
    const dias = equipamentos.length > 0 ? equipamentos[0].diarias : 30;
    const novoAluguel = await aluguelRepository.create(cpfCliente, parcelas, dias);
    
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
