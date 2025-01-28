const express = require('express');
const cors = require('cors');

const app = express();

const indexRoutes = require('./routes/index'); // Caminho correto para o arquivo de rotas

// Middleware para interpretar requisições com body JSON
app.use(express.json());

// Usar as rotas gerais
app.use('/', indexRoutes);


// Iniciar o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
