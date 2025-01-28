const { Client } = require('pg');

const con = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: '7384',
  database: 'trabalho',
});

con.connect()
  .then(() => console.log("Banco de dados conectado"))
  .catch(err => console.error("Erro ao conectar ao banco:", err));

module.exports = con;
