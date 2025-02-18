const db = require('../config/db.js');

class AluguelRepository {
  // Cria um novo registro na tabela ALUGUEL, agora recebendo também o parâmetro "dias"
  async create(cpfCliente, parcelas, dias) {
    try {
      const sql = `
        INSERT INTO ALUGUEL (CPF_CLIENTE, QTDE_PARCELAS, DATA_INICIO, DATA_FIM)
        VALUES ($1, $2, CURRENT_DATE, CURRENT_DATE + ($3 || ' days')::interval)
        RETURNING *
      `;
      const result = await db.query(sql, [cpfCliente, parcelas, dias]);
      return result.rows[0];
    } catch (error) {
      console.error("Erro ao criar aluguel:", error);
      throw error;
    }
  }

  // Insere um equipamento na tabela ALUGUEISATIVOS; o valor será calculado pelo trigger
  async adicionarEquipamento(idAluguel, equipamento) {
    try {
      const sql = `
        INSERT INTO ALUGUEISATIVOS (ID_ALUGUEL, ID_EQUIPAMENTO, QUANTIDADE, VALOR)
        VALUES ($1, $2, $3, NULL)
      `;
      await db.query(sql, [idAluguel, equipamento.id, equipamento.quantidade]);
    } catch (error) {
      console.error("Erro ao adicionar equipamento no aluguel ativo:", error);
      throw error;
    }
  }

  // Método para recuperar aluguéis por CPF
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
