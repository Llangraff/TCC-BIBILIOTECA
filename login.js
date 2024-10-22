const formLogin = document.getElementById('form-login');

formLogin.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Aqui você fará a validação das credenciais com a API
    // ...

    // Se as credenciais forem válidas, redirecione para a página principal
    // window.location.href = "dashboard.html";
});