// Pegar os elementos
const formSessao = document.getElementById('formSessao');
const listaSessoes = document.getElementById('listaSessoes');
const mensagem = document.getElementById('mensagem');
const selectFilme = document.getElementById('filme');
const selectSala = document.getElementById('sala');

// Quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    carregarFilmes();
    carregarSalas();
    mostrarSessoes();
});

// Quando o formulário é enviado
formSessao.addEventListener('submit', function(event) {
    event.preventDefault();

    // Pegar os valores do formulário
    const filme = document.getElementById('filme').value;
    const sala = document.getElementById('sala').value;
    const dataHora = document.getElementById('dataHora').value;
    const preco = document.getElementById('preco').value;
    const idioma = document.getElementById('idioma').value;
    const formato = document.getElementById('formato').value;

    // Criar um objeto com os dados da sessão
    const sessao = {
        id: Date.now(),
        filme: filme,
        sala: sala,
        dataHora: dataHora,
        preco: preco,
        idioma: idioma,
        formato: formato
    };

    // Pegar as sessões que já existem no localStorage
    let sessoes = localStorage.getItem('sessoes');

    // Se não existem sessões, criar um array vazio
    if (sessoes === null) {
        sessoes = [];
    } else {
        // Se existem, transformar a string em um objeto
        sessoes = JSON.parse(sessoes);
    }

    // Adicionar a nova sessão no array
    sessoes.push(sessao);

    // Guardar no localStorage
    try {
        localStorage.setItem('sessoes', JSON.stringify(sessoes));
        
        // Mostrar mensagem de sucesso
        mensagem.innerHTML = '<div class="alert alert-success">Sessão salva com sucesso!</div>';
        
        // Limpar o formulário
        formSessao.reset();
        
        // Mostrar as sessões
        mostrarSessoes();
        
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

// Função para carregar os filmes no select
function carregarFilmes() {
    // Pegar os filmes do localStorage
    let filmes = localStorage.getItem('filmes');

    // Se não existem filmes, não fazer nada
    if (filmes === null || filmes === '[]') {
        return;
    }

    // Transformar a string em um objeto
    filmes = JSON.parse(filmes);

    // Percorrer cada filme
    for (let i = 0; i < filmes.length; i++) {
        const filme = filmes[i];

        // Criar uma opção para cada filme
        const option = document.createElement('option');
        option.value = filme.id;
        option.textContent = filme.titulo;

        // Adicionar a opção no select
        selectFilme.appendChild(option);
    }
}

// Função para carregar as salas no select
function carregarSalas() {
    // Pegar as salas do localStorage
    let salas = localStorage.getItem('salas');

    // Se não existem salas, não fazer nada
    if (salas === null || salas === '[]') {
        return;
    }

    // Transformar a string em um objeto
    salas = JSON.parse(salas);

    // Percorrer cada sala
    for (let i = 0; i < salas.length; i++) {
        const sala = salas[i];

        // Criar uma opção para cada sala
        const option = document.createElement('option');
        option.value = sala.id;
        option.textContent = sala.nomeSala;

        // Adicionar a opção no select
        selectSala.appendChild(option);
    }
}

// Função para mostrar as sessões
function mostrarSessoes() {
    // Pegar as sessões do localStorage
    let sessoes = localStorage.getItem('sessoes');

    // Se não existem sessões, mostrar mensagem
    if (sessoes === null || sessoes === '[]') {
        listaSessoes.innerHTML = '<p>Nenhuma sessão cadastrada ainda.</p>';
        return;
    }

    // Transformar a string em um objeto
    sessoes = JSON.parse(sessoes);

    // Pegar os filmes e salas
    let filmes = localStorage.getItem('filmes');
    let salas = localStorage.getItem('salas');

    filmes = filmes ? JSON.parse(filmes) : [];
    salas = salas ? JSON.parse(salas) : [];

    // Limpar a lista
    listaSessoes.innerHTML = '';

    // Percorrer cada sessão
    for (let i = 0; i < sessoes.length; i++) {
        const sessao = sessoes[i];

        // Encontrar o filme e a sala
        let nomeFilme = 'Filme não encontrado';
        let nomeSala = 'Sala não encontrada';

        for (let j = 0; j < filmes.length; j++) {
            if (filmes[j].id == sessao.filme) {
                nomeFilme = filmes[j].titulo;
                break;
            }
        }

        for (let j = 0; j < salas.length; j++) {
            if (salas[j].id == sessao.sala) {
                nomeSala = salas[j].nomeSala;
                break;
            }
        }

        // Criar um card para cada sessão
        const card = document.createElement('div');
        card.className = 'card mb-3';
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${nomeFilme}</h5>
                <p class="card-text"><strong>Sala:</strong> ${nomeSala}</p>
                <p class="card-text"><strong>Data e Hora:</strong> ${sessao.dataHora}</p>
                <p class="card-text"><strong>Preço:</strong> R$ ${sessao.preco}</p>
                <p class="card-text"><strong>Idioma:</strong> ${sessao.idioma}</p>
                <p class="card-text"><strong>Formato:</strong> ${sessao.formato}</p>
                <button class="btn btn-danger btn-sm" onclick="deletarSessao(${sessao.id})">Deletar</button>
            </div>
        `;

        // Adicionar o card na lista
        listaSessoes.appendChild(card);
    }
}

// Função para deletar uma sessão
function deletarSessao(id) {
    // Pegar as sessões do localStorage
    let sessoes = localStorage.getItem('sessoes');
    sessoes = JSON.parse(sessoes);

    // Encontrar o índice da sessão
    let indice = -1;
    for (let i = 0; i < sessoes.length; i++) {
        if (sessoes[i].id === id) {
            indice = i;
            break;
        }
    }

    // Se encontrou, deletar
    if (indice !== -1) {
        sessoes.splice(indice, 1);
        localStorage.setItem('sessoes', JSON.stringify(sessoes));
        mostrarSessoes();
    }
}
