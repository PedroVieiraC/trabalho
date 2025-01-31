async function listarAlugueis(cpfCliente) {
  try {
    const response = await fetch(`http://localhost:3000/api/aluguel/${cpfCliente}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const alugueis = await response.json();
    console.log(alugueis);
  } catch (error) {
    console.error('Erro ao buscar os aluguéis:', error);
  }
}

listarAlugueis('22222222222'); // Substitua pelo CPF do cliente logado