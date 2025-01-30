// Função para buscar os equipamentos da API
async function getEquipamentos() {
  try {
    const response = await fetch('http://localhost:3000/equipamento');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const eqp = await response.json();
    // Após obter os dados, chama a função para gerar os cards
    gerarCards(eqp);
    console.log(eqp);
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  }
}

// Seleciona o container onde os cards serão inseridos
const container = document.querySelector('.cardG');

// Função para gerar os cards dinamicamente
function gerarCards(dados) {
  dados.forEach(equipamento => {
    // Verifique a URL da imagem no console
    console.log(equipamento.url_imagem);

    const cardHTML = `
    <div class="card p-1" style="width: 18rem; height: 26rem; overflow: hidden; border: 3px solid black;">
      <img src="${equipamento.url_imagem}" 
           class="card-img-top" alt="${equipamento.nome}" style="height: 180px; object-fit: cover; border: none;">
      <div class="card-body d-flex flex-column justify-content-between">
        <h5 class="card-title">${equipamento.nome}</h5>
        <p class="card-text">${equipamento.descricao}</p>
        <span class="badge bg-primary mb-2">Valor da diária</span>
        <h4 class="text-primary fw-bold">R$${parseFloat(equipamento.valor_diaria).toFixed(2)}</h4>
        <a href="#" class="btn btn-warning text-white fw-bold mt-auto btn-alugar" 
           data-id="${equipamento.id}" 
           data-nome="${equipamento.nome}" 
           data-valor_diaria="${equipamento.valor_diaria}" 
           data-imagem="${equipamento.url_imagem}">
           Alugar Agora
        </a>
      </div>
    </div>
  `;

    container.innerHTML += cardHTML; // Adiciona o card no container
  });

  // Adiciona evento de clique para cada botão "Alugar Agora"
  const botoesAlugar = document.querySelectorAll('.btn-alugar');
  botoesAlugar.forEach(botao => {
    botao.addEventListener('click', adicionarAoCarrinho);
  });
}

// Chama a função para buscar os equipamentos e gerar os cards
getEquipamentos();
