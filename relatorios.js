document.addEventListener('DOMContentLoaded', function() {
    function downloadCSV(arrayData, fileName) {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "ID, Nome, Detalhes\n"; // Cabeçalho do CSV

        arrayData.forEach(item => {
            const row = `${item.id}, ${item.nome || item.titulo}, ${item.email || item.autor || item.nacionalidade || item.status}`;
            csvContent += row + "\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", fileName);
        document.body.appendChild(link); // Required for FF

        link.click(); // Isto irá baixar o arquivo
        document.body.removeChild(link); // Remove o link após o download
    }

    function gerarRelatorioLivros() {
        const livros = JSON.parse(localStorage.getItem('livros')) || [];
        downloadCSV(livros, "Relatorio_Livros.csv");
    }

    function gerarRelatorioEmprestimos() {
        const emprestimos = JSON.parse(localStorage.getItem('emprestimos')) || [];
        downloadCSV(emprestimos, "Relatorio_Emprestimos.csv");
    }

    function gerarRelatorioUsuarios() {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        downloadCSV(usuarios, "Relatorio_Usuarios.csv");
    }

    document.querySelector('.btn[onclick="gerarRelatorioLivros()"]').addEventListener('click', gerarRelatorioLivros);
    document.querySelector('.btn[onclick="gerarRelatorioEmprestimos()"]').addEventListener('click', gerarRelatorioEmprestimos);
    document.querySelector('.btn[onclick="gerarRelatorioUsuarios()"]').addEventListener('click', gerarRelatorioUsuarios);

    function updateCounts() {
        const livros = JSON.parse(localStorage.getItem('livros')) || [];
        const emprestimos = JSON.parse(localStorage.getItem('emprestimos')) || [];
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        document.getElementById('total-livros').textContent = livros.length;
        document.getElementById('total-emprestimos').textContent = emprestimos.length;
        document.getElementById('total-usuarios').textContent = usuarios.length;
    }

    updateCounts();
});
