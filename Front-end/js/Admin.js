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
  
  // Variável global para armazenar o estado atual (adicionar, atualizar ou deletar)
  let estadoBotao = "adicionar";
  
  // Função para habilitar ou desabilitar os campos do formulário
  function setFormDisabled(disabled) {
    const campos = ["Quantidade", "cnpjFornecedor", "nomeEquipamento", "descricaoEquipamento", "valorDiariaEquipamento", "urlImagemEquipamento"];
    campos.forEach(id => {
      const elemento = document.getElementById(id);
      if (elemento) {
        elemento.disabled = disabled;
      }
    });
  }
  
  // Funções para mudar o estado das telas
  function mudarEstado(acao) {
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
      case 'deletar':
        titulo.innerText = "Deletar Equipamento";
        descricao.innerText = "Selecione o equipamento a ser deletado";
        botaoAcao.innerText = "Deletar";
        botaoAcao.className = "btn btn-danger w-100";
        dropdownContainer.style.display = "block"; // Exibe o dropdown para seleção
        setFormDisabled(true); // Desabilita os campos de edição
        break;
    }
  }
  
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
      case 'deletar':
        titulo.innerText = "Deletar Fornecedor";
        descricao.innerText = "Informe o CNPJ do fornecedor a ser deletado";
        botaoAcao.innerText = "Deletar";
        botaoAcao.className = "btn btn-danger w-100";
        break;
    }
  }
  
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
      case 'deletar':
        titulo.innerText = "Deletar Aluguel";
        descricao.innerText = "Informe o ID do aluguel a ser deletado";
        botaoAcao.innerText = "Deletar";
        botaoAcao.className = "btn btn-danger w-100";
        break;
    }
  }
  
  // Event listener para o formulário de Equipamento (único para as três operações)
  document.getElementById("equipamentoForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário
  
    // Coleta os dados do formulário
    const equipamento = {
      cnpj_fornecedor: document.getElementById("cnpjFornecedor").value,
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
    } else if (estadoBotao === "deletar") {
      const equipamentoId = document.getElementById("equipamentoSelect").value;
      if (!equipamentoId) {
        alert("Selecione um equipamento para deletar.");
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
        if (estadoBotao === "deletar") {
          alert("Equipamento deletado com sucesso!");
        } else if (estadoBotao === "atualizar") {
          alert("Equipamento atualizado com sucesso!");
        } else {
          alert("Equipamento cadastrado com sucesso!");
        }
        document.getElementById("equipamentoForm").reset();
        carregarEquipamentos();
        // Se os campos estiverem desabilitados (delete), reabilita para evitar confusão
        if (estadoBotao === "deletar") {
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
          document.getElementById("cnpjFornecedor").value = data.cnpj_fornecedor;
          document.getElementById("nomeEquipamento").value = data.nome;
          document.getElementById("descricaoEquipamento").value = data.descricao;
          document.getElementById("valorDiariaEquipamento").value = data.valor_diaria;
          document.getElementById("urlImagemEquipamento").value = data.url_imagem;
        })
        .catch(error => console.error("Erro ao buscar detalhes do equipamento:", error));
    }
  });
  