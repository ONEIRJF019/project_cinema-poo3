// Pegar o formulário
const formFilme = document.getElementById('formFilme');
const listaFilmes = document.getElementById('listaFilmes');
const mensagem = document.getElementById('mensagem');

// Quando a página carrega, mostrar os filmes
document.addEventListener('DOMContentLoaded', function() {
    mostrarFilmes();
});

// Quando o formulário é enviado
formFilme.addEventListener('submit', function(event) {
    event.preventDefault();

    // Pegar os valores do formulário
    const titulo = document.getElementById('titulo').value;
    const genero = document.getElementById('genero').value;
    const descricao = document.getElementById('descricao').value;
    const classificacao = document.getElementById('classificacao').value;
    const duracao = document.getElementById('duracao').value;
    const dataEstreia = document.getElementById('dataEstreia').value;

    // Criar um objeto com os dados do filme
    const filme = {
        id: Date.now(),
        titulo: titulo,
        genero: genero,
        descricao: descricao,
        classificacao: classificacao,
        duracao: duracao,
        dataEstreia: dataEstreia
    };

    // Pegar os filmes que já existem no localStorage
    let filmes = localStorage.getItem('filmes');

    // Se não existem filmes, criar um array vazio
    if (filmes === null) {
        filmes = [];
    } else {
        // Se existem, transformar a string em um objeto
        filmes = JSON.parse(filmes);
    }

    // Adicionar o novo filme no array
    filmes.push(filme);

    // Guardar no localStorage
    try {
        localStorage.setItem('filmes', JSON.stringify(filmes));
        
        // Mostrar mensagem de sucesso
        mensagem.innerHTML = '<div class="alert alert-success">Filme salvo com sucesso!</div>';
        
        // Limpar o formulário
        formFilme.reset();
        
        // Mostrar os filmes
        mostrarFilmes();
        
        // Tirar a mensagem depois de 3 segundos
        setTimeout(function() {
            mensagem.innerHTML = '';
        }, 3000);
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            mensagem.innerHTML = '<div class="alert alert-danger">Limite de armazenamento atingido!</div>';
        }
    }
});

// Função para mostrar os filmes
function mostrarFilmes() {
    // Pegar os filmes do localStorage
    let filmes = localStorage.getItem('filmes');

    // Se não existem filmes, mostrar mensagem
    if (filmes === null || filmes === '[]') {
        listaFilmes.innerHTML = '<p>Nenhum filme cadastrado ainda.</p>';
        return;
    }

    // Transformar a string em um objeto
    filmes = JSON.parse(filmes);

    // Limpar a lista
    listaFilmes.innerHTML = '';

    // Percorrer cada filme
    for (let i = 0; i < filmes.length; i++) {
        const filme = filmes[i];

        // Criar um card para cada filme
        const card = document.createElement('div');
        card.className = 'card mb-3';
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${filme.titulo}</h5>
                <p class="card-text"><strong>Gênero:</strong> ${filme.genero}</p>
                <p class="card-text"><strong>Descrição:</strong> ${filme.descricao}</p>
                <p class="card-text"><strong>Classificação:</strong> ${filme.classificacao}</p>
                <p class="card-text"><strong>Duração:</strong> ${filme.duracao} minutos</p>
                <p class="card-text"><strong>Data de Estreia:</strong> ${filme.dataEstreia}</p>
                <button class="btn btn-danger btn-sm" onclick="deletarFilme(${filme.id})">Deletar</button>
            </div>
        `;

        // Adicionar o card na lista
        listaFilmes.appendChild(card);
    }
}

// Função para deletar um filme
function deletarFilme(id) {
    // Pegar os filmes do localStorage
    let filmes = localStorage.getItem('filmes');
    filmes = JSON.parse(filmes);

    // Encontrar o índice do filme
    let indice = -1;
    for (let i = 0; i < filmes.length; i++) {
        if (filmes[i].id === id) {
            indice = i;
            break;
        }
    }

    // Se encontrou, deletar
    if (indice !== -1) {
        filmes.splice(indice, 1);
        localStorage.setItem('filmes', JSON.stringify(filmes));
        mostrarFilmes();
    }
}
