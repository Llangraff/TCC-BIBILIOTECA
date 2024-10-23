// Função para validar o formulário
function validarFormulario() {
    let valido = true;
    const titulo = document.getElementById('titulo').value.trim();
    const autor = document.getElementById('autor').value.trim();
    const isbn = document.getElementById('isbn').value.trim();
    const editora = document.getElementById('editora').value.trim();
    const ano = document.getElementById('ano').value;
    const edicao = document.getElementById('edicao').value.trim();
    const genero = document.getElementById('genero').value;
    const publicoAlvo = document.getElementById('publico_alvo').value;
    const exemplares = document.getElementById('exemplares').value;
    const localizacao = document.getElementById('localizacao').value.trim();

    // Validações
    if (titulo === "") {
        alert("Por favor, preencha o título do livro.");
        valido = false;
    } else if (autor === "") {
        alert("Por favor, preencha o autor do livro.");
        valido = false;
    } else if (isbn === "") {
        alert("Por favor, preencha o ISBN do livro.");
        valido = false;
    } else if (isNaN(ano) || ano < 1500 || ano > 2024) {
        alert("Por favor, insira um ano de publicação válido (entre 1500 e 2024).");
        valido = false;
    } else if (genero === "") {
        alert("Por favor, selecione um gênero.");
        valido = false;
    } else if (publicoAlvo === "") {
        alert("Por favor, selecione um público alvo.");
        valido = false;
    } else if (isNaN(exemplares) || exemplares < 1) {
        alert("Por favor, insira um número de exemplares válido (maior que 0).");
        valido = false;
    } else if (localizacao === "") {
        alert("Por favor, preencha a localização do livro.");
        valido = false;
    }
    return valido;
}

// Função para obter os dados do formulário
function obterDadosFormulario() {
    const titulo = document.getElementById('titulo').value.trim();
    const autor = document.getElementById('autor').value.trim();
    const isbn = document.getElementById('isbn').value.trim();
    const editora = document.getElementById('editora').value.trim();
    const ano = parseInt(document.getElementById('ano').value);
    const edicao = document.getElementById('edicao').value.trim();
    const genero = document.getElementById('genero').value;
    const publicoAlvo = document.getElementById('publico_alvo').value;
    const exemplares = parseInt(document.getElementById('exemplares').value);
    const localizacao = document.getElementById('localizacao').value.trim();

    return { titulo, autor, isbn, editora, ano, edicao, genero, publicoAlvo, exemplares, localizacao };
}

// Função para limpar o formulário
function limparFormulario() {
    document.getElementById('form-cadastro-livro').reset();
}

// Importar as funções do Firebase
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Inicializar o Firestore
const db = getFirestore();

// Função para adicionar livro no Firebase
async function adicionarLivro(livro) {
    try {
        const livrosCollection = collection(db, "livros");
        const docRef = await addDoc(livrosCollection, livro);
        console.log("Livro adicionado com sucesso com ID:", docRef.id);
        return true;
    } catch (e) {
        console.error("Erro ao adicionar livro:", e);
        return false;
    }
}

// Adicionar evento de submit ao formulário
document.getElementById('form-cadastro-livro').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    if (validarFormulario()) {
        const dadosLivro = obterDadosFormulario();

        // Adicionar livro no Firebase
        const sucesso = await adicionarLivro(dadosLivro);

        if (sucesso) {
            alert("Livro cadastrado com sucesso!");
            limparFormulario();
        } else {
            alert("Erro ao cadastrar o livro. Por favor, tente novamente.");
        }
    }
});