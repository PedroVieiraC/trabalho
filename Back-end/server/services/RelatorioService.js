const relatorioRepository = require('../repositories/RelatorioRepository');

class RelatorioService {
  getClienteMaiorValor(callback) {
    relatorioRepository.getClienteMaiorValor(callback);
  }

  getClienteTodosEquipamentos(callback) {
    relatorioRepository.getClienteTodosEquipamentos(callback);
  }

  getEquipamentoMaisAlugado(callback) {
    relatorioRepository.getEquipamentoMaisAlugado(callback);
  }

  getReceitaPorMes(callback) {
    relatorioRepository.getReceitaPorMes(callback);
  }

  getClientesPagamentosAtrasados(callback) {
    relatorioRepository.getClientesPagamentosAtrasados(callback);
  }

  getEquipamentosEstoqueAbaixoMedia(callback) {
    relatorioRepository.getEquipamentosEstoqueAbaixoMedia(callback);
  }

  getClientesAlugueisAtivos(callback) {
    relatorioRepository.getClientesAlugueisAtivos(callback);
  }
  
  
}

module.exports = new RelatorioService();
