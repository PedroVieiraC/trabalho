// server.js
const express = require('express');
const { Client } = require('pg');
const app = express();

app.get('/equipamentos', async (req, res) => {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'trabalho',
    password: '7384',
    port: 5432,
  });

  await client.connect();
  
  const eqp = await client.query('SELECT * FROM equipamentos');
  
  await client.end();
  
  res.json(eqp.rows); // Envia os dados como JSON para o front-end
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
