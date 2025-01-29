const express = require('express');
const cors = require('cors');


const app = express();

// Configuração do CORS
app.use(cors()); // Permite todas as origens

// Middleware para interpretar JSON
app.use(express.json());

// Importa e usa as rotas
const routes = require('./routes');
app.use('/', routes);

// Inicia o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

