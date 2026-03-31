// Pegar o formulário
const formSala = document.getElementById('formSala');
const listaSalas = document.getElementById('listaSalas');
const mensagem = document.getElementById('mensagem');

// Quando a página carrega, mostrar as salas
document.addEventListener('DOMContentLoaded', function() {
    mostrarSalas();
});

// Quando o formulário é enviado
formSala.addEventListener('submit', function(event) {
    event.preventDefault();

    // Pegar os valores do formulário
    const nomeSala = document.getElementById('nomeSala').value;
    const capacidade = document.getElementById('capacidade').value;
    const tipo = document.getElementById('tipo').value;

    // Criar um objeto com os dados da sala
    const sala = {
        id: Date.now(),
        nomeSala: nomeSala,
        capacidade: capacidade,
        tipo: tipo
    };

    // Pegar as salas que já existem no localStorage
    let salas = localStorage.getItem('salas');

    // Se não existem salas, criar um array vazio
    if (salas === null) {
        salas = [];
    } else {
        // Se existem, transformar a string em um objeto
        salas = JSON.parse(salas);
    }

    // Adicionar a nova sala no array
    salas.push(sala);

    // Guardar no localStorage
    try {
        localStorage.setItem('salas', JSON.stringify(salas));
        
        // Mostrar mensagem de sucesso
        mensagem.innerHTML = '<div class="alert alert-success">Sala salva com sucesso!</div>';
        
        // Limpar o formulário
        formSala.reset();
        
        // Mostrar as salas
        mostrarSalas();
        
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

// Função para mostrar as salas
function mostrarSalas() {
    // Pegar as salas do localStorage
    let salas = localStorage.getItem('salas');

    // Se não existem salas, mostrar mensagem
    if (salas === null || salas === '[]') {
        listaSalas.innerHTML = '<p>Nenhuma sala cadastrada ainda.</p>';
        return;
    }

    // Transformar a string em um objeto
    salas = JSON.parse(salas);

    // Limpar a lista
    listaSalas.innerHTML = '';

    // Percorrer cada sala
    for (let i = 0; i < salas.length; i++) {
        const sala = salas[i];

        // Criar um card para cada sala
        const card = document.createElement('div');
        card.className = 'card mb-3';
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${sala.nomeSala}</h5>
                <p class="card-text"><strong>Capacidade:</strong> ${sala.capacidade} lugares</p>
                <p class="card-text"><strong>Tipo:</strong> ${sala.tipo}</p>
                <button class="btn btn-danger btn-sm" onclick="deletarSala(${sala.id})">Deletar</button>
            </div>
        `;

        // Adicionar o card na lista
        listaSalas.appendChild(card);
    }
}

// Função para deletar uma sala
function deletarSala(id) {
    // Pegar as salas do localStorage
    let salas = localStorage.getItem('salas');
    salas = JSON.parse(salas);

    // Encontrar o índice da sala
    let indice = -1;
    for (let i = 0; i < salas.length; i++) {
        if (salas[i].id === id) {
            indice = i;
            break;
        }
    }

    // Se encontrou, deletar
    if (indice !== -1) {
        salas.splice(indice, 1);
        localStorage.setItem('salas', JSON.stringify(salas));
        mostrarSalas();
    }
}
