document.addEventListener('DOMContentLoaded', function() {
    const formCadastrarAutor = document.getElementById('form-cadastrar-autor');

    formCadastrarAutor.addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const sobrenome = document.getElementById('sobrenome').value.trim();
        const nacionalidade = document.getElementById('nacionalidade').value.trim();

        if (!nome || !sobrenome || !nacionalidade) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const novoAutor = {
            id: Date.now().toString(),  // Usando o timestamp como ID único
            nome,
            sobrenome,
            nacionalidade
        };

        let autores = JSON.parse(localStorage.getItem('autores')) || [];
        autores.push(novoAutor);
        localStorage.setItem('autores', JSON.stringify(autores));

        alert('Autor cadastrado com sucesso!');
        formCadastrarAutor.reset();
    });
});
