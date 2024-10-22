document.addEventListener('DOMContentLoaded', function() {
    const formCadastroUsuario = document.getElementById('form-cadastro-usuario');
    const tabelaUsuarios = document.getElementById('tabela-usuarios');

    formCadastroUsuario.addEventListener('submit', function(event) {
        event.preventDefault();
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value;

        if (!nome || !email || !senha) {
            alert('Todos os campos são obrigatórios.');
            return;
        }

        const novoUsuario = {
            id: Date.now().toString(),
            nome,
            email,
            senha  // Senha deve ser armazenada de forma segura em um cenário real
        };

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push(novoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('Usuário cadastrado com sucesso!');
        formCadastroUsuario.reset();
        loadUsuarios();
    });

    function loadUsuarios() {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        tabelaUsuarios.innerHTML = '';
        usuarios.forEach(user => {
            const row = tabelaUsuarios.insertRow();
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.nome}</td>
                <td>${user.email}</td>
                <td>
                    <button onclick="editUsuario('${user.id}')">Editar</button>
                    <button onclick="deleteUsuario('${user.id}')">Excluir</button>
                </td>
            `;
        });
    }

    function editUsuario(id) {
        const usuarios = JSON.parse(localStorage.getItem('usuarios'));
        const usuario = usuarios.find(u => u.id === id);
        if (usuario) {
            document.getElementById('nome').value = usuario.nome;
            document.getElementById('email').value = usuario.email;
            // Não carregue a senha para edição, é inseguro
        }
    }

    function deleteUsuario(id) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios'));
        usuarios = usuarios.filter(user => user.id !== id);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        loadUsuarios();
    }

    loadUsuarios(); // Carregar usuários na inicialização
});
