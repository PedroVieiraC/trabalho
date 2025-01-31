// login.js
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os valores dos inputs
    const cpf = document.getElementById('CPF').value; // Captura o valor bruto do CPF
    const senha = document.getElementById('password').value.trim();

    console.log("CPF:", cpf); // Depuração
    console.log("Senha:", senha); // Depuração

    // Verifica se o login é admin
    if (cpf === "admin" && senha === "admin") {
        console.log("Login admin detectado. Redirecionando..."); // Depuração
        window.location.href = "../html/Admin.html"; // Redireciona para a tela de admin
        return; // Interrompe a execução do restante do código
    }

    // Limpa o CPF (remove caracteres não numéricos) apenas se não for "admin"
    const cpfLimpo = cpf.replace(/\D/g, '');

    console.log("CPF Limpo:", cpfLimpo); // Depuração

    // Verifica se o CPF está vazio após a limpeza
    if (!cpfLimpo) {
        alert("CPF inválido. Por favor, insira um CPF válido.");
        return; // Interrompe a execução do código
    }

    console.log("Fazendo requisição ao backend..."); // Depuração

    try {
        // Envia os dados de login para o backend
        const response = await fetch('http://localhost:3000/api/cliente/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cpf: cpfLimpo, senha }) // Envia o CPF limpo
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Login bem-sucedido. Redirecionando..."); // Depuração
            // Salva os dados do cliente no localStorage
            localStorage.setItem('cliente', JSON.stringify(data));
            // Redireciona para a página inicial
            window.location.href = '../index.html';
        } else {
            console.log("Erro no login:", data.message); // Depuração
            alert(data.message || 'Erro ao fazer login.');
        }
    } catch (error) {
        console.log("Erro ao conectar ao servidor:", error.message); // Depuração
        alert('Erro ao conectar ao servidor: ' + error.message);
    }
});