const { Client } = require('pg');

// Instância do cliente
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'trabalho',
  password: '7384',
  port: 5432,
});

// Função para conectar
const connect = () => {
  if (!client._connected) { // Verifica se já está conectado
    return client.connect();
  }
  return Promise.resolve(); // Se já estiver conectado, retorna uma promise resolvida
};

module.exports = { connect, client };
