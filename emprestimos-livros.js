document.addEventListener('DOMContentLoaded', function() {
    const formEmprestimo = document.getElementById('form-emprestimo');
    const tabelaEmprestimos = document.getElementById('tabela-emprestimos');
    const searchEmprestimos = document.getElementById('search-emprestimos');
    const filterStatus = document.getElementById('filter-status');
    const filterBtn = document.getElementById('filter-btn');

    formEmprestimo.addEventListener('submit', function(event) {
        event.preventDefault();
        const livro = document.getElementById('livro').value;
        const usuario = document.getElementById('usuario').value;
        const dataEmprestimo = document.getElementById('data-emprestimo').value;

        if (!livro || !usuario || !dataEmprestimo) {
            alert('Todos os campos são necessários para registrar o empréstimo.');
            return;
        }

        const novoEmprestimo = {
            id: Date.now().toString(),
            livro,
            usuario,
            dataEmprestimo,
            status: 'ativo'
        };

        let emprestimos = JSON.parse(localStorage.getItem('emprestimos')) || [];
        emprestimos.push(novoEmprestimo);
        localStorage.setItem('emprestimos', JSON.stringify(emprestimos));
        alert('Empréstimo registrado com sucesso!');
        formEmprestimo.reset();
        loadEmprestimos();
    });

    function loadEmprestimos() {
        const emprestimos = JSON.parse(localStorage.getItem('emprestimos')) || [];
        displayEmprestimos(emprestimos);
    }

    function displayEmprestimos(emprestimos) {
        tabelaEmprestimos.innerHTML = '';
        emprestimos.forEach(emp => {
            const row = tabelaEmprestimos.insertRow();
            row.innerHTML = `
                <td>${emp.id}</td>
                <td>${emp.livro}</td>
                <td>${emp.usuario}</td>
                <td>${emp.dataEmprestimo}</td>
                <td>${emp.status}</td>
                <td>
                    <button onclick="changeStatus('${emp.id}', 'devolvido')">Marcar como Devolvido</button>
                </td>
            `;
        });
    }

    function changeStatus(id, status) {
        let emprestimos = JSON.parse(localStorage.getItem('emprestimos'));
        emprestimos = emprestimos.map(emp => {
            if (emp.id === id) {
                emp.status = status;
            }
            return emp;
        });
        localStorage.setItem('emprestimos', JSON.stringify(emprestimos));
        loadEmprestimos();
    }

    filterBtn.addEventListener('click', function() {
        const searchQuery = searchEmprestimos.value.toLowerCase();
        const statusFilter = filterStatus.value;
        let filteredEmprestimos = JSON.parse(localStorage.getItem('emprestimos')) || [];
        filteredEmprestimos = filteredEmprestimos.filter(emp => {
            return (emp.livro.toLowerCase().includes(searchQuery) || emp.usuario.toLowerCase().includes(searchQuery)) &&
                   (statusFilter ? emp.status === statusFilter : true);
        });
        displayEmprestimos(filteredEmprestimos);
    });

    loadEmprestimos(); // Carregar empréstimos na inicialização
});
