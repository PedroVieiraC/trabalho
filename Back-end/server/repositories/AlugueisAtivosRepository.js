const db = require('../config/db.js');

class AlugueisAtivosRepository {
  // Retorna os aluguéis ativos de um cliente.
  get(cpfCliente, callback) {
    const sql = `
      SELECT 
        A.ID AS id_aluguel, 
        AA.ID_EQUIPAMENTO, 
        E.NOME, 
        AA.QUANTIDADE, 
        AA.VALOR,
        A.DATA_INICIO, 
        A.DATA_FIM, 
        E.URL_IMAGEM,
        A.QTDE_PARCELAS AS qtde_parcelas
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

  // Atualiza um aluguel ativo: recalcula o novo valor com base na nova data final
  async update(idAluguel, novaDataFim, callback) {
    try {
      await db.query('BEGIN');

      // Recupera os dados atuais: DATA_INICIO, DATA_FIM e VALOR
      const result = await db.query(
        `SELECT A.DATA_INICIO, A.DATA_FIM, AA.VALOR 
         FROM ALUGUEL A 
         JOIN ALUGUEISATIVOS AA ON A.ID = AA.ID_ALUGUEL 
         WHERE A.ID = $1 LIMIT 1`,
         [idAluguel]
      );
      if (result.rows.length === 0) {
        throw new Error("Aluguel não encontrado.");
      }
      const { data_inicio, data_fim, valor } = result.rows[0];
      
      // Converte o valor para número
      const valorNum = parseFloat(valor);
      const dtInicio = new Date(data_inicio);
      const dtFimAntiga = new Date(data_fim);
      const dtNovaFim = new Date(novaDataFim);
      
      if (dtNovaFim <= dtFimAntiga) {
        throw new Error("A nova data final deve ser posterior à data final atual.");
      }
      
      // Calcula o total de dias do aluguel atual (de data_inicio até data_fim antiga)
      const totalDias = Math.ceil((dtFimAntiga - dtInicio) / (1000 * 60 * 60 * 24));
      // Calcula a quantidade de dias extras (entre a nova data final e a data final antiga)
      const extraDias = Math.ceil((dtNovaFim - dtFimAntiga) / (1000 * 60 * 60 * 24));
      // Calcula a diária
      const diaria = valorNum / totalDias;
      // Calcula o novo valor total do aluguel
      const novoValor = valorNum + (diaria * extraDias);
      
      // Atualiza o VALOR na tabela ALUGUEISATIVOS
      const sql1 = `UPDATE ALUGUEISATIVOS SET VALOR = $1 WHERE ID_ALUGUEL = $2`;
      await db.query(sql1, [novoValor, idAluguel]);
      
      // Atualiza a DATA_FIM na tabela ALUGUEL
      const sql2 = `UPDATE ALUGUEL SET DATA_FIM = $1 WHERE ID = $2`;
      await db.query(sql2, [novaDataFim, idAluguel]);
      
      await db.query('COMMIT');
      callback(null, { message: "Aluguel atualizado com sucesso!", novoValor });
    } catch (error) {
      await db.query('ROLLBACK');
      callback(error, null);
    }
  }

  // Remove um aluguel ativo (exclui registros de ALUGUEISATIVOS para o id do aluguel)
  remove(idAluguel, callback) {
    const sql = `DELETE FROM ALUGUEISATIVOS WHERE ID_ALUGUEL = $1`;
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
