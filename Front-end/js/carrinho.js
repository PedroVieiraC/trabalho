// Variável global para armazenar o carrinho
let carrinho = [];

// Função para adicionar item ao carrinho
function adicionarAoCarrinho(event) {
  const id = event.target.dataset.id;
  const nome = event.target.dataset.nome;
  const valor_diaria = parseFloat(event.target.dataset.valor_diaria);
  const imagem = event.target.dataset.imagem;

  // Verifica se o item já está no carrinho
  const itemExistente = carrinho.find(item => item.id === id);

  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    carrinho.push({
      id,
      nome,
      valor_diaria,
      imagem,
      quantidade: 1,
      diarias: 1,
    });
  }
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const carrinhoContainer = document.querySelector('#carrinhoItens');
  carrinhoContainer.innerHTML = '';

  if (carrinho.length === 0) {
    carrinhoContainer.innerHTML = '<div class="text-center w-100"><p><strong>Carrinho Vazio</strong></p></div>';
    return;
  }

  carrinho.forEach(item => {
    const itemHTML = `
        <div class="d-flex align-items-center p-3 border-bottom">
          <img src="${item.imagem}" alt="${item.nome}" class="rounded me-3" style="width: 80px; height: 80px; object-fit: cover;">
          <div class="flex-grow-1">
            <h5 class="mb-1">${item.nome}</h5>
            <p class="text-muted mb-0">Diária: R$ ${item.valor_diaria.toFixed(2)}</p>
          </div>
          <div class="d-flex align-items-center">
            <span class="me-2">Quantidade</span>
            <div class="input-group input-group-sm me-3" style="width: 100px;">
              <button class="btn btn-outline-secondary" type="button" onclick="alterarQuantidade(${item.id}, -1)">-</button>
              <input type="text" class="form-control text-center" value="${item.quantidade}" readonly>
              <button class="btn btn-outline-secondary" type="button" onclick="alterarQuantidade(${item.id}, 1)">+</button>
            </div>
            <span class="me-2">Diárias</span>
            <div class="input-group input-group-sm me-3" style="width: 100px;">
              <button class="btn btn-outline-secondary" type="button" onclick="alterarDiarias(${item.id}, -1)">-</button>
              <input type="text" class="form-control text-center" value="${item.diarias}" readonly>
              <button class="btn btn-outline-secondary" type="button" onclick="alterarDiarias(${item.id}, 1)">+</button>
            </div>
            <button class="btn btn-outline-danger btn-sm" onclick="removerItem(${item.id})">🗑️</button>
          </div>
        </div>`;
    carrinhoContainer.innerHTML += itemHTML;
  });

  atualizarTotal();
}

// Função para atualizar o total do carrinho (sem taxa de serviço e seguro)
function atualizarTotal() {
  const subtotal = carrinho.reduce((total, item) => total + item.valor_diaria * item.diarias * item.quantidade, 0);
  document.querySelector('#subtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
  document.querySelector('#total').textContent = `R$ ${subtotal.toFixed(2)}`;
}

function removerItem(id) {
  carrinho = carrinho.filter(item => String(item.id) !== String(id));
  atualizarCarrinho();
}

function alterarQuantidade(id, delta) {
  const item = carrinho.find(item => String(item.id) === String(id));
  if (item) {
    item.quantidade = Math.max(1, item.quantidade + delta);
    atualizarCarrinho();
  }
}

function alterarDiarias(id, delta) {
  const item = carrinho.find(item => String(item.id) === String(id));
  if (item) {
    item.diarias = Math.max(1, item.diarias + delta);
    atualizarCarrinho();
  }
}

// Função para finalizar aluguel e registrar pagamento
async function finalizarAluguel() {
  const cpfCliente = '12345678901'; // Substitua pelo CPF do cliente logado
  const parcelas = parseInt(document.querySelector('#parcelas').value);
  const total = carrinho.reduce((total, item) => total + item.valor_diaria * item.diarias * item.quantidade, 0);

  const equipamentos = carrinho.map(item => ({
    id: item.id,
    quantidade: item.quantidade,
    valor_diaria: item.valor_diaria,
    diarias: item.diarias,
  }));

  try {
    // Envia os dados para a API
    const response = await fetch('http://localhost:3000/api/aluguel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cpfCliente, equipamentos, total, parcelas }),
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    alert('Aluguel finalizado com sucesso!');

    carrinho = [];
    atualizarCarrinho();
  } catch (error) {
    console.error('Erro ao finalizar o aluguel:', error);
    alert('Erro ao finalizar o aluguel. Tente novamente.');
  }
}

// Adicionar evento ao botão "Finalizar Aluguel"
document.querySelector('.btn-primary').addEventListener('click', finalizarAluguel);
inicializarCarrinho();
