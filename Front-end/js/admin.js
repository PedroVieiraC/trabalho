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
  };