// Capturar elementos do DOM
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

// Adicionar evento ao formulário
searchForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevenir o envio do formulário

  // Obter o valor do campo de busca
  const searchTerm = searchInput.value.trim();

  if (searchTerm) {
    console.log("Você buscou por:", searchTerm);
    alert(`Você buscou por: ${searchTerm}`);
    // Aqui você pode adicionar lógica para buscar ou redirecionar com o termo
  } else {
    alert("Por favor, digite algo para buscar.");
  }
});

// Inicializa o vetor com zeros, assumindo o número de botões igual ao número de cards
const clicks = Array.from(document.querySelectorAll(".btn-alugar")).map(() => 0);

// Seleciona todos os botões "Alugar Agora"
const buttons = document.querySelectorAll(".btn-alugar");

// Adiciona o evento de clique a cada botão
buttons.forEach((button, index) => {
  button.addEventListener("click", (event) => {
    event.preventDefault(); // Evita comportamento padrão do link
    clicks[index]++; // Incrementa o contador no vetor
    console.log(`Botão ${index + 1} clicado. Total de cliques: ${clicks[index]}`);
  });
});
