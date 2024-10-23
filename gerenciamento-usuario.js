// Função para alternar entre as abas
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Esconder todas as abas
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none"; // Esconde todo o conteúdo das abas
    }

    // Remover a classe "active" de todos os botões de abas
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active"); // Remove a classe "active" de todas as abas
    }

    // Mostrar a aba clicada
    document.getElementById(tabName).style.display = "block"; // Mostra o conteúdo da aba clicada
    evt.currentTarget.classList.add("active"); // Adiciona a classe "active" ao botão clicado
}

// Função para cadastrar um novo usuário
document.getElementById('form-cadastro').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;

    // Adicionar o novo usuário à tabela
    const tabela = document.getElementById('tabela-usuarios');
    const row = `
        <tr>
            <td>${Math.floor(Math.random() * 1000)}</td>
            <td>${nome}</td>
            <td>${email}</td>
            <td>${telefone}</td>
            <td>
                <button class="btn-edit" onclick="editarUsuario(this)">Editar</button>
                <button class="btn-delete" onclick="excluirUsuario(this)">Excluir</button>
            </td>
        </tr>
    `;
    tabela.innerHTML += row;

    // Limpar o formulário após o cadastro
    this.reset();
});

// Função para excluir um usuário
function excluirUsuario(button) {
    if (confirm("Deseja realmente excluir este usuário?")) {
        const row = button.parentElement.parentElement;
        row.remove();
        alert("Usuário excluído com sucesso!");
    }
}

// Função para editar um usuário
function editarUsuario(button) {
    const row = button.parentElement.parentElement;
    const nome = row.querySelector('td:nth-child(2)').textContent;
    const email = row.querySelector('td:nth-child(3)').textContent;
    const telefone = row.querySelector('td:nth-child(4)').textContent;

    // Preencher o formulário de cadastro com os dados do usuário para edição
    document.getElementById('nome').value = nome;
    document.getElementById('email').value = email;
    document.getElementById('telefone').value = telefone;

    // Excluir a linha atual (o usuário será atualizado ao submeter o formulário novamente)
    row.remove();
}

// Função para buscar usuários
document.getElementById('search-usuarios').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const tabela = document.getElementById('tabela-usuarios').querySelectorAll('tr');

    tabela.forEach(row => {
        const nome = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        const email = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
        const telefone = row.querySelector('td:nth-child(4)').textContent.toLowerCase();

        if (nome.includes(searchTerm) || email.includes(searchTerm) || telefone.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});
