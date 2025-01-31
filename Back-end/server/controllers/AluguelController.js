const aluguelService = require('../services/AluguelService');

const criarAluguel = async (req, res) => {
  try {
    const { cpfCliente, equipamentos, valorSeguro } = req.body;
    const aluguel = await aluguelService.criarAluguel(cpfCliente, equipamentos, valorSeguro);
    res.status(201).json(aluguel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listarAlugueis = async (req, res) => {
  try {
    const { cpfCliente } = req.params;
    const alugueis = await aluguelService.listarAlugueis(cpfCliente);
    res.status(200).json(alugueis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  criarAluguel,
  listarAlugueis,
};