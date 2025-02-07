const fornecedorRepository = require("../repositories/FornecedorRepository");

class FornecedorService {
  getAll(callback) {
    fornecedorRepository.getAll(callback);
  }

  get(cnpj, callback) {
    fornecedorRepository.get(cnpj, callback);
  }

  async adicionarFornecedor(fornecedor) {
    if (!fornecedor.cnpj || !fornecedor.nomeFantasia || !fornecedor.telefone || !fornecedor.email) {
      throw new Error("Todos os campos são obrigatórios.");
    }
    return await fornecedorRepository.adicionarFornecedor(fornecedor);
  }

  async atualizarFornecedor(cnpjAntigo, fornecedor) {
    if (!cnpjAntigo || !fornecedor.cnpj || !fornecedor.nomeFantasia || !fornecedor.telefone || !fornecedor.email) {
      throw new Error("Todos os campos são obrigatórios.");
    }
    return await fornecedorRepository.atualizarFornecedor(cnpjAntigo, fornecedor);
}


  async removerFornecedor(cnpj) {
    if (!cnpj) {
      throw new Error("CNPJ é obrigatório.");
    }
    return await fornecedorRepository.removerFornecedor(cnpj);
  }
}

module.exports = new FornecedorService();
