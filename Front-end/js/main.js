// main.js
import { adicionarAoCarrinho, atualizarCarrinho, removerItem } from './carrinho.js';

// Aqui você pode orquestrar as chamadas, por exemplo, quando um item for adicionado ao carrinho
document.querySelector('.btn-alugar').addEventListener('click', () => {
  const item = { id: 1, nome: 'Equipamento X', valor: 100, quantidade: 1 };
  adicionarAoCarrinho(item);
});
