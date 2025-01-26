const express = require('express');
const router = express.Router();
const db = require('../db');

// Exemplo de rota de cadastro de usuário
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await db.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
