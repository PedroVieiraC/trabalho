document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os valores dos inputs
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Verifica se o login é admin
    if (email === "admin" && password === "admin") {
        window.location.href = "../html/Admin.html"; // Redireciona para a tela de admin
    }

});
