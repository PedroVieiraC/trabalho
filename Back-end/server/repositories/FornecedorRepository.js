const db = require("../config/database"); // Conexão com o banco de dados

const FornecedorRepository = {
  async adicionarFornecedor(fornecedor) {
    const { cnpj, nomeFantasia, telefone, email } = fornecedor;
    const query = `INSERT INTO FORNECEDOR (CNPJ, NOME_FANTASIA, TELEFONE, EMAIL) VALUES ($1, $2, $3, $4)`;

    try {
      await db.query(query, [cnpj, nomeFantasia, telefone, email]);
      return { message: "Fornecedor cadastrado com sucesso!" };
    } catch (error) {
      throw new Error(`Erro ao adicionar fornecedor: ${error.message}`);
    }
  },

  async atualizarFornecedor(cnpj, fornecedor) {
    const { nomeFantasia, telefone, email } = fornecedor;
    const query = `UPDATE FORNECEDOR SET NOME_FANTASIA = $1, TELEFONE = $2, EMAIL = $3 WHERE CNPJ = $4`;

    try {
      const result = await db.query(query, [nomeFantasia, telefone, email, cnpj]);
      if (result.rowCount === 0) throw new Error("Fornecedor não encontrado.");
      return { message: "Fornecedor atualizado com sucesso!" };
    } catch (error) {
      throw new Error(`Erro ao atualizar fornecedor: ${error.message}`);
    }
  },

  async removerFornecedor(cnpj) {
    const query = `DELETE FROM FORNECEDOR WHERE CNPJ = $1`;

    try {
      const result = await db.query(query, [cnpj]);
      if (result.rowCount === 0) throw new Error("Fornecedor não encontrado.");
      return { message: "Fornecedor removido com sucesso!" };
    } catch (error) {
      throw new Error(`Erro ao remover fornecedor: ${error.message}`);
    }
  }
};

module.exports = FornecedorRepository;
