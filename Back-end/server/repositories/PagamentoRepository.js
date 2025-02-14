const db = require('../config/db.js');

class PagamentoRepository {
  async createMany(pagamentos) {
    try {
      await db.query('BEGIN');
      for (let pagamento of pagamentos) {
        const sql = `
          INSERT INTO PAGAMENTO (ID_ALUGUEL, PARCELA_NUMERO, VALOR_PARCELA, DATA_VENCIMENTO, STATUS)
          VALUES ($1, $2, $3, $4, $5)
        `;
        await db.query(sql, [
          pagamento.idAluguel,
          pagamento.parcelaNumero,
          pagamento.valorParcela,
          pagamento.dataVencimento,
          pagamento.status
        ]);
      }
      await db.query('COMMIT');
      return { message: 'Pagamentos criados com sucesso.' };
    } catch (error) {
      await db.query('ROLLBACK');
      console.error("Erro no PagamentoRepository.createMany:", error);
      throw error;
    }
  }

  async getByClient(cpfCliente) {
    try {
      const sql = `
        SELECT P.*, A.CPF_CLIENTE
        FROM PAGAMENTO P
        JOIN ALUGUEL A ON P.ID_ALUGUEL = A.ID
        WHERE A.CPF_CLIENTE = $1
        ORDER BY P.ID_ALUGUEL, P.PARCELA_NUMERO
      `;
      const result = await db.query(sql, [cpfCliente]);
      return result.rows;
    } catch (error) {
      console.error("Erro no PagamentoRepository.getByClient:", error);
      throw error;
    }
  }

  async updateStatus(idAluguel, parcelaNumero, status) {
    try {
      const sql = `
        UPDATE PAGAMENTO
        SET STATUS = $3
        WHERE ID_ALUGUEL = $1 AND PARCELA_NUMERO = $2
        RETURNING *
      `;
      const result = await db.query(sql, [idAluguel, parcelaNumero, status]);
      return result.rows[0];
    } catch (error) {
      console.error("Erro no PagamentoRepository.updateStatus:", error);
      throw error;
    }
  }

  async remove(idAluguel, parcelaNumero) {
    try {
      const sql = 'DELETE FROM PAGAMENTO WHERE ID_ALUGUEL = $1 AND PARCELA_NUMERO = $2';
      const result = await db.query(sql, [idAluguel, parcelaNumero]);
      return result;
    } catch (error) {
      console.error("Erro no PagamentoRepository.remove:", error);
      throw error;
    }
  }
}

module.exports = new PagamentoRepository();
