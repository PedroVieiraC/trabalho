// login.js
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os valores dos inputs
    const cpf = document.getElementById('CPF').value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const senha = document.getElementById('password').value.trim();

    try {
        // Envia os dados de login para o backend
        const response = await fetch('http://localhost:3000/api/cliente/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cpf, senha })
        });

        const data = await response.json();

        if (response.ok) {
            // Salva os dados do cliente no localStorage
            localStorage.setItem('cliente', JSON.stringify(data));
            // Redireciona para a página inicial
            window.location.href = '../Index.html';
        } else {
            alert(data.message || 'Erro ao fazer login.');
        }
    } catch (error) {
        alert('Erro ao conectar ao servidor: ' + error.message);
    }
});