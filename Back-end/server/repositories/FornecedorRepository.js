const db = require("../config/db"); // Conexão com o banco de dados

class FornecedorRepository {
  getAll(callback) {
    const sql = 'SELECT * FROM FORNECEDOR';
    db.query(sql, (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result.rows); // Retorna apenas as linhas (dados)
      }
    });
  }

  get(cnpj, callback) {
    const sql = 'SELECT * FROM FORNECEDOR WHERE cnpj = $1';
    db.query(sql, [cnpj], (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result.rows[0]); // Retorna apenas a primeira linha (dado único)
      }
    });
  }

  async adicionarFornecedor(fornecedor) {
    const { cnpj, nomeFantasia, telefone, email } = fornecedor;
    const query = `INSERT INTO FORNECEDOR (CNPJ, NOME_FANTASIA, TELEFONE, EMAIL) VALUES ($1, $2, $3, $4)`;

    try {
      await db.query(query, [cnpj, nomeFantasia, telefone, email]);
      return { message: "Fornecedor cadastrado com sucesso!" };
    } catch (error) {
      throw new Error(`Erro ao adicionar fornecedor: ${error.message}`);
    }
  }

  async atualizarFornecedor(cnpjAntigo, fornecedor) {
    const { cnpj: cnpjNovo, nomeFantasia, telefone, email } = fornecedor;
    const query = `
      UPDATE FORNECEDOR 
      SET cnpj = $1, nome_fantasia = $2, telefone = $3, email = $4 
      WHERE cnpj = $5;
    `;
    try {
      const result = await db.query(query, [cnpjNovo, nomeFantasia, telefone, email, cnpjAntigo]);
      if (result.rowCount === 0) throw new Error("Fornecedor não encontrado.");
      return { message: "Fornecedor atualizado com sucesso!" };
    } catch (error) {
      throw new Error(`Erro ao atualizar fornecedor: ${error.message}`);
    }
}


  async removerFornecedor(cnpj) {
    const query = `DELETE FROM FORNECEDOR WHERE CNPJ = $1`;

    try {
      const result = await db.query(query, [cnpj]);
      if (result.rowCount === 0) throw new Error("Fornecedor não encontrado.");
      return { message: "Fornecedor removcnpjo com sucesso!" };
    } catch (error) {
      throw new Error(`Erro ao remover fornecedor: ${error.message}`);
    }
  }
}

module.exports = new FornecedorRepository();
