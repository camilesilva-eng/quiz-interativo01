// Banco de Perguntas
const perguntas = [
    {
        pergunta: "Qual elemento químico tem o símbolo 'Fe'?",
        opcoes: ["Fósforo", "Ferro", "Flúor", "Fermium"],
        respostaCorreta: "Ferro"
    },
    {
        pergunta: "Quem pintou a famosa obra 'Guernica'?",
        opcoes: ["Salvador Dalí", "Pablo Picasso", "Claude Monet", "Vincent van Gogh"],
        respostaCorreta: "Pablo Picasso"
    },
    {
        pergunta: "Qual planeta é conhecido como a 'Estrela da Manhã'?",
        opcoes: ["Marte", "Júpiter", "Vênus", "Saturno"],
        respostaCorreta: "Vênus"
    },
    {
        pergunta: "Em que ano a Proclamação da República do Brasil ocorreu?",
        opcoes: ["1822", "1889", "1901", "1808"],
        respostaCorreta: "1889"
    },
];

// Elementos do DOM
const perguntaTitulo = document.getElementById('pergunta-titulo');
const opcoesRespostas = document.getElementById('opcoes-respostas');
const btnProxima = document.getElementById('btn-proxima');
const contadorQuestoes = document.getElementById('contador-questoes');
const totalQuestoes = document.getElementById('total-questoes');
const pontuacaoDisplay = document.getElementById('pontuacao');
const resultadoFinal = document.getElementById('resultado-final');
const quizCard = document.querySelector('.quiz-card');
const btnReiniciar = document.getElementById('btn-reiniciar');
const resultadoPontuacao = document.getElementById('resultado-pontuacao');

// Variáveis de Estado
let perguntaAtualIndex = 0;
let pontuacao = 0;
let respostaSelecionada = false;

// Inicialização
totalQuestoes.textContent = perguntas.length;

// Função para exibir a pergunta e as opções
function exibirPergunta() {
    resetarEstado();
    
    // Esconde resultado e mostra o card do quiz
    resultadoFinal.classList.add('escondido');
    quizCard.classList.remove('escondido');

    // Atualiza o contador de questões
    contadorQuestoes.textContent = perguntaAtualIndex + 1;
    
    // Carrega a pergunta atual
    const perguntaAtual = perguntas[perguntaAtualIndex];
    perguntaTitulo.textContent = perguntaAtual.pergunta;

    // Cria os botões de opção dinamicamente
    perguntaAtual.opcoes.forEach(opcao => {
        const button = document.createElement('button');
        button.textContent = opcao;
        button.classList.add('option-btn');
        opcoesRespostas.appendChild(button);
        
        if (opcao === perguntaAtual.respostaCorreta) {
            button.dataset.correct = true; // Marca a resposta correta para verificação
        }
        
        button.addEventListener('click', selecionarResposta);
    });
}

// Função chamada ao clicar em uma opção
function selecionarResposta(e) {
    if (respostaSelecionada) return; // Impede cliques múltiplos
    respostaSelecionada = true;
    
    const botaoClicado = e.target;
    const isCorreta = botaoClicado.dataset.correct;

    // Aplica o estilo de feedback visual (Neon Green/Red)
    if (isCorreta) {
        pontuacao++;
        pontuacaoDisplay.textContent = pontuacao;
        botaoClicado.classList.add('correct');
    } else {
        botaoClicado.classList.add('incorrect');
        // Revela a resposta correta em neon verde
        Array.from(opcoesRespostas.children).find(btn => btn.dataset.correct).classList.add('correct');
    }

    // Desabilita todos os botões após a seleção
    Array.from(opcoesRespostas.children).forEach(button => {
        button.disabled = true;
    });

    // Habilita o botão "Próxima Fase"
    btnProxima.disabled = false;
}

// Função para avançar ou finalizar o quiz
function proximaPergunta() {
    perguntaAtualIndex++;
    
    if (perguntaAtualIndex < perguntas.length) {
        exibirPergunta();
    } else {
        exibirResultado();
    }
}

// Função para exibir a tela de resultado final
function exibirResultado() {
    quizCard.classList.add('escondido');
    resultadoFinal.classList.remove('escondido');
    resultadoPontuacao.textContent = `${pontuacao} / ${perguntas.length}`;
}

// Função para limpar os botões e resetar o estado
function resetarEstado() {
    // Esconde o botão Próxima Fase
    btnProxima.disabled = true;
    
    // Remove os botões de opção antigos
    while (opcoesRespostas.firstChild) {
        opcoesRespostas.removeChild(opcoesRespostas.firstChild);
    }
    
    respostaSelecionada = false;
}

// Event Listeners
btnProxima.addEventListener('click', proximaPergunta);
btnReiniciar.addEventListener('click', () => {
    perguntaAtualIndex = 0;
    pontuacao = 0;
    pontuacaoDisplay.textContent = '0';
    exibirPergunta();
});

// Inicia o Quiz
exibirPergunta();
