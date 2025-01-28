const express = require('express');
const cors = require('cors');

const equipamentosRoutes = require('./routes/equipamentos');

const app = express();

app.use(express.json());
app.use(cors());

// Rotas
app.use('/equipamentos', equipamentosRoutes);

// Inicialização do servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
