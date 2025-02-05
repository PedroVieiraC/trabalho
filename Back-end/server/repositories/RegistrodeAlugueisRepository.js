const db = require('../config/db.js');

class RegistrodeAlugueisRepository {
  get(cpfCliente, callback) {
    const sql = 'SELECT RA.ID_EQUIPAMENTO, E.NOME, RA.QUANTIDADE, RA.VALOR, A.DATA_INICIO, A.DATA_FIM, E.URL_IMAGEM FROM REGISTRODEALUGUEIS RA JOIN ALUGUEL A ON RA.ID_ALUGUEL = A.ID JOIN EQUIPAMENTO E ON RA.ID_EQUIPAMENTO = E.ID WHERE A.CPF_CLIENTE = $1'; // Correto
    db.query(sql, [cpfCliente], (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result.rows); // Retorna todos os aluguéis do cliente
      }
    });
  }
}

module.exports = new RegistrodeAlugueisRepository();

