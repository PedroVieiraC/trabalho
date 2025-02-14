const db = require('../config/db.js');

class AluguelRepository {
  // Cria um novo registro na tabela ALUGUEL
  async create(cpfCliente, parcelas) {
    try {
      const sql = `
        INSERT INTO ALUGUEL (CPF_CLIENTE, QTDE_PARCELAS)
        VALUES ($1, $2)
        RETURNING *
      `;
      const result = await db.query(sql, [cpfCliente, parcelas]);
      return result.rows[0];
    } catch (error) {
      console.error("Erro ao criar aluguel:", error);
      throw error;
    }
  }

  // Insere um equipamento na tabela ALUGUEISATIVOS
  async adicionarEquipamento(idAluguel, equipamento) {
    try {
      // Calcula o valor total do equipamento: valor_diaria * diarias * quantidade
      const valor = equipamento.valor_diaria * equipamento.diarias * equipamento.quantidade;
      const sql = `
        INSERT INTO ALUGUEISATIVOS (ID_ALUGUEL, ID_EQUIPAMENTO, QUANTIDADE, VALOR)
        VALUES ($1, $2, $3, $4)
      `;
      await db.query(sql, [idAluguel, equipamento.id, equipamento.quantidade, valor]);
    } catch (error) {
      console.error("Erro ao adicionar equipamento no aluguel ativo:", error);
      throw error;
    }
  }

  // Método já existente para recuperar aluguéis por CPF
  get(cpfCliente, callback) {
    const sql = 'SELECT * FROM ALUGUEL WHERE CPF_CLIENTE = $1';
    db.query(sql, [cpfCliente], (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result.rows);
      }
    });
  }
}

module.exports = new AluguelRepository();
