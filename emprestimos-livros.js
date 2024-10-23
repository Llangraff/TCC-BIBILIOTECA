// Função para alternar entre as abas
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Esconder todas as abas
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remover a classe "active" de todos os botões de abas
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Mostrar a aba atual e adicionar a classe "active" ao botão que foi clicado
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}

// Função para registrar um novo empréstimo
document.getElementById('form-emprestimo').addEventListener('submit', function(e) {
    e.preventDefault();

    const livro = document.getElementById('livro').value;
    const usuario = document.getElementById('usuario').value;
    const dataEmprestimo = document.getElementById('data-emprestimo').value;
    const dataDevolucao = document.getElementById('data-devolucao').value;

    // Adicionar o novo empréstimo à tabela
    const tabela = document.getElementById('tabela-emprestimos').querySelector('tbody');
    const row = `
        <tr>
            <td>${Math.floor(Math.random() * 1000)}</td>
            <td>${livro}</td>
            <td>${usuario}</td>
            <td>${dataEmprestimo}</td>
            <td>Ativo</td>
            <td>
                <button class="btn-devolver" onclick="devolverEmprestimo(this)">Devolver</button>
                <button class="btn-renovar" onclick="renovarEmprestimo(this)">Renovar</button>
            </td>
        </tr>
    `;
    tabela.innerHTML += row;

    // Limpar o formulário após o registro
    this.reset();
});

// Função para devolver o empréstimo
function devolverEmprestimo(button) {
    const row = button.parentElement.parentElement;
    row.querySelector('td:nth-child(5)').textContent = 'Devolvido';
    alert('Empréstimo devolvido com sucesso!');
}

// Função para renovar o empréstimo
function renovarEmprestimo(button) {
    const row = button.parentElement.parentElement;
    const novaDataDevolucao = prompt('Informe a nova data de devolução (AAAA-MM-DD):');
    if (novaDataDevolucao) {
        row.querySelector('td:nth-child(4)').textContent = novaDataDevolucao;
        alert('Empréstimo renovado com sucesso!');
    }
}

// Função para filtrar os empréstimos
document.getElementById('filter-btn').addEventListener('click', function() {
    const statusFiltro = document.getElementById('filter-status').value;
    const tabela = document.getElementById('tabela-emprestimos').querySelectorAll('tr');

    tabela.forEach(row => {
        const status = row.querySelector('td:nth-child(5)').textContent.toLowerCase();
        if (statusFiltro && status !== statusFiltro) {
            row.style.display = 'none';
        } else {
            row.style.display = '';
        }
    });
});

// Função para buscar empréstimos (pesquisa simples)
document.getElementById('search-emprestimos').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const tabela = document.getElementById('tabela-emprestimos').querySelectorAll('tr');

    tabela.forEach(row => {
        const livro = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        const usuario = row.querySelector('td:nth-child(3)').textContent.toLowerCase();

        if (livro.includes(searchTerm) || usuario.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});
