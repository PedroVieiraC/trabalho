async function listarAlugueis(cpfCliente) {
    try {
      const response = await fetch(`http://localhost:3000/api/aluguel/${cpfCliente}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const alugueis = await response.json();
      // Atualize a interface para exibir os aluguéis
      console.log(alugueis);
    } catch (error) {
      console.error('Erro ao buscar os aluguéis:', error);
    }
  }
  
  // Chame a função para listar os aluguéis do cliente logado
  listarAlugueis('12345678901'); // Substitua pelo CPF do cliente logado