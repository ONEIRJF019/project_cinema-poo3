// Pegar o elemento
const listaSessoes = document.getElementById('listaSessoes');

// Quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    mostrarSessoes();
});

// Função para mostrar as sessões
function mostrarSessoes() {
    // Pegar as sessões do localStorage
    let sessoes = localStorage.getItem('sessoes');

    // Se não existem sessões, mostrar mensagem
    if (sessoes === null || sessoes === '[]') {
        listaSessoes.innerHTML = '<div class="alert alert-info">Nenhuma sessão disponível no momento.</div>';
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
        card.className = 'card mb-4';
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${nomeFilme}</h5>
                <p class="card-text"><strong>Sala:</strong> ${nomeSala}</p>
                <p class="card-text"><strong>Data e Hora:</strong> ${sessao.dataHora}</p>
                <p class="card-text"><strong>Preço:</strong> R$ ${sessao.preco}</p>
                <p class="card-text"><strong>Idioma:</strong> ${sessao.idioma}</p>
                <p class="card-text"><strong>Formato:</strong> ${sessao.formato}</p>
                <a href="venda-ingressos.html" class="btn btn-primary">Comprar Ingresso</a>
            </div>
        `;

        // Adicionar o card na lista
        listaSessoes.appendChild(card);
    }
}
