    document.addEventListener('DOMContentLoaded', function () {
        const clienteSection = document.getElementById('clienteSection');
        const clienteNome = document.getElementById('clienteNome');
        const clienteCpf = document.getElementById('clienteCpf');
        const clienteTelefone = document.getElementById('clienteTelefone');
        const logoutButtonNav = document.getElementById('logoutButtonNav');
        const cadastroButton = document.getElementById('cadastroButton');
        const loginButton = document.getElementById('loginButton');

        // Verifica se o cliente está logado
        const cliente = JSON.parse(localStorage.getItem('cliente'));

        if (cliente) {
            // Exibe a seção do cliente e os dados
            clienteSection.classList.remove('d-none');
            clienteNome.textContent = cliente.nome;
            clienteCpf.textContent = cliente.cpf;
            clienteTelefone.textContent = cliente.telefone;

            // Exibe o botão de deslogar e esconde os botões de cadastro/login
            logoutButtonNav.classList.remove('d-none');
            if (cadastroButton) cadastroButton.classList.add('d-none');
            if (loginButton) loginButton.classList.add('d-none');
        }

        // Adiciona evento de logout
        const logoutButtons = document.querySelectorAll('#logoutButton, #logoutButtonNav');
        logoutButtons.forEach(button => {
            button.addEventListener('click', function () {
                localStorage.removeItem('cliente');
                window.location.href = '../index.html';
            });
        });
    });