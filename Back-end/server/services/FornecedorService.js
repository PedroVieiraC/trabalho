const fornecedorRepository = require("../repositories/FornecedorRepository");

class FornecedorService  {
      getAll(callback) {
          fornecedorRepository.getAll(callback);
      }

  async adicionarFornecedor(fornecedor) {
    if (!fornecedor.cnpj || !fornecedor.nomeFantasia || !fornecedor.telefone || !fornecedor.email) {
      throw new Error("Todos os campos são obrigatórios.");
    }
    return await fornecedorRepository.adicionarFornecedor(fornecedor);
  }

  async atualizarFornecedor(cnpj, fornecedor) {
    if (!cnpj || !fornecedor.nomeFantasia || !fornecedor.telefone || !fornecedor.email) {
      throw new Error("Todos os campos são obrigatórios.");
    }
    return await fornecedorRepository.atualizarFornecedor(cnpj, fornecedor);
  }

  async removerFornecedor(cnpj) {
    if (!cnpj) {
      throw new Error("CNPJ é obrigatório.");
    }
    return await fornecedorRepository.removerFornecedor(cnpj);
  }
}

module.exports = new FornecedorService();
