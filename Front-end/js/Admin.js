document.addEventListener("DOMContentLoaded", function () {
  // Função para ajustar automaticamente a altura do textarea
  const descricaoEquipamento = document.getElementById("descricaoEquipamento");
  if (descricaoEquipamento) {
      descricaoEquipamento.addEventListener("input", function () {
          this.style.height = "auto"; // Reseta a altura antes de recalcular
          this.style.height = this.scrollHeight + "px"; // Ajusta a altura com base no conteúdo
      });
  }
});

// Funções para mudar o estado das telas
function mudarEstado(acao) {
  const titulo = document.getElementById("tituloPrincipal");
  const descricao = document.getElementById("descricaoPrincipal");
  const botaoAcao = document.getElementById("btnAcao");

  switch (acao) {
      case 'adicionar':
          titulo.innerText = "Adicionar Equipamento";
          descricao.innerText = "Preencha os dados do equipamento";
          botaoAcao.innerText = "Salvar";
          botaoAcao.classList.remove("btn-danger");
          botaoAcao.classList.add("btn-primary");
          break;
      case 'atualizar':
          titulo.innerText = "Atualizar Equipamento";
          descricao.innerText = "Modifique os dados do equipamento";
          botaoAcao.innerText = "Atualizar";
          botaoAcao.classList.remove("btn-danger");
          botaoAcao.classList.add("btn-warning");
          break;
      case 'deletar':
          titulo.innerText = "Deletar Equipamento";
          descricao.innerText = "Informe o ID do equipamento a ser deletado";
          botaoAcao.innerText = "Deletar";
          botaoAcao.classList.remove("btn-primary", "btn-warning");
          botaoAcao.classList.add("btn-danger");
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
          botaoAcao.classList.remove("btn-danger");
          botaoAcao.classList.add("btn-warning");
          break;
      case 'remover':
          titulo.innerText = "Remover Cliente";
          descricao.innerText = "Informe o CPF do cliente a ser removido";
          botaoAcao.innerText = "Remover";
          botaoAcao.classList.remove("btn-warning");
          botaoAcao.classList.add("btn-danger");
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
          botaoAcao.classList.remove("btn-danger");
          botaoAcao.classList.add("btn-primary");
          break;
      case 'atualizar':
          titulo.innerText = "Atualizar Fornecedor";
          descricao.innerText = "Modifique os dados do fornecedor";
          botaoAcao.innerText = "Atualizar";
          botaoAcao.classList.remove("btn-danger");
          botaoAcao.classList.add("btn-warning");
          break;
      case 'deletar':
          titulo.innerText = "Deletar Fornecedor";
          descricao.innerText = "Informe o CNPJ do fornecedor a ser deletado";
          botaoAcao.innerText = "Deletar";
          botaoAcao.classList.remove("btn-primary", "btn-warning");
          botaoAcao.classList.add("btn-danger");
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
          botaoAcao.classList.remove("btn-danger");
          botaoAcao.classList.add("btn-warning");
          break;
      case 'deletar':
          titulo.innerText = "Deletar Aluguel";
          descricao.innerText = "Informe o ID do aluguel a ser deletado";
          botaoAcao.innerText = "Deletar";
          botaoAcao.classList.remove("btn-warning");
          botaoAcao.classList.add("btn-danger");
          break;
  }
}

