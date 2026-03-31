// Pegar os elementos
const formIngresso = document.getElementById('formIngresso');
const listaIngressos = document.getElementById('listaIngressos');
const mensagem = document.getElementById('mensagem');
const selectSessao = document.getElementById('sessao');

// Quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    carregarSessoes();
    mostrarIngressos();
});

// Quando o formulário é enviado
formIngresso.addEventListener('submit', function(event) {
    event.preventDefault();

    // Pegar os valores do formulário
    const sessao = document.getElementById('sessao').value;
    const nomeCliente = document.getElementById('nomeCliente').value;
    const cpf = document.getElementById('cpf').value;
    const assento = document.getElementById('assento').value;
    const pagamento = document.getElementById('pagamento').value;

    // Criar um objeto com os dados do ingresso
    const ingresso = {
        id: Date.now(),
        sessao: sessao,
        nomeCliente: nomeCliente,
        cpf: cpf,
        assento: assento,
        pagamento: pagamento
    };

    // Pegar os ingressos que já existem no localStorage
    let ingressos = localStorage.getItem('ingressos');

    // Se não existem ingressos, criar um array vazio
    if (ingressos === null) {
        ingressos = [];
    } else {
        // Se existem, transformar a string em um objeto
        ingressos = JSON.parse(ingressos);
    }

    // Adicionar o novo ingresso no array
    ingressos.push(ingresso);

    // Guardar no localStorage
    try {
        localStorage.setItem('ingressos', JSON.stringify(ingressos));
        
        // Mostrar mensagem de sucesso
        mensagem.innerHTML = '<div class="alert alert-success">Ingresso vendido com sucesso!</div>';
        
        // Limpar o formulário
        formIngresso.reset();
        
        // Mostrar os ingressos
        mostrarIngressos();
        
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

// Função para carregar as sessões no select
function carregarSessoes() {
    // Pegar as sessões do localStorage
    let sessoes = localStorage.getItem('sessoes');

    // Se não existem sessões, não fazer nada
    if (sessoes === null || sessoes === '[]') {
        return;
    }

    // Transformar a string em um objeto
    sessoes = JSON.parse(sessoes);

    // Pegar os filmes e salas para mostrar informações
    let filmes = localStorage.getItem('filmes');
    let salas = localStorage.getItem('salas');

    filmes = filmes ? JSON.parse(filmes) : [];
    salas = salas ? JSON.parse(salas) : [];

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

        // Criar uma opção para cada sessão
        const option = document.createElement('option');
        option.value = sessao.id;
        option.textContent = nomeFilme + ' - ' + nomeSala + ' - ' + sessao.dataHora;

        // Adicionar a opção no select
        selectSessao.appendChild(option);
    }
}

// Função para mostrar os ingressos
function mostrarIngressos() {
    // Pegar os ingressos do localStorage
    let ingressos = localStorage.getItem('ingressos');

    // Se não existem ingressos, mostrar mensagem
    if (ingressos === null || ingressos === '[]') {
        listaIngressos.innerHTML = '<p>Nenhum ingresso vendido ainda.</p>';
        return;
    }

    // Transformar a string em um objeto
    ingressos = JSON.parse(ingressos);

    // Limpar a lista
    listaIngressos.innerHTML = '';

    // Percorrer cada ingresso
    for (let i = 0; i < ingressos.length; i++) {
        const ingresso = ingressos[i];

        // Criar um card para cada ingresso
        const card = document.createElement('div');
        card.className = 'card mb-3';
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">Ingresso #${i + 1}</h5>
                <p class="card-text"><strong>Cliente:</strong> ${ingresso.nomeCliente}</p>
                <p class="card-text"><strong>CPF:</strong> ${ingresso.cpf}</p>
                <p class="card-text"><strong>Assento:</strong> ${ingresso.assento}</p>
                <p class="card-text"><strong>Pagamento:</strong> ${ingresso.pagamento}</p>
                <button class="btn btn-danger btn-sm" onclick="deletarIngresso(${ingresso.id})">Deletar</button>
            </div>
        `;

        // Adicionar o card na lista
        listaIngressos.appendChild(card);
    }
}

// Função para deletar um ingresso
function deletarIngresso(id) {
    // Pegar os ingressos do localStorage
    let ingressos = localStorage.getItem('ingressos');
    ingressos = JSON.parse(ingressos);

    // Encontrar o índice do ingresso
    let indice = -1;
    for (let i = 0; i < ingressos.length; i++) {
        if (ingressos[i].id === id) {
            indice = i;
            break;
        }
    }

    // Se encontrou, deletar
    if (indice !== -1) {
        ingressos.splice(indice, 1);
        localStorage.setItem('ingressos', JSON.stringify(ingressos));
        mostrarIngressos();
    }
}
