const db = require('../config/db.js');

class RelatorioRepository {
  // 1. Cliente com maior valor em aluguéis
  getClienteMaiorValor(callback) {
    const sql = `
      SELECT C.CPF, C.NOME, SUM(RA.VALOR) AS total_aluguel
      FROM CLIENTE C
      JOIN ALUGUEL A ON C.CPF = A.CPF_CLIENTE
      JOIN REGISTRODEALUGUEIS RA ON A.ID = RA.ID_ALUGUEL
      GROUP BY C.CPF, C.NOME
      ORDER BY total_aluguel DESC
      LIMIT 1;
    `;
    db.query(sql, (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result.rows);
      }
    });
  }

  // 2. Cliente que já alugou todos os equipamentos
  getClienteTodosEquipamentos(callback) {
    const sql = `
      SELECT C.CPF, C.NOME
      FROM CLIENTE C
      JOIN ALUGUEL A ON C.CPF = A.CPF_CLIENTE
      JOIN REGISTRODEALUGUEIS RA ON A.ID = RA.ID_ALUGUEL
      GROUP BY C.CPF, C.NOME
      HAVING COUNT(DISTINCT RA.ID_EQUIPAMENTO) = (SELECT COUNT(*) FROM EQUIPAMENTO);
    `;
    db.query(sql, (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result.rows);
      }
    });
  }

  // 3. Equipamento mais alugado (por quantidade)
  getEquipamentoMaisAlugado(callback) {
    const sql = `
      SELECT E.ID, E.NOME, SUM(RA.QUANTIDADE) AS total_alugado
      FROM EQUIPAMENTO E
      JOIN REGISTRODEALUGUEIS RA ON E.ID = RA.ID_EQUIPAMENTO
      GROUP BY E.ID, E.NOME
      ORDER BY total_alugado DESC
      LIMIT 1;
    `;
    db.query(sql, (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result.rows);
      }
    });
  }

  // 4. Receita total de aluguéis por mês
  getReceitaPorMes(callback) {
    const sql = `
      SELECT TO_CHAR(DATE_TRUNC('month', A.DATA_INICIO), 'YYYY-MM') AS mes, SUM(RA.VALOR) AS receita_total
      FROM ALUGUEL A
      JOIN REGISTRODEALUGUEIS RA ON A.ID = RA.ID_ALUGUEL
      GROUP BY DATE_TRUNC('month', A.DATA_INICIO)
      ORDER BY mes;
    `;
    db.query(sql, (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result.rows);
      }
    });
  }

  // 5. Clientes com pagamentos atrasados
  getClientesPagamentosAtrasados(callback) {
    const sql = `
      SELECT C.CPF, C.NOME, COUNT(P.ID_ALUGUEL) AS qtd_atrasados
      FROM CLIENTE C
      JOIN ALUGUEL A ON C.CPF = A.CPF_CLIENTE
      JOIN PAGAMENTO P ON A.ID = P.ID_ALUGUEL
      WHERE P.STATUS = 'VENCIDO'
      GROUP BY C.CPF, C.NOME
      ORDER BY qtd_atrasados DESC;
    `;
    db.query(sql, (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result.rows);
      }
    });
  }

  // 6. Equipamentos com estoque abaixo da média
  getEquipamentosEstoqueAbaixoMedia(callback) {
    const sql = `
      SELECT E.ID, E.NOME, E.QUANTIDADE
      FROM EQUIPAMENTO E
      WHERE E.QUANTIDADE < (SELECT AVG(QUANTIDADE) FROM EQUIPAMENTO)
      ORDER BY E.QUANTIDADE ASC;
    `;
    db.query(sql, (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result.rows);
      }
    });
  }
}

module.exports = new RelatorioRepository();
