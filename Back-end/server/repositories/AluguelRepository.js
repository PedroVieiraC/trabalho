const db = require('../config/db.js');

class AluguelRepository {
  get(cpfCliente, callback) {
    const sql = 'SELECT * FROM ALUGUEL WHERE CPF_CLIENTE = $1'; // Correto
    db.query(sql, [cpfCliente], (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result.rows); // Retorna todos os aluguéis do cliente
      }
    });
  }
}

module.exports = new AluguelRepository();