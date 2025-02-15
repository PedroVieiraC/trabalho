// Ajusta a altura do textarea automaticamente
document.addEventListener("DOMContentLoaded", function () {
  const descricaoEquipamento = document.getElementById("descricaoEquipamento");
  if (descricaoEquipamento) {
    descricaoEquipamento.addEventListener("input", function () {
      this.style.height = "auto"; // Reseta a altura antes de recalcular
      this.style.height = this.scrollHeight + "px"; // Ajusta a altura conforme o conteúdo
    });
  }
  carregarEquipamentos();
});

// Variável global para armazenar o estado atual (adicionar, atualizar ou remover)
let estadoBotao = "adicionar";

// Função para limpar (resetar) o formulário de equipamento
function clearEquipamentoForm() {
  const form = document.getElementById("equipamentoForm");
  if (form) {
    form.reset();
  }
}

// Função para habilitar ou desabilitar os campos do formulário
function setFormDisabled(disabled) {
  const campos = [
    "Quantidade",
    "nomeEquipamento",
    "descricaoEquipamento",
    "valorDiariaEquipamento",
    "urlImagemEquipamento"
  ];

  campos.forEach(id => {
    const elemento = document.getElementById(id);
    if (elemento) {
      elemento.disabled = disabled;
    }
  });

  // O CNPJ do fornecedor deve sempre ser desabilitado no modo remover
  const cnpjFornecedor = document.getElementById("cnpjFornecedorc");
  if (cnpjFornecedor) {
    cnpjFornecedor.disabled = disabled || estadoBotao === "remover";
  }
}

// Função para mudar o estado da tela (adicionar, atualizar ou remover)
// Ao trocar de estado, o formulário é limpo para evitar dados residuais
function mudarEstado(acao) {
  clearEquipamentoForm(); // Limpa os dados do formulário ao trocar de estado

  const titulo = document.getElementById("tituloPrincipal");
  const descricao = document.getElementById("descricaoPrincipal");
  const botaoAcao = document.getElementById("btnAcao");
  const dropdownContainer = document.getElementById("equipamentoDropdownContainer");

  estadoBotao = acao; // Atualiza o estado global

  switch (acao) {
    case 'adicionar':
      titulo.innerText = "Adicionar Equipamento";
      descricao.innerText = "Preencha os dados do equipamento";
      botaoAcao.innerText = "Salvar";
      botaoAcao.className = "btn btn-primary w-100";
      dropdownContainer.style.display = "none"; // Oculta o dropdown
      setFormDisabled(false); // Habilita os campos para edição
      break;
    case 'atualizar':
      titulo.innerText = "Atualizar Equipamento";
      descricao.innerText = "Modifique os dados do equipamento";
      botaoAcao.innerText = "Atualizar";
      botaoAcao.className = "btn btn-warning w-100";
      dropdownContainer.style.display = "block"; // Exibe o dropdown
      setFormDisabled(false); // Habilita os campos para edição
      break;
    case 'remover':
      titulo.innerText = "remover Equipamento";
      descricao.innerText = "Selecione o equipamento a ser removido";
      botaoAcao.innerText = "remover";
      botaoAcao.className = "btn btn-danger w-100";
      dropdownContainer.style.display = "block"; // Exibe o dropdown para seleção
      setFormDisabled(true); // Desabilita os campos de edição
      break;
  }
}

// Função para mudar o estado dos Clientes
function mudarEstadoCliente(acao) {
  const titulo = document.getElementById("tituloPrincipalCliente");
  const descricao = document.getElementById("descricaoPrincipalCliente");
  const botaoAcao = document.getElementById("btnAcaoCliente");

  switch (acao) {
    case 'atualizar':
      titulo.innerText = "Atualizar Cliente";
      descricao.innerText = "Modifique os dados do cliente";
      botaoAcao.innerText = "Atualizar";
      botaoAcao.className = "btn btn-warning w-100";
      break;
    case 'remover':
      titulo.innerText = "Remover Cliente";
      descricao.innerText = "Informe o CPF do cliente a ser removido";
      botaoAcao.innerText = "Remover";
      botaoAcao.className = "btn btn-danger w-100";
      break;
  }
}

// Função para mudar o estado dos Fornecedores
function mudarEstadoFornecedor(acao) {
  const titulo = document.getElementById("tituloPrincipalFornecedor");
  const descricao = document.getElementById("descricaoPrincipalFornecedor");
  const botaoAcao = document.getElementById("btnAcaoFornecedor");

  switch (acao) {
    case 'adicionar':
      titulo.innerText = "Adicionar Fornecedor";
      descricao.innerText = "Preencha os dados do fornecedor";
      botaoAcao.innerText = "Salvar";
      botaoAcao.className = "btn btn-primary w-100";
      break;
    case 'atualizar':
      titulo.innerText = "Atualizar Fornecedor";
      descricao.innerText = "Modifique os dados do fornecedor";
      botaoAcao.innerText = "Atualizar";
      botaoAcao.className = "btn btn-warning w-100";
      break;
    case 'remover':
      titulo.innerText = "remover Fornecedor";
      descricao.innerText = "Informe o CNPJ do fornecedor a ser removido";
      botaoAcao.innerText = "remover";
      botaoAcao.className = "btn btn-danger w-100";
      break;
  }
}

// Função para mudar o estado dos Aluguéis
function mudarEstadoAluguel(acao) {
  const titulo = document.getElementById("tituloPrincipalAluguel");
  const descricao = document.getElementById("descricaoPrincipalAluguel");
  const botaoAcao = document.getElementById("btnAcaoAluguel");

  switch (acao) {
    case 'atualizar':
      titulo.innerText = "Atualizar Aluguel";
      descricao.innerText = "Modifique os dados do aluguel";
      botaoAcao.innerText = "Atualizar";
      botaoAcao.className = "btn btn-warning w-100";
      break;
    case 'remover':
      titulo.innerText = "remover Aluguel";
      descricao.innerText = "Informe o ID do aluguel a ser removido";
      botaoAcao.innerText = "remover";
      botaoAcao.className = "btn btn-danger w-100";
      break;
  }
}

// Event listener para o formulário de Equipamento (único para as três operações)
document.getElementById("equipamentoForm").addEventListener("submit", async function (event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Coleta os dados do formulário
  const equipamento = {
    cnpj_fornecedor: document.getElementById("cnpjFornecedorc").value,
    nome: document.getElementById("nomeEquipamento").value,
    descricao: document.getElementById("descricaoEquipamento").value,
    valor_diaria: parseFloat(document.getElementById("valorDiariaEquipamento").value),
    url_imagem: document.getElementById("urlImagemEquipamento").value,
    quantidade: document.getElementById("Quantidade").value
  };

  // Validação básica (ajuste conforme necessário)
  if (!equipamento.cnpj_fornecedor || !equipamento.nome || !equipamento.valor_diaria) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  let url = "http://localhost:3000/api/equipamento";
  let metodo = "POST";

  if (estadoBotao === "atualizar") {
    const equipamentoId = document.getElementById("equipamentoSelect").value;
    if (!equipamentoId) {
      alert("Selecione um equipamento para atualizar.");
      return;
    }
    url += `/${equipamentoId}`;
    metodo = "PUT";
  } else if (estadoBotao === "remover") {
    const equipamentoId = document.getElementById("equipamentoSelect").value;
    if (!equipamentoId) {
      alert("Selecione um equipamento para remover.");
      return;
    }
    url += `/${equipamentoId}`;
    metodo = "DELETE";
  } else {
    // Estado "adicionar" usa a rota de cadastro
    url += "/cadastrar";
    metodo = "POST";
  }

  try {
    const options = {
      method: metodo,
      headers: { "Content-Type": "application/json" }
    };
    // Para DELETE não enviamos body
    if (metodo !== "DELETE") {
      options.body = JSON.stringify(equipamento);
    }
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      if (estadoBotao === "remover") {
        alert("Equipamento removido com sucesso!");
      } else if (estadoBotao === "atualizar") {
        alert("Equipamento atualizado com sucesso!");
      } else {
        alert("Equipamento cadastrado com sucesso!");
      }
      // Limpa o formulário e atualiza a lista de equipamentos
      document.getElementById("equipamentoForm").reset();
      carregarEquipamentos();
      // Se os campos estavam desabilitados (modo remover), reabilite-os
      if (estadoBotao === "remover") {
        setFormDisabled(false);
      }
    } else {
      alert(`Erro: ${data.message}`);
    }
  } catch (error) {
    alert("Erro ao conectar com o servidor: " + error.message);
  }
});

// Função para carregar a lista de equipamentos no dropdown
function carregarEquipamentos() {
  fetch("http://localhost:3000/api/equipamento")
    .then(response => response.json())
    .then(data => {
      const select = document.getElementById("equipamentoSelect");
      select.innerHTML = '<option value="">Selecione um equipamento...</option>';
      data.forEach(equip => {
        const option = document.createElement("option");
        option.value = equip.id;
        option.textContent = `${equip.id} - ${equip.nome} (CNPJ: ${equip.cnpj_fornecedor})`;
        select.appendChild(option);
      });
    })
    .catch(error => console.error("Erro ao carregar equipamentos:", error));
}

// Ao selecionar um equipamento no dropdown, buscar seus detalhes (para atualizar ou visualizar)
document.getElementById("equipamentoSelect").addEventListener("change", function () {
  const equipamentoId = this.value;
  if (equipamentoId) {
    fetch(`http://localhost:3000/api/equipamento/${equipamentoId}`)
      .then(response => response.json())
      .then(data => {
        document.getElementById("Quantidade").value = data.quantidade;
        document.getElementById("cnpjFornecedorc").value = data.cnpj_fornecedor;
        document.getElementById("nomeEquipamento").value = data.nome;
        document.getElementById("descricaoEquipamento").value = data.descricao;
        document.getElementById("valorDiariaEquipamento").value = data.valor_diaria;
        document.getElementById("urlImagemEquipamento").value = data.url_imagem;
      })
      .catch(error => console.error("Erro ao buscar detalhes do equipamento:", error));
  }
});


/*********************/
/*    SEÇÃO CLIENTES */
/*********************/
let estadoCliente = "atualizar";

// Limpa os campos do formulário de cliente
function clearClienteForm() {
  const form = document.getElementById("clienteForm");
  if (form) {
    form.reset();
  }
}

// Habilita ou desabilita os campos do formulário de cliente (exceto o dropdown)
function setClienteFormDisabled(disabled) {
  const campos = [
    "cpfCliente",
    "nomeCliente",
    "cepCliente",
    "numeroCliente",
    "complementoCliente",
    "telefoneCliente",
    "senhaCliente"
  ];
  campos.forEach(id => {
    const elemento = document.getElementById(id);
    if (elemento) {
      elemento.disabled = disabled;
    }
  });
}

// Carrega os clientes e preenche o dropdown da seção Clientes
function carregarClientes() {
  fetch("http://localhost:3000/api/cliente")
    .then(response => response.json())
    .then(data => {
      const select = document.getElementById("clienteSelect");
      select.innerHTML = '<option value="">Selecione um cliente...</option>';
      data.forEach(cliente => {
        const option = document.createElement("option");
        option.value = cliente.cpf;
        option.textContent = `${cliente.cpf} - ${cliente.nome}`;
        select.appendChild(option);
      });
    })
    .catch(error => console.error("Erro ao carregar clientes:", error));
}

// Ao selecionar um cliente, busca seus dados e preenche o formulário
document.getElementById("clienteSelect").addEventListener("change", function () {
  const cpf = this.value;
  if (cpf) {
    fetch(`http://localhost:3000/api/cliente/${cpf}`)
      .then(response => response.json())
      .then(data => {
        document.getElementById("cpfCliente").value = data.cpf;
        document.getElementById("cpfAntigo").value = data.cpf;
        document.getElementById("nomeCliente").value = data.nome;
        document.getElementById("cepCliente").value = data.cep;
        document.getElementById("numeroCliente").value = data.numero;
        document.getElementById("complementoCliente").value = data.complemento;
        document.getElementById("telefoneCliente").value = data.telefone;
        document.getElementById("senhaCliente").value = data.senha;
      })
      .catch(error => console.error("Erro ao buscar detalhes do cliente:", error));
  } else {
    clearClienteForm();
  }
});

// Muda o estado (atualizar ou remover) na tela de clientes
function mudarEstadoCliente(acao) {
  const titulo = document.getElementById("tituloPrincipalCliente");
  const descricao = document.getElementById("descricaoPrincipalCliente");
  const botaoAcao = document.getElementById("btnAcaoCliente");
  const dropdownContainer = document.getElementById("clienteDropdownContainer");

  estadoCliente = acao;
  dropdownContainer.style.display = "block";

  if (acao === 'atualizar') {
    titulo.innerText = "Atualizar Cliente";
    descricao.innerText = "Selecione o cliente e modifique os dados";
    botaoAcao.innerText = "Atualizar";
    botaoAcao.className = "btn btn-warning w-100";
    setClienteFormDisabled(false);
    clearClienteForm();
    carregarClientes();
  } else if (acao === 'remover') {
    titulo.innerText = "Remover Cliente";
    descricao.innerText = "Selecione o cliente a ser removido";
    botaoAcao.innerText = "Remover";
    botaoAcao.className = "btn btn-danger w-100";
    setClienteFormDisabled(true);
    clearClienteForm();
    carregarClientes();
  }
}

// Envio do formulário de cliente
document.getElementById("btnAcaoCliente").addEventListener("click", async function (event) {
  event.preventDefault();
  
  if (estadoCliente === 'atualizar') {
    const cpfAntigo = document.getElementById("cpfAntigo").value;
    const cliente = {
      cpf: document.getElementById("cpfCliente").value.trim(),
      nome: document.getElementById("nomeCliente").value.trim(),
      cep: document.getElementById("cepCliente").value.trim(),
      numero: parseInt(document.getElementById("numeroCliente").value),
      complemento: document.getElementById("complementoCliente").value.trim(),
      telefone: document.getElementById("telefoneCliente").value.trim(),
      senha: document.getElementById("senhaCliente").value.trim()
    };

    if (!cliente.cpf || !cliente.nome || !cliente.cep || isNaN(cliente.numero) || !cliente.telefone || !cliente.senha) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const url = `http://localhost:3000/api/cliente/${cpfAntigo}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente)
      });
      const data = await response.json();

      if (response.ok) {
        alert("Cliente atualizado com sucesso!");
        clearClienteForm();
        carregarClientes();
      } else {
        alert(`Erro: ${data.message}`);
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor: " + error.message);
    }
    
  } else if (estadoCliente === 'remover') {
    const cpf = document.getElementById("clienteSelect").value;
    if (!cpf) {
      alert("Selecione um cliente para remover.");
      return;
    }

    try {
      const url = `http://localhost:3000/api/cliente/${cpf}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();

      if (response.ok) {
        alert("Cliente removido com sucesso!");
        clearClienteForm();
        carregarClientes();
      } else {
        alert(`Erro: ${data.message}`);
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor: " + error.message);
    }
  }
});


// FORNECEDORES

// Variável global para armazenar o estado atual (adicionar, atualizar ou remover)
let estadoFornecedor = "adicionar";

// Função para limpar (resetar) o formulário de fornecedor
function clearFornecedorForm() {
  document.getElementById("cnpjFornecedor").value = "";
  document.getElementById("nomeFantasia").value = "";
  document.getElementById("telefoneFornecedor").value = "";
  document.getElementById("emailFornecedor").value = "";
}

// Função para habilitar ou desabilitar os campos do formulário de fornecedor
function setFornecedorFormDisabled(disabled) {
  document.getElementById("cnpjFornecedor").disabled = disabled;
  document.getElementById("nomeFantasia").disabled = disabled;
  document.getElementById("telefoneFornecedor").disabled = disabled;
  document.getElementById("emailFornecedor").disabled = disabled;
}

// Função para carregar os fornecedores no dropdown
function carregarFornecedores() {
  fetch("http://localhost:3000/api/fornecedor")
    .then(response => response.json())
    .then(data => {
      const select = document.getElementById("fornecedorSelect");
      select.innerHTML = '<option value="">Selecione um fornecedor...</option>';
      data.forEach(fornecedor => {
        const option = document.createElement("option");
        option.value = fornecedor.cnpj;
        // Utiliza a propriedade nome_fantasia do JSON para exibir, mas observe que ao enviar,
        // o objeto deverá conter a propriedade "nomeFantasia"
        option.textContent = `${fornecedor.cnpj} - ${fornecedor.nome_fantasia}`;
        select.appendChild(option);
      });
    })
    .catch(error => console.error("Erro ao carregar fornecedores:", error));
}

// Ao selecionar um fornecedor no dropdown, busca seus dados e preenche o formulário
document.getElementById("fornecedorSelect").addEventListener("change", function () {
  const cnpj = this.value;
  if (cnpj) {
    fetch(`http://localhost:3000/api/fornecedor/${cnpj}`)
      .then(response => response.json())
      .then(data => {
        // Preenche os campos com os dados atuais do fornecedor
        document.getElementById("cnpjFornecedor").value = data.cnpj; // novo valor editável
        document.getElementById("cnpjAntigo").value = data.cnpj;     // armazena o valor original
        document.getElementById("nomeFantasia").value = data.nome_fantasia;
        document.getElementById("telefoneFornecedor").value = data.telefone;
        document.getElementById("emailFornecedor").value = data.email;
      })
      .catch(error => console.error("Erro ao buscar detalhes do fornecedor:", error));
  } else {
    clearFornecedorForm();
  }
});


// Função para mudar o estado (adicionar, atualizar ou remover)
function mudarEstadoFornecedor(acao) {
  estadoFornecedor = acao; // Atualiza o estado global

  const titulo = document.getElementById("tituloPrincipalFornecedor");
  const descricao = document.getElementById("descricaoPrincipalFornecedor");
  const botaoAcao = document.getElementById("btnAcaoFornecedor");
  const dropdownContainer = document.getElementById("fornecedorDropdownContainer");

  // Exibe o dropdown para atualizar e remover; oculta para adicionar
  if (acao === "atualizar" || acao === "remover") {
    dropdownContainer.style.display = "block";
    carregarFornecedores();
  } else {
    dropdownContainer.style.display = "none";
  }

  if (acao === "atualizar") {
    titulo.innerText = "Atualizar Fornecedor";
    descricao.innerText = "Selecione o fornecedor e modifique os dados";
    botaoAcao.innerText = "Atualizar";
    botaoAcao.className = "btn btn-warning w-100";
    setFornecedorFormDisabled(false); // Campos editáveis
    clearFornecedorForm();
  } else if (acao === "remover") {
    titulo.innerText = "Remover Fornecedor";
    descricao.innerText = "Selecione o fornecedor a ser removido";
    botaoAcao.innerText = "Remover";
    botaoAcao.className = "btn btn-danger w-100";
    setFornecedorFormDisabled(true); // Campos não editáveis
    clearFornecedorForm();
  } else if (acao === "adicionar") {
    titulo.innerText = "Adicionar Fornecedor";
    descricao.innerText = "Preencha os dados do fornecedor";
    botaoAcao.innerText = "Salvar";
    botaoAcao.className = "btn btn-primary w-100";
    dropdownContainer.style.display = "none";
    setFornecedorFormDisabled(false);
    clearFornecedorForm();
  }
}

// Event listener para o envio do formulário de fornecedor
document.getElementById("btnAcaoFornecedor").addEventListener("click", async function (event) {
  event.preventDefault();

  if (estadoFornecedor === "adicionar") {
    // Coleta os dados do formulário para cadastro
    const fornecedor = {
      cnpj: document.getElementById("cnpjFornecedor").value.trim(),
      // Envia a propriedade com o nome correto (nomeFantasia)
      nomeFantasia: document.getElementById("nomeFantasia").value.trim(),
      telefone: document.getElementById("telefoneFornecedor").value.trim(),
      email: document.getElementById("emailFornecedor").value.trim()
    };

    // Validação básica
    if (!fornecedor.cnpj || !fornecedor.nomeFantasia || !fornecedor.telefone || !fornecedor.email) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const url = "http://localhost:3000/api/fornecedor/cadastrar";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fornecedor)
      });
      const data = await response.json();

      if (response.ok) {
        alert("Fornecedor cadastrado com sucesso!");
        clearFornecedorForm();
      } else {
        alert(`Erro: ${data.message}`);
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor: " + error.message);
    }
  } else if (estadoFornecedor === "atualizar") {
    // No modo atualizar, usamos o valor do campo oculto "cnpjAntigo" para identificar o registro
    const cnpjAntigo = document.getElementById("cnpjAntigo").value;
    if (!cnpjAntigo) {
      alert("Selecione um fornecedor para atualizar.");
      return;
    }

    // Coleta os dados do formulário para atualização (novo valor pode ser diferente)
    const fornecedor = {
      cnpj: document.getElementById("cnpjFornecedor").value.trim(),
      nomeFantasia: document.getElementById("nomeFantasia").value.trim(),
      telefone: document.getElementById("telefoneFornecedor").value.trim(),
      email: document.getElementById("emailFornecedor").value.trim()
    };

    if (!fornecedor.cnpj || !fornecedor.nomeFantasia || !fornecedor.telefone || !fornecedor.email) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    // Usa o CNPJ antigo na URL para localizar o registro
    const url = `http://localhost:3000/api/fornecedor/${cnpjAntigo}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fornecedor)
      });
      const data = await response.json();

      if (response.ok) {
        alert("Fornecedor atualizado com sucesso!");
        clearFornecedorForm();
        carregarFornecedores();
      } else {
        alert(`Erro: ${data.message}`);
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor: " + error.message);
    }
  } else if (estadoFornecedor === "remover") {
    // No modo remover, o dropdown informa o CNPJ do fornecedor a ser removido
    const cnpjSelecionado = document.getElementById("fornecedorSelect").value;
    if (!cnpjSelecionado) {
      alert("Selecione um fornecedor para remover.");
      return;
    }

    const url = `http://localhost:3000/api/fornecedor/${cnpjSelecionado}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();

      if (response.ok) {
        alert("Fornecedor removido com sucesso!");
        clearFornecedorForm();
        carregarFornecedores();
      } else {
        alert(`Erro: ${data.message}`);
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor: " + error.message);
    }
  }
});

// Função para carregar clientes para a seção de pagamentos
function carregarClientesPagamentos() {
  fetch("http://localhost:3000/api/cliente")
    .then(response => response.json())
    .then(data => {
      const select = document.getElementById("clienteSelectPagamentos");
      select.innerHTML = '<option value="">Selecione um cliente...</option>';
      data.forEach(cliente => {
        const option = document.createElement("option");
        option.value = cliente.cpf;
        option.textContent = `${cliente.nome} - ${cliente.cpf}`;
        select.appendChild(option);
      });
    })
    .catch(error => console.error("Erro ao carregar clientes para pagamentos:", error));
}

// Função para carregar os aluguéis ativos de um cliente para pagamentos
function carregarAlugueisPagamentos(cpf) {
  if (!cpf) {
    alert("Selecione um cliente para carregar os aluguéis.");
    return;
  }
  fetch(`http://localhost:3000/api/alugueisAtivos/${cpf}`)
    .then(response => response.json())
    .then(data => {
      const select = document.getElementById("aluguelSelectPagamentos");
      select.innerHTML = '<option value="">Selecione um aluguel...</option>';
      data.forEach(aluguel => {
        const option = document.createElement("option");
        option.value = aluguel.id_aluguel;
        // Armazena a quantidade de parcelas (caso esteja disponível) no dataset
        option.dataset.qtdeParcelas = aluguel.qtde_parcelas || 3; 
        option.textContent = `ID: ${aluguel.id_aluguel} - Valor: R$${aluguel.valor}`;
        select.appendChild(option);
      });
    })
    .catch(error => console.error("Erro ao carregar aluguéis para pagamentos:", error));
}
/**********************/
/*   SEÇÃO PAGAMENTOS */
/**********************/

// Função para carregar clientes para a seção de pagamentos
function carregarClientesPagamentos() {
  fetch("http://localhost:3000/api/cliente")
    .then(response => response.json())
    .then(data => {
      const select = document.getElementById("clienteSelectPagamentos");
      select.innerHTML = '<option value="">Selecione um cliente...</option>';
      data.forEach(cliente => {
        const option = document.createElement("option");
        option.value = cliente.cpf;
        option.textContent = `${cliente.nome} - ${cliente.cpf}`;
        select.appendChild(option);
      });
    })
    .catch(error => console.error("Erro ao carregar clientes para pagamentos:", error));
}

// Função para carregar os aluguéis ativos de um cliente para pagamentos
function carregarAlugueisPagamentos(cpf) {
  if (!cpf) {
    alert("Selecione um cliente para carregar os aluguéis.");
    return;
  }
  fetch(`http://localhost:3000/api/alugueisAtivos/${cpf}`)
    .then(response => response.json())
    .then(data => {
      const select = document.getElementById("aluguelSelectPagamentos");
      select.innerHTML = '<option value="">Selecione um aluguel...</option>';
      data.forEach(aluguel => {
        const option = document.createElement("option");
        option.value = aluguel.id_aluguel;
        // Se disponível, armazena a quantidade de parcelas; caso contrário, usa 3 como padrão
        option.dataset.qtdeParcelas = aluguel.qtde_parcelas || 3;
        option.textContent = `ID: ${aluguel.id_aluguel} - Valor: R$${aluguel.valor}`;
        select.appendChild(option);
      });
    })
    .catch(error => console.error("Erro ao carregar aluguéis para pagamentos:", error));
}

// Ao selecionar um cliente na seção de pagamentos, carregar seus aluguéis
document.getElementById("clienteSelectPagamentos").addEventListener("change", function() {
  const cpf = this.value;
  if (cpf) {
    carregarAlugueisPagamentos(cpf);
  }
});

// Ao selecionar um aluguel, preencher o dropdown de parcelas
document.getElementById("aluguelSelectPagamentos").addEventListener("change", function() {
  const idAluguel = this.value;
  const parcelaSelect = document.getElementById("parcelaSelectPagamento");
  parcelaSelect.innerHTML = '<option value="">Selecione a parcela...</option>';
  if (idAluguel) {
    // Obtém a quantidade de parcelas a partir do dataset do option selecionado
    const qtdeParcelas = this.options[this.selectedIndex].dataset.qtdeParcelas || 3;
    for (let i = 1; i <= qtdeParcelas; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = `Parcela ${i}`;
      parcelaSelect.appendChild(option);
    }
  }
});

// Função para atualizar o pagamento
document.getElementById("btnAtualizarPagamento").addEventListener("click", async function(event) {
  event.preventDefault(); // Impede comportamento padrão
  const idAluguel = document.getElementById("aluguelSelectPagamentos").value;
  const parcelaNumero = document.getElementById("parcelaSelectPagamento").value;
  const status = document.getElementById("statusPagamento").value;
  
  if (!idAluguel || !parcelaNumero || !status) {
    alert("Preencha os campos obrigatórios (aluguel, parcela e status).");
    return;
  }
  
  try {
    const url = `http://localhost:3000/api/pagamento/${idAluguel}/${parcelaNumero}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    const data = await response.json();
    const feedback = document.getElementById("feedbackPagamento");
    // Cria um balão de mensagem usando classes Bootstrap Alert
    if (response.ok) {
      feedback.innerHTML = `<div class="alert alert-success" role="alert">Pagamento atualizado com sucesso!</div>`;
    } else {
      feedback.innerHTML = `<div class="alert alert-danger" role="alert">Erro: ${data.message}</div>`;
    }
  } catch (error) {
    document.getElementById("feedbackPagamento").innerHTML = `<div class="alert alert-danger" role="alert">Erro ao conectar com o servidor: ${error.message}</div>`;
  }
});

// Inicializa a seção de pagamentos ao carregar a página
window.addEventListener("load", function() {
  carregarClientesPagamentos();
});


/**********************/
/*   SEÇÃO ALUGUEIS   */
/**********************/

let estadoAluguel = "atualizar"; // ou "remover"
let listaAlugueisAtivos = [];

// Muda o estado da tela de aluguel (atualizar ou remover)
function mudarEstadoAluguel(acao) {
  estadoAluguel = acao;
  const titulo = document.getElementById("tituloPrincipalAluguel");
  const descricao = document.getElementById("descricaoPrincipalAluguel");
  const botaoAcao = document.getElementById("btnAcaoAluguel");
  const novaDataFim = document.getElementById("novaDataFim");

  if (acao === "atualizar") {
    titulo.innerText = "Atualizar Aluguel";
    descricao.innerText = "Selecione o aluguel ativo e altere a nova data final para estender o aluguel";
    botaoAcao.innerText = "Atualizar";
    botaoAcao.className = "btn btn-warning w-100";
    novaDataFim.disabled = false;
  } else if (acao === "remover") {
    titulo.innerText = "Remover Aluguel";
    descricao.innerText = "Selecione o aluguel ativo a ser removido";
    botaoAcao.innerText = "Remover";
    botaoAcao.className = "btn btn-danger w-100";
    novaDataFim.disabled = true;
  }
}

// Carrega os clientes no dropdown da seção Aluguéis
function carregarClientesAlugueis() {
  fetch("http://localhost:3000/api/cliente")
    .then(response => response.json())
    .then(data => {
      const select = document.getElementById("clienteSelectAlugueis");
      select.innerHTML = '<option value="">Selecione um cliente...</option>';
      data.forEach(cliente => {
        const option = document.createElement("option");
        option.value = cliente.cpf;
        option.textContent = `${cliente.nome} - ${cliente.cpf}`;
        select.appendChild(option);
      });
    })
    .catch(error => console.error("Erro ao carregar clientes:", error));
}

// Carrega os aluguéis ativos do cliente selecionado
function carregarAlugueisAtivos(cpf) {
  if (!cpf) {
    alert("Selecione um cliente para carregar os aluguéis ativos.");
    return;
  }
  fetch(`http://localhost:3000/api/alugueisAtivos/${cpf}`)
    .then(response => response.json())
    .then(data => {
      listaAlugueisAtivos = data;
      const select = document.getElementById("aluguelSelect");
      select.innerHTML = '<option value="">Selecione um aluguel...</option>';
      data.forEach(aluguel => {
        const option = document.createElement("option");
        option.value = aluguel.id_aluguel;
        option.textContent = `ID: ${aluguel.id_aluguel} - Valor: R$${aluguel.valor}`;
        option.dataset.valor = aluguel.valor;
        option.dataset.dataFim = aluguel.data_fim;
        select.appendChild(option);
      });
    })
    .catch(error => console.error("Erro ao carregar aluguéis ativos:", error));
}

// Ao selecionar um aluguel ativo, preenche os campos do formulário
document.getElementById("aluguelSelect").addEventListener("change", function () {
  const selectedOption = this.options[this.selectedIndex];
  if (!selectedOption.value) return;
  
  document.getElementById("idAluguel").value = selectedOption.value;
  document.getElementById("valorAluguel").value = selectedOption.dataset.valor;
  
  let dataFim = selectedOption.dataset.dataFim;
  if (dataFim) {
    dataFim = dataFim.split("T")[0];
  }
  document.getElementById("dataFimAtual").value = dataFim;
  
  // Preenche o CPF do cliente a partir do dropdown de clientes
  const cpfCliente = document.getElementById("clienteSelectAlugueis").value;
  document.getElementById("cpfClienteAluguel").value = cpfCliente;
});

// Evento para o envio do formulário de aluguel ativo
document.getElementById("aluguelForm").addEventListener("submit", async function (event) {
  event.preventDefault();
  
  const idAluguel = document.getElementById("idAluguel").value;
  if (!idAluguel) {
    alert("Selecione um aluguel ativo.");
    return;
  }
  
  if (estadoAluguel === "atualizar") {
    const novaDataFim = document.getElementById("novaDataFim").value;
    if (!novaDataFim) {
      alert("Informe a nova data final.");
      return;
    }
    
    try {
      let url = `http://localhost:3000/api/alugueisAtivos/${idAluguel}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ novaDataFim })
      });
      const data = await response.json();
      if (response.ok) {
        alert("Aluguel atualizado com sucesso!");
        // Atualiza o dropdown de aluguéis ativos para refletir a alteração
        const cpf = document.getElementById("clienteSelectAlugueis").value;
        carregarAlugueisAtivos(cpf);
      } else {
        alert(`Erro: ${data.message}`);
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor: " + error.message);
    }
  } else if (estadoAluguel === "remover") {
    try {
      let url = `http://localhost:3000/api/alugueisAtivos/${idAluguel}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();
      if (response.ok) {
        alert("Aluguel removido com sucesso!");
        const cpf = document.getElementById("clienteSelectAlugueis").value;
        carregarAlugueisAtivos(cpf);
      } else {
        alert(`Erro: ${data.message}`);
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor: " + error.message);
    }
  }
  return false;
});

// Inicializa os dropdowns ao carregar a página
window.addEventListener("load", () => {
  carregarClientesAlugueis();
  document.getElementById("clienteSelectAlugueis").addEventListener("change", function () {
    const cpf = this.value;
    carregarAlugueisAtivos(cpf);
  });
});

// Função assíncrona para carregar todos os relatórios
async function carregarRelatorios() {
  try {
    // 1. Cliente com maior valor em aluguéis
    const resClienteMaiorValor = await fetch('http://localhost:3000/api/relatorio/clienteMaiorValor');
    const clienteMaiorValorData = await resClienteMaiorValor.json();
    if (clienteMaiorValorData.length > 0) {
      const cliente = clienteMaiorValorData[0];
      document.getElementById('clienteMaiorValor').innerText =
        `CPF: ${cliente.cpf} - ${cliente.nome} (R$ ${cliente.total_aluguel})`;
    } else {
      document.getElementById('clienteMaiorValor').innerText = "Nenhum dado encontrado";
    }

    // 2. Cliente que já alugou todos os equipamentos
    const resClienteTodosEquipamentos = await fetch('http://localhost:3000/api/relatorio/clienteTodosEquipamentos');
    const clienteTodosEquipamentosData = await resClienteTodosEquipamentos.json();
    if (clienteTodosEquipamentosData.length > 0) {
      // Se houver mais de um, exibe todos separados por " / "
      const listaClientes = clienteTodosEquipamentosData
        .map(cliente => `CPF: ${cliente.cpf} - ${cliente.nome}`)
        .join(" / ");
      document.getElementById('clienteTodosEquipamentos').innerText = listaClientes;
    } else {
      document.getElementById('clienteTodosEquipamentos').innerText = "Nenhum dado encontrado";
    }

    // 3. Equipamento mais alugado
    const resEquipamentoMaisAlugado = await fetch('http://localhost:3000/api/relatorio/equipamentoMaisAlugado');
    const equipamentoMaisAlugadoData = await resEquipamentoMaisAlugado.json();
    if (equipamentoMaisAlugadoData.length > 0) {
      const equip = equipamentoMaisAlugadoData[0];
      document.getElementById('equipamentoMaisAlugado').innerText =
        `${equip.nome} (Total: ${equip.total_alugado} unidades)`;
    } else {
      document.getElementById('equipamentoMaisAlugado').innerText = "Nenhum dado encontrado";
    }

    // 4. Receita total por mês
    const resReceitaPorMes = await fetch('http://localhost:3000/api/relatorio/receitaPorMes');
    const receitaPorMesData = await resReceitaPorMes.json();
    const receitaPorMesBody = document.querySelector('#receitaPorMes tbody');
    receitaPorMesBody.innerHTML = "";
    if (receitaPorMesData.length > 0) {
      receitaPorMesData.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${item.mes}</td><td>R$ ${item.receita_total}</td>`;
        receitaPorMesBody.appendChild(tr);
      });
    } else {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td colspan="2">Nenhum dado encontrado</td>`;
      receitaPorMesBody.appendChild(tr);
    }

    // 5. Clientes com pagamentos atrasados
    const resClientesAtrasados = await fetch('http://localhost:3000/api/relatorio/clientesPagamentosAtrasados');
    const clientesAtrasadosData = await resClientesAtrasados.json();
    const listaClientesAtrasados = document.getElementById('clientesAtrasados');
    listaClientesAtrasados.innerHTML = "";
    if (clientesAtrasadosData.length > 0) {
      clientesAtrasadosData.forEach(cliente => {
        const li = document.createElement('li');
        li.className = "list-group-item";
        li.innerText = `CPF: ${cliente.cpf} - ${cliente.nome} (Atrasos: ${cliente.qtd_atrasados})`;
        listaClientesAtrasados.appendChild(li);
      });
    } else {
      const li = document.createElement('li');
      li.className = "list-group-item";
      li.innerText = "Nenhum dado encontrado";
      listaClientesAtrasados.appendChild(li);
    }

    // 6. Equipamentos com estoque abaixo da média
    const resEstoqueAbaixoMedia = await fetch('http://localhost:3000/api/relatorio/equipamentosEstoqueAbaixoMedia');
    const estoqueAbaixoMediaData = await resEstoqueAbaixoMedia.json();
    const listaEstoqueAbaixoMedia = document.getElementById('estoqueAbaixoMedia');
    listaEstoqueAbaixoMedia.innerHTML = "";
    if (estoqueAbaixoMediaData.length > 0) {
      estoqueAbaixoMediaData.forEach(equip => {
        const li = document.createElement('li');
        li.className = "list-group-item";
        li.innerText = `${equip.nome} (Estoque: ${equip.quantidade})`;
        listaEstoqueAbaixoMedia.appendChild(li);
      });
    } else {
      const li = document.createElement('li');
      li.className = "list-group-item";
      li.innerText = "Nenhum dado encontrado";
      listaEstoqueAbaixoMedia.appendChild(li);
    }
  } catch (error) {
    console.error("Erro ao carregar os relatórios:", error);
  }
}

// Chama a função de carregamento dos relatórios quando a página for carregada
window.onload = function() {
  carregarRelatorios();
  // ...outros carregamentos, se necessário
};
