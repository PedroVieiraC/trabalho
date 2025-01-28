const equipamentoService = require('../services/EquipamentosService.js');

class equipamentosController {
  getAll(req, res) {
    equipamentoService.getAll((error, result) => {
      if (error) {
        res.status(500).send(error);
      }
      else { res.send(results) }
    });
  }
}

/*const con = require('../config/db');

// Função para buscar todos os equipamentos
exports.getEquipamentos = (req, res) => {
  const query = 'SELECT * FROM equipamentos';  // Consulta para buscar todos os equipamentos

  con.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao buscar equipamentos");
    }
    res.json(result.rows);  // Retorna os equipamentos em formato JSON
  });
};

// Funções para adicionar, atualizar e deletar equipamentos
exports.addEquipamento = async (req, res) => {
  const { nome, descricao, valordiaria, url_imagem } = req.body;
  const query = `
    INSERT INTO equipamentos (nome, descricao, valordiaria, url_imagem) 
    VALUES ($1, $2, $3, $4)
  `;
  try {
    await con.query(query, [nome, descricao, valordiaria, url_imagem]);
    res.status(201).send({ message: 'Equipamento adicionado com sucesso!' });
  } catch (error) {
    res.status(500).send({ error: 'Erro ao adicionar equipamento.' });
  }
};

// Atualizar um equipamento
exports.updateEquipamento = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, valordiaria, url_imagem } = req.body;
  const query = `
    UPDATE equipamentos 
    SET nome = $1, descricao = $2, valordiaria = $3, url_imagem = $4 
    WHERE id = $5
  `;
  try {
    await con.query(query, [nome, descricao, valordiaria, url_imagem, id]);
    res.send({ message: 'Equipamento atualizado com sucesso!' });
  } catch (error) {
    res.status(500).send({ error: 'Erro ao atualizar equipamento.' });
  }
};

// Remover um equipamento
exports.deleteEquipamento = async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM equipamentos WHERE id = $1`;
  try {
    await con.query(query, [id]);
    res.send({ message: 'Equipamento removido com sucesso!' });
  } catch (error) {
    res.status(500).send({ error: 'Erro ao remover equipamento.' });
  }
};
*/