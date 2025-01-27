// Variável global para armazenar o carrinho
let carrinho = [];

// Função para adicionar item ao carrinho
function adicionarAoCarrinho(event) {
    const id = event.target.dataset.id;
    const nome = event.target.dataset.nome;
    const valordiaria = parseFloat(event.target.dataset.valordiaria);
    const imagem = event.target.dataset.imagem;

    // Verifica se o item já está no carrinho
    const itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        // Se já estiver no carrinho, aumenta a quantidade
        itemExistente.quantidade += 1;
    } else {
        // Caso contrário, adiciona um novo item ao carrinho com valor inicial de diarias
        carrinho.push({
            id,
            nome,
            valordiaria,
            imagem,
            quantidade: 1,
            diarias: 1  // Inicializa diarias com o valor padrão
        });
    }

    // Atualiza o carrinho
    atualizarCarrinho();
}


function atualizarCarrinho() {
    console.log("Carrinho Atualizado:", carrinho);  // Verifica o carrinho antes de atualizar a interface

    const carrinhoContainer = document.querySelector('#carrinhoItens');
    carrinhoContainer.innerHTML = ''; // Limpa o carrinho

    if (carrinho.length === 0) {
        const carrinhoVazioHTML = `
        <div class="text-center w-100">
          <p><strong>Carrinho Vazio</strong></p>
        </div>
      `;
        carrinhoContainer.innerHTML = carrinhoVazioHTML;
        return;
    }

    carrinho.forEach(item => {
        const itemHTML = `
        <div class="d-flex align-items-center p-3 border-bottom">
          <img src="${item.imagem}" alt="${item.nome}" class="rounded me-3" style="width: 80px; height: 80px; object-fit: cover;">
          <div class="flex-grow-1">
            <h5 class="mb-1">${item.nome}</h5>
            <p class="text-muted mb-0">Diária: R$ ${item.valordiaria.toFixed(2)}</p>
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
  
            <button class="btn btn-outline-danger btn-sm" onclick="removerItem(${item.id})">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
      `;
        carrinhoContainer.innerHTML += itemHTML;
    });

    atualizarTotal();
}



// Função para atualizar o total do carrinho
function atualizarTotal() {
    // Subtotal: considerando valor da diária, quantidade e número de diárias
    const subtotal = carrinho.reduce((total, item) => total + item.valordiaria * item.diarias * item.quantidade, 0);

    // Total: incluindo taxa de serviço e seguro
    const total = subtotal + 50 + 100; // Incluindo taxa de serviço e seguro

    // Atualiza a interface com os valores calculados
    document.querySelector('#subtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
    document.querySelector('#total').textContent = `R$ ${total.toFixed(2)}`;
}
function removerItem(id) {
    // Filtra e verifica os itens
    carrinho = carrinho.filter(item => {
        return String(item.id) !== String(id);  // Comparação de tipos
    });

    // Atualiza a interface do carrinho
    atualizarCarrinho();
}

// Função para alterar a quantidade de um item no carrinho
function alterarQuantidade(id, delta) {
    const item = carrinho.find(item => String(item.id) === String(id)); // Comparação corrigida
    if (item) {
        item.quantidade = Math.max(1, item.quantidade + delta); // Impede quantidade negativa
        atualizarCarrinho();  // Atualiza a visualização do carrinho
    }
}


function alterarDiarias(id, delta) {


    const item = carrinho.find(item => String(item.id) === String(id)); // Garantir comparação correta
    if (item) {

        item.diarias = Math.max(1, item.diarias + delta); // Impede diárias negativas
        atualizarCarrinho();  // Atualiza a visualização do carrinho
    }
}




// Função que inicializa o carrinho e adiciona os eventos aos botões
function inicializarCarrinho() {
    // Adiciona o evento de clique aos botões de "Alugar Agora"
    const botoesAlugar = document.querySelectorAll('.btn-alugar');
    botoesAlugar.forEach(botao => {
        botao.addEventListener('click', adicionarAoCarrinho);
    });
}

// Chama a função para inicializar o carrinho
inicializarCarrinho();
