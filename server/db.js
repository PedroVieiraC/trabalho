const { Client } = require('pg');

async function getClient() {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'trabalho',
    password: '7384',
    port: 5432,
  });
  return client;
};

// Chame a função para conectar
module.exports = {getClient};
