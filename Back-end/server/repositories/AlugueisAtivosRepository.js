const db = require('../config/db.js');

class AlugueisAtivosRepository {
  get(cpfCliente, callback) {
    const sql = `
      SELECT AA.ID_EQUIPAMENTO, E.NOME, AA.QUANTIDADE, AA.VALOR,
             A.DATA_INICIO, A.DATA_FIM, E.URL_IMAGEM
      FROM ALUGUEISATIVOS AA
      JOIN ALUGUEL A ON AA.ID_ALUGUEL = A.ID
      JOIN EQUIPAMENTO E ON AA.ID_EQUIPAMENTO = E.ID
      WHERE A.CPF_CLIENTE = $1
    `;
    db.query(sql, [cpfCliente], (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result.rows);
      }
    });
  }

  async update(idAluguel, valor, data_fim, callback) {
    try {
      await db.query('BEGIN');

      // Atualiza o VALOR em ALUGUEISATIVOS para todas as linhas do aluguel
      const sql1 = `
        UPDATE ALUGUEISATIVOS
        SET VALOR = $1
        WHERE ID_ALUGUEL = $2
      `;
      await db.query(sql1, [valor, idAluguel]);

      // Atualiza a DATA_FIM na tabela ALUGUEL
      const sql2 = `
        UPDATE ALUGUEL
        SET DATA_FIM = $1
        WHERE ID = $2
      `;
      await db.query(sql2, [data_fim, idAluguel]);

      await db.query('COMMIT');
      callback(null, { message: "Aluguel ativo atualizado com sucesso!" });
    } catch (error) {
      await db.query('ROLLBACK');
      callback(error, null);
    }
  }

  remove(idAluguel, callback) {
    const sql = `
      DELETE FROM ALUGUEISATIVOS
      WHERE ID_ALUGUEL = $1
    `;
    db.query(sql, [idAluguel], (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  }
}

module.exports = new AlugueisAtivosRepository();
