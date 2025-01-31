const db = require('../config/db.js');

class RegistrodeAlugueisRepository {
  get(cpfCliente, callback) {
    const sql = 'SELECT AA.ID_EQUIPAMENTO, E.NOME, AA.QUANTIDADE, AA.VALOR, A.DATA_INICIO, A.DATA_FIM, E.URL_IMAGEM FROM ALUGUEISATIVOS AA JOIN ALUGUEL A ON AA.ID_ALUGUEL = A.ID JOIN EQUIPAMENTO E ON A.ID = E.ID WHERE A.CPF_CLIENTE = $1'; // Correto
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
