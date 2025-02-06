const equipamentoService = require('../services/EquipamentoService.js');

class EquipamentoController {
  getAll(req, res) {
    equipamentoService.getAll((error, results) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(results);
      }
    });
  }

  get(req, res) {
    const id = req.params.id; // Pega o ID da URL
    equipamentoService.get(id, (error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(result);
      }
    });
  }

  async cadastrarEquipamento(req,res){
    const {nome, cnpj_fornecedor, quantidade, descricao, valor_diaria, url_imagem} = req.body;
    try{
      await equipamentoService.cadastrarEquipamento({nome, cnpj_fornecedor, quantidade, descricao, valor_diaria, url_imagem});
      res.status(201).json({message: 'Equipamento cadastrado com sucesso!'});
    } catch (error){
      res.status(400).json({message: error.message});
    }
  }


}

// Exportar uma instância da classe
module.exports = new EquipamentoController();