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
    "cnpjFornecedor",
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
// Estado atual da tela de clientes ("atualizar" ou "remover")
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

// Função para carregar os clientes do endpoint e preencher o dropdown
function carregarClientes() {
  fetch("http://localhost:3000/api/cliente")
    .then(response => response.json())
    .then(data => {
      const select = document.getElementById("clienteSelect");
      // Limpa as opções e adiciona uma opção padrão
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

// Ao selecionar um cliente no dropdown, busca seus dados e preenche o formulário
document.getElementById("clienteSelect").addEventListener("change", function () {
  const cpf = this.value;
  if (cpf) {
    fetch(`http://localhost:3000/api/cliente/${cpf}`)
      .then(response => response.json())
      .then(data => {
        // Preenche os campos com os dados atuais do cliente
        document.getElementById("cpfCliente").value = data.cpf;
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

// Função para mudar o estado (atualizar ou remover)
function mudarEstadoCliente(acao) {
  const titulo = document.getElementById("tituloPrincipalCliente");
  const descricao = document.getElementById("descricaoPrincipalCliente");
  const botaoAcao = document.getElementById("btnAcaoCliente");
  const dropdownContainer = document.getElementById("clienteDropdownContainer");

  estadoCliente = acao; // Atualiza o estado global

  // Exibe o dropdown em ambos os modos
  dropdownContainer.style.display = "block";

  if (acao === 'atualizar') {
    titulo.innerText = "Atualizar Cliente";
    descricao.innerText = "Selecione o cliente e modifique os dados";
    botaoAcao.innerText = "Atualizar";
    botaoAcao.className = "btn btn-warning w-100";
    setClienteFormDisabled(false); // Campos editáveis
    clearClienteForm();
    carregarClientes();
  } else if (acao === 'remover') {
    titulo.innerText = "Remover Cliente";
    descricao.innerText = "Selecione o cliente a ser removido";
    botaoAcao.innerText = "Remover";
    botaoAcao.className = "btn btn-danger w-100";
    setClienteFormDisabled(true); // Campos não editáveis
    clearClienteForm();
    carregarClientes();
  }
}

// Event listener para o envio do formulário de cliente
document.getElementById("btnAcaoCliente").addEventListener("click", async function (event) {
  event.preventDefault();
  if (estadoCliente === 'atualizar') {
    // Coleta os dados do formulário
    const cliente = {
      cpf: document.getElementById("cpfCliente").value.trim(),
      nome: document.getElementById("nomeCliente").value.trim(),
      cep: document.getElementById("cepCliente").value.trim(),
      numero: parseInt(document.getElementById("numeroCliente").value),
      complemento: document.getElementById("complementoCliente").value.trim(),
      telefone: document.getElementById("telefoneCliente").value.trim(),
      senha: document.getElementById("senhaCliente").value.trim()
    };

    console.log(cliente);

    // Validação básica (ajuste conforme necessário)
    if (!cliente.cpf || !cliente.nome || !cliente.cep || isNaN(cliente.numero) || !cliente.telefone || !cliente.senha) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    let url = `http://localhost:3000/api/cliente/${cliente.cpf}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente)
      });
      const data = await response.json();

      if (response.ok) {
        alert("Cliente atualizado com sucesso!");
        clearClienteForm();
      } else {
        alert(`Erro: ${data.message}`);
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor: " + error.message);
    }
  } else if (estadoCliente === 'remover') {
    // No modo remover, o dropdown informa o CPF do cliente
    const cpf = document.getElementById("clienteSelect").value;
    if (!cpf) {
      alert("Selecione um cliente para remover.");
      return;
    }

    let url = `http://localhost:3000/api/cliente/${cpf}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();

      if (response.ok) {
        alert("Cliente removido com sucesso!");
        clearClienteForm();
        carregarClientes(); // Atualiza a lista do dropdown
      } else {
        alert(`Erro: ${data.message}`);
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor: " + error.message);
    }
  }
});

// Ajusta a altura do textarea automaticamente
document.addEventListener("DOMContentLoaded", function () {
    carregarFornecedores(); // Carregar a lista de fornecedores ao carregar a página
});

// Função para mudar o estado dos Fornecedores
function mudarEstadoFornecedor(acao) {
    const titulo = document.getElementById("tituloPrincipalFornecedor");
    const descricao = document.getElementById("descricaoPrincipalFornecedor");
    const botaoAcao = document.getElementById("btnAcaoFornecedor");
    const fornecedorDropdownContainer = document.getElementById("fornecedorDropdownContainer");

    switch (acao) {
        case 'adicionar':
            titulo.innerText = "Adicionar Fornecedor";
            descricao.innerText = "Preencha os dados do fornecedor";
            botaoAcao.innerText = "Salvar";
            botaoAcao.className = "btn btn-primary w-100";
            fornecedorDropdownContainer.style.display = "none"; // Oculta o dropdown
            break;
        case 'atualizar':
            titulo.innerText = "Atualizar Fornecedor";
            descricao.innerText = "Modifique os dados do fornecedor";
            botaoAcao.innerText = "Atualizar";
            botaoAcao.className = "btn btn-warning w-100";
            fornecedorDropdownContainer.style.display = "block"; // Exibe o dropdown
            break;
        case 'remover':
            titulo.innerText = "Remover Fornecedor";
            descricao.innerText = "Informe o CNPJ do fornecedor a ser removido";
            botaoAcao.innerText = "Remover";
            botaoAcao.className = "btn btn-danger w-100";
            fornecedorDropdownContainer.style.display = "block"; // Exibe o dropdown
            break;
    }
}
document.addEventListener("DOMContentLoaded", function () {
  const formFornecedor = document.getElementById("fornecedorForm");

  formFornecedor.addEventListener("submit", async function (event) {
      event.preventDefault();

      // Coleta os dados do formulário
      const cnpj = document.getElementById("cnpjFornecedor").value.trim();
      const nomeFantasia = document.getElementById("nomeFantasia").value.trim();
      const telefone = document.getElementById("telefoneFornecedor").value.trim();
      const email = document.getElementById("emailFornecedor").value.trim();

      // Validações
      if (!cnpj || !nomeFantasia || !telefone || !email) {
          alert("Preencha todos os campos obrigatórios.");
          return;
      }

      // Cria o objeto fornecedor
      const fornecedor = {
        cnpj,
        nomeFantasia, 
        telefone,
        email
    };
    

      try {
          console.log("Enviando dados:", fornecedor); // Log dos dados enviados

          const response = await fetch("http://localhost:3000/api/fornecedor", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(fornecedor)
          });

          console.log("Resposta do servidor:", response); // Log da resposta

          if (!response.ok) {
              const errorData = await response.json(); // Captura o corpo da resposta de erro
              console.error("Erro detalhado:", errorData); // Log do erro detalhado
              throw new Error("Erro ao cadastrar fornecedor");
          }

          const result = await response.json();
          alert("Fornecedor cadastrado com sucesso!");
          formFornecedor.reset(); // Limpa o formulário
      } catch (error) {
          console.error("Erro:", error);
          alert("Falha ao cadastrar fornecedor.");
      }
  });
});