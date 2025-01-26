// server.js
const express = require('express');
const app = express();
const { realizarConsulta, consultaDesejada } = require('./index');  // Importando a função de consulta

const PORT = 3000;

app.use(express.json());

// Rota para obter os dados conforme a variável de controle
app.get('/consultar', async (req, res) => {
    try {
        // Altera a consulta desejada conforme a query string ou outro critério
        const { tipo } = req.query;  // Exemplo: /consultar?tipo=fornecedores
        if (tipo) {
            consultaDesejada = tipo;
        }

        const dados = await realizarConsulta();
        if (dados) {
            res.json(dados);  // Retorna os dados da consulta
        } else {
            res.status(404).json({ error: 'Consulta não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao realizar consulta' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
