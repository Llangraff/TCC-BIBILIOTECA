// Função para alternar entre abas
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}

// Função para carregar livros em atraso
function getLivrosEmAtraso() {
    const tabelaAtrasos = document.querySelector('#tabela-atrasos tbody');
    
    // Exemplo de livros em atraso, futuramente você pode popular com dados reais
    const livrosAtrasados = [
        { titulo: "Livro 1", usuario: "Usuário A", dataDevolucao: "2024-01-10", atraso: 5, id: 1 },
        { titulo: "Livro 2", usuario: "Usuário B", dataDevolucao: "2024-01-08", atraso: 7, id: 2 }
    ];

    tabelaAtrasos.innerHTML = '';

    livrosAtrasados.forEach(livro => {
        const row = `
            <tr>
                <td>${livro.titulo}</td>
                <td>${livro.usuario}</td>
                <td>${livro.dataDevolucao}</td>
                <td>${livro.atraso} dias</td>
                <td><button class="btn-devolver" onclick="devolverLivro(${livro.id})">Devolver</button></td>
            </tr>
        `;
        tabelaAtrasos.innerHTML += row;
    });
}

// Função para marcar o livro como devolvido
function devolverLivro(livroId) {
    // Aqui você faria a requisição ao banco de dados para atualizar o status do livro

    // Exemplo de como simular a remoção do livro da lista de atrasados
    alert(`Livro com ID ${livroId} marcado como devolvido!`);

    // Após a requisição, atualize a tabela removendo o livro devolvido
    const tabelaAtrasos = document.querySelector('#tabela-atrasos tbody');
    const rows = tabelaAtrasos.querySelectorAll('tr');
    rows.forEach(row => {
        if (row.innerHTML.includes(`onclick="devolverLivro(${livroId})"`)) {
            tabelaAtrasos.removeChild(row);
        }
    });
}

// Função para popular o gráfico de empréstimos
const ctx = document.getElementById('loanChart').getContext('2d');
const loanChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Ficção', 'Biografia', 'Fantasia', 'Não-Ficção'],
        datasets: [{
            label: 'Empréstimos por Categoria',
            data: [12, 19, 3, 5],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Carregar os livros em atraso ao iniciar a aba
getLivrosEmAtraso();
