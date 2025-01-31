// cadastro.js

// Formatação do CPF (remove caracteres não numéricos e garante 11 dígitos)
document.getElementById('cpf').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
    if (value.length > 11) {
        value = value.slice(0, 11); // Limita a 11 dígitos
    }
    e.target.value = value;
});

// Formatação do CEP (remove caracteres não numéricos e garante 8 dígitos)
document.getElementById('cep').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
    if (value.length > 8) {
        value = value.slice(0, 8); // Limita a 8 dígitos
    }
    e.target.value = value;
});

// Validação do formulário
document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Coletar dados do formulário
    const cliente = {
        cpf: document.getElementById('cpf').value.replace(/\D/g, ''), // Garante apenas números
        nome: document.getElementById('fullName').value,
        cep: document.getElementById('cep').value.replace(/\D/g, ''), // Garante apenas números
        numero: parseInt(document.getElementById('number').value),
        complemento: document.getElementById('complemento').value,
        telefone: document.getElementById('telefone').value, // Corrija para o campo correto
        senha: document.getElementById('password').value
    };

    // Validação do CPF (11 dígitos)
    if (cliente.cpf.length !== 11) {
        alert('CPF deve conter exatamente 11 dígitos.');
        return;
    }

    // Validação do CEP (8 dígitos)
    if (cliente.cep.length !== 8) {
        alert('CEP deve conter exatamente 8 dígitos.');
        return;
    }

        // Validação do CEP (8 dígitos)
        if (cliente.numero.length === 0) {
            alert('Numero não preenchido.');
            return;
        }

    // Validação do CEP (8 dígitos)
    if (cliente.telefone.length !== 11) {
        alert('CEP deve conter exatamente 11 dígitos.');
        return;
    }

    try {

        console.log("Enviando para o servidor:", JSON.stringify(cliente, null, 2));


        console.log(cliente);

        // Enviar dados para a API
        const response = await fetch('http://localhost:3000/api/cliente/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            window.location.href = 'Login.html'; // Redirecionar para a tela de login
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Erro ao cadastrar cliente: ' + error.message);
    }
});