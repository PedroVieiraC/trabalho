const rentalItemsContainer = document.querySelector('.card-body.p-0');

// Função para buscar aluguéis ativos e retornar os dados
async function listarAlugueisAtivos(cpfCliente) {
  try {
    const response = await fetch(`http://localhost:3000/api/alugueisAtivos/${cpfCliente}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const alugueisAtivos = await response.json();
    // Adiciona o status "Em andamento" aos aluguéis ativos
    const alugueisAtivosComStatus = alugueisAtivos.map(aluguel => ({ ...aluguel, status: 'Em andamento' }));
    return alugueisAtivosComStatus; // Retorna os dados com status
  } catch (error) {
    console.error('Erro ao buscar os aluguéis ativos:', error);
    return []; // Retorna um array vazio em caso de erro
  }
}

// Função para buscar aluguéis encerrados e retornar os dados
async function listarAlugueisEncerrados(cpfCliente) {
  try {
    const response = await fetch(`http://localhost:3000/api/registrodeAlugueis/${cpfCliente}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const alugueisEncerrados = Array.isArray(data) ? data : data.data;
    // Adiciona o status "Finalizado" aos aluguéis encerrados
    const alugueisEncerradosComStatus = alugueisEncerrados.map(aluguel => ({ ...aluguel, status: 'Finalizado' }));
    return alugueisEncerradosComStatus; // Retorna os dados com status
  } catch (error) {
    console.error('Erro ao buscar os aluguéis encerrados:', error);
    return []; // Retorna um array vazio em caso de erro
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
            <span class="badge bg-success">${aluguel.status}</span>
          </div>
        </div>
      </div>
    `;

    rentalItemsContainer.innerHTML += rentalItemHTML; // Adiciona o item ao container
  });
}

// Função para exibir os aluguéis encerrados na interface
function exibirAlugueisEncerrados(alugueisEncerrados) {
  rentalItemsContainer.innerHTML = ''; // Limpa o container antes de adicionar novos itens

  alugueisEncerrados.forEach(aluguel => {
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
            <span class="badge bg-danger">${aluguel.status}</span>
          </div>
        </div>
      </div>
    `;

    rentalItemsContainer.innerHTML += rentalItemHTML; // Adiciona o item ao container
  });
}

// Função para exibir todos os aluguéis (ativos e encerrados)
function exibirTodos(alugueisAtivos, alugueisEncerrados) {
  rentalItemsContainer.innerHTML = ''; // Limpa o container antes de adicionar novos itens

  // Concatena os arrays de aluguéis ativos e encerrados
  const alugueisTotal = alugueisAtivos.concat(alugueisEncerrados);

  alugueisTotal.forEach(aluguel => {
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
            <span class="badge ${aluguel.status === 'Finalizado' ? 'bg-danger' : 'bg-success'}">${aluguel.status}</span>
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

async function filtrarAlugueis() {
  const filtroStatus = document.getElementById('filtroStatus').value;
  const cpfCliente = getCpfClienteLogado();

  if (filtroStatus === 'todos') {
    rentalItemsContainer.innerHTML = ''; // Limpa o container antes de adicionar novos itens
    // Busca aluguéis ativos e encerrados
    const alugueisAtivos = await listarAlugueisAtivos(cpfCliente);
    const alugueisEncerrados = await listarAlugueisEncerrados(cpfCliente);

    // Exibe todos os aluguéis
    exibirTodos(alugueisAtivos, alugueisEncerrados);
  } else if (filtroStatus === 'current') {
    rentalItemsContainer.innerHTML = ''; // Limpa o container antes de adicionar novos itens
    console.log('Listar aluguéis ativos');
    const alugueisAtivos = await listarAlugueisAtivos(cpfCliente);
    exibirAlugueisAtivos(alugueisAtivos); // Exibe apenas aluguéis ativos
  } else if (filtroStatus === 'end') {
    rentalItemsContainer.innerHTML = ''; // Limpa o container antes de adicionar novos itens
    console.log('Listar aluguéis finalizados');
    const alugueisEncerrados = await listarAlugueisEncerrados(cpfCliente);
    exibirAlugueisEncerrados(alugueisEncerrados); // Exibe apenas aluguéis encerrados
  }
}

// Inicializa a listagem de aluguéis ativos
const cpfCliente = getCpfClienteLogado();
filtrarAlugueis(); // Chama a função inicial para carregar os aluguéis ativos