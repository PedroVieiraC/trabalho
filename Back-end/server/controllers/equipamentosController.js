const con = require('../config/db');

exports.getEquipamentos = (req, res) => {
  const query = 'SELECT * FROM equipamentos';

  con.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao buscar equipamentos");
    }
    res.json(result.rows);
  });
};
