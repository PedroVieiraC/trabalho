const pagamentoRepository = require('../repositories/PagamentoRepository');

class PagamentoService {
  async create(idAluguel, qtdeParcelas, valorTotal, dataVencimentoInicial) {
    // Calcula o valor de cada parcela
    const valorParcela = parseFloat(valorTotal) / parseInt(qtdeParcelas, 10);
    const pagamentos = [];
    for (let i = 1; i <= qtdeParcelas; i++) {
      // Calcula a data de vencimento para cada parcela: incrementa 1 mês para cada parcela
      let dataVencimento = new Date(dataVencimentoInicial);
      dataVencimento.setMonth(dataVencimento.getMonth() + (i - 1));
      pagamentos.push({
        idAluguel,
        parcelaNumero: i,
        valorParcela,
        dataVencimento: dataVencimento.toISOString().split('T')[0],
        status: 'A PAGAR'
      });
    }
    const result = await pagamentoRepository.createMany(pagamentos);
    return result;
  }

  async getByClient(cpfCliente) {
    const result = await pagamentoRepository.getByClient(cpfCliente);
    return result;
  }

  async updateStatus(idAluguel, parcelaNumero, status) {
    const result = await pagamentoRepository.updateStatus(idAluguel, parcelaNumero, status);
    return result;
  }

  async remove(idAluguel, parcelaNumero) {
    const result = await pagamentoRepository.remove(idAluguel, parcelaNumero);
    return result;
  }
}

module.exports = new PagamentoService();
