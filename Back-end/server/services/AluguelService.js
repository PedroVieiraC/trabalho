const aluguelRepository = require('../repositories/AluguelRepository');

const criarAluguel = async (cpfCliente, equipamentos, valorSeguro) => {
  return await aluguelRepository.criarAluguel(cpfCliente, equipamentos, valorSeguro);
};

const listarAlugueis = async (cpfCliente) => {
  return await aluguelRepository.listarAlugueis(cpfCliente);
};

module.exports = {
  criarAluguel,
  listarAlugueis,
};