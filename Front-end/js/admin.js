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
  