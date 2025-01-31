document.addEventListener('DOMContentLoaded', function () {
    const clienteDropdown = document.getElementById('clienteDropdown');
    const dropdownNome = document.getElementById('dropdownNome');
    const dropdownCpf = document.getElementById('dropdownCpf');
    const dropdownTelefone = document.getElementById('dropdownTelefone');
    const logoutButton = document.getElementById('logoutButton'); // Corrigido: use logoutButton
    const cadastroButton = document.getElementById('cadastroButton');
    const loginButton = document.getElementById('loginButton');
    const cadastroLoginButtons = document.getElementById('cadastroLoginButtons');

    // Verifica se o cliente está logado
    const cliente = JSON.parse(localStorage.getItem('cliente'));

    if (cliente) {
        // Exibe o dropdown do cliente e preenche os dados
        clienteDropdown.classList.remove('d-none');
        dropdownNome.textContent = cliente.nome;
        dropdownCpf.textContent = cliente.cpf;
        dropdownTelefone.textContent = cliente.telefone;

        // Esconde os botões de cadastro/login
        if (cadastroButton) cadastroButton.classList.add('d-none');
        if (loginButton) loginButton.classList.add('d-none');
    }

    // Adiciona evento de logout
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            // Remove os dados do cliente do localStorage
            localStorage.removeItem('cliente');

            // Esconde o dropdown do cliente
            if (clienteDropdown) clienteDropdown.classList.add('d-none');

            // Exibe os botões de cadastro/login
            if (cadastroLoginButtons) cadastroLoginButtons.classList.remove('d-none');

            // Redireciona para a página inicial
            window.location.href = '../Front-end/index.html';
        });
    }
});