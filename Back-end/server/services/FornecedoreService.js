const FornecedorRepository = require("../repository/FornecedorRepository");

const FornecedorService = {
  async adicionarFornecedor(fornecedor) {
    if (!fornecedor.cnpj || !fornecedor.nomeFantasia || !fornecedor.telefone || !fornecedor.email) {
      throw new Error("Todos os campos são obrigatórios.");
    }
    return await FornecedorRepository.adicionarFornecedor(fornecedor);
  },

  async atualizarFornecedor(cnpj, fornecedor) {
    if (!cnpj || !fornecedor.nomeFantasia || !fornecedor.telefone || !fornecedor.email) {
      throw new Error("Todos os campos são obrigatórios.");
    }
    return await FornecedorRepository.atualizarFornecedor(cnpj, fornecedor);
  },

  async removerFornecedor(cnpj) {
    if (!cnpj) {
      throw new Error("CNPJ é obrigatório.");
    }
    return await FornecedorRepository.removerFornecedor(cnpj);
  }
};

module.exports = FornecedorService;
