document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-cadastro-livro');
    const inputId = document.getElementById('livro-id');
    const inputTitulo = document.getElementById('titulo');
    const inputAutor = document.getElementById('autor');
    const selectGenero = document.getElementById('genero');
    const inputAno = document.getElementById('ano');
    const inputISBN = document.getElementById('isbn');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if (!inputTitulo.value || !inputAutor.value || !selectGenero.value || !inputAno.value || !inputISBN.value) {
            alert('Por favor, preencha todos os campos requeridos.');
            return;
        }

        const livro = {
            id: inputId.value || Date.now().toString(),
            titulo: inputTitulo.value.trim(),
            autor: inputAutor.value.trim(),
            genero: selectGenero.value,
            ano: inputAno.value.trim(),
            isbn: inputISBN.value.trim()
        };

        let livros = JSON.parse(localStorage.getItem('livros')) || [];
        if (livro.id && livros.some(l => l.id === livro.id)) {
            // Atualiza livro existente
            livros = livros.map(l => l.id === livro.id ? livro : l);
        } else {
            // Adiciona novo livro
            livros.push(livro);
        }

        localStorage.setItem('livros', JSON.stringify(livros));
        alert('Livro salvo com sucesso!');
        form.reset();
        inputId.value = ''; // Limpar o campo ID após salvar
    });
});
