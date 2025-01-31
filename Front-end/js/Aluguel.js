const rentalItemsContainer = document.querySelector('.card-body.p-0');

// Função para buscar aluguéis ativos
async function listarAlugueisAtivos(cpfCliente) {
  try {
    const response = await fetch(`http://localhost:3000/api/alugueisAtivos/${cpfCliente}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const alugueisAtivos = await response.json();
    exibirAlugueisAtivos(alugueisAtivos); // Exibe os aluguéis ativos na interface
  } catch (error) {
    console.error('Erro ao buscar os aluguéis ativos:', error);
  }
}

// Função para exibir os aluguéis ativos na interface
function exibirAlugueisAtivos(alugueisAtivos) {
  rentalItemsContainer.innerHTML = ''; // Limpa o container antes de adicionar novos itens

  alugueisAtivos.forEach(aluguel => {
    const rentalItemHTML = `
      <div class="p-4 border-bottom">
        <div class="row align-items-center">
          <div class="col-md-2">
            <img src="${aluguel.url_imagem}" alt="${aluguel.nome}" class="rounded" style="width: 100%; height: 80px; object-fit: cover;">
          </div>
          <div class="col-md-4">
            <h5 class="mb-1">${aluguel.nome}</h5>
            <p class="text-muted mb-0">Quantidade: ${aluguel.quantidade}</p>
          </div>
          <div class="col-md-2">
            <small class="text-muted d-block">Início/fim</small>
            <span>${new Date(aluguel.data_inicio).toLocaleDateString()}</span>
            <span>${new Date(aluguel.data_fim).toLocaleDateString()}</span>
          </div>

          <div class="col-md-2">
            <small class="text-muted d-block">Valor</small>
            <span>R$ ${parseFloat(aluguel.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
          <div class="col-md-2">
            <span class="badge bg-success">Em andamento</span>
          </div>
        </div>
      </div>
    `;

    rentalItemsContainer.innerHTML += rentalItemHTML; // Adiciona o item ao container
  });
}


function getCpfClienteLogado() {
  let clienteString = localStorage.getItem("cliente");
  let clienteObjeto = JSON.parse(clienteString);
  return clienteObjeto.cpf;
}

function filtrarAlugueis() {
  const filtroStatus = document.getElementById('filtroStatus').value;
  const cpfCliente = getCpfClienteLogado();

  if (filtroStatus === 'todos') {
    const rentalItemsContainer = document.querySelector('.card-body.p-0');
    rentalItemsContainer.innerHTML = ''; // Limpa o container antes de adicionar novos itens  
    // Implemente a lógica para listar todos os aluguéis
    console.log('Listar todos os aluguéis');
    listarAlugueisAtivos(cpfCliente); // Lista aluguéis em andamento
  }
  if (filtroStatus === 'current') {
    rentalItemsContainer.innerHTML = ''; // Limpa o container antes de adicionar novos itens  
    console.log('Listar aluguéis ativos');
    listarAlugueisAtivos(cpfCliente); // Lista aluguéis em andamento
  }
  if (filtroStatus === 'end') {
    const rentalItemsContainer = document.querySelector('.card-body.p-0');
    rentalItemsContainer.innerHTML = ''; // Limpa o container antes de adicionar novos itens

    // Implemente a lógica para listar aluguéis finalizados
    console.log('Listar aluguéis finalizados');
  }
}

// Inicializa a listagem de aluguéis ativos
const cpfCliente = getCpfClienteLogado();
listarAlugueisAtivos(cpfCliente);