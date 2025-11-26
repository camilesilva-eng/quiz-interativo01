// Banco de Perguntas (AGORA COM MAIS PERGUNTAS)
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

    // ⭐ NOVAS PERGUNTAS ⭐
    {
        pergunta: "Qual é o maior oceano do mundo?",
        opcoes: ["Atlântico", "Pacífico", "Índico", "Ártico"],
        respostaCorreta: "Pacífico"
    },
    {
        pergunta: "Quem escreveu 'Dom Casmurro'?",
        opcoes: ["José de Alencar", "Machado de Assis", "Manuel Bandeira", "Ariano Suassuna"],
        respostaCorreta: "Machado de Assis"
    },
    {
        pergunta: "Qual país venceu a Copa do Mundo de 2002?",
        opcoes: ["Alemanha", "Argentina", "Brasil", "França"],
        respostaCorreta: "Brasil"
    },
    {
        pergunta: "Qual é o maior planeta do Sistema Solar?",
        opcoes: ["Terra", "Netuno", "Saturno", "Júpiter"],
        respostaCorreta: "Júpiter"
    }
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

totalQuestoes.textContent = perguntas.length;

// Exibir pergunta
function exibirPergunta() {
    resetarEstado();

    resultadoFinal.classList.add('escondido');
    quizCard.classList.remove('escondido');

    contadorQuestoes.textContent = perguntaAtualIndex + 1;

    const perguntaAtual = perguntas[perguntaAtualIndex];
    perguntaTitulo.textContent = perguntaAtual.pergunta;

    perguntaAtual.opcoes.forEach(opcao => {
        const button = document.createElement('button');
        button.textContent = opcao;
        button.classList.add('option-btn');
        opcoesRespostas.appendChild(button);

        if (opcao === perguntaAtual.respostaCorreta) {
            button.dataset.correct = true;
        }

        button.addEventListener('click', selecionarResposta);
    });
}

function selecionarResposta(e) {
    if (respostaSelecionada) return;
    respostaSelecionada = true;

    const botaoClicado = e.target;
    const isCorreta = botaoClicado.dataset.correct;

    if (isCorreta) {
        pontuacao++;
        pontuacaoDisplay.textContent = pontuacao;
        botaoClicado.classList.add('correct');
    } else {
        botaoClicado.classList.add('incorrect');
        Array.from(opcoesRespostas.children)
            .find(btn => btn.dataset.correct)
            .classList.add('correct');
    }

    Array.from(opcoesRespostas.children).forEach(button => {
        button.disabled = true;
    });

    btnProxima.disabled = false;
}

function proximaPergunta() {
    perguntaAtualIndex++;

    if (perguntaAtualIndex < perguntas.length) {
        exibirPergunta();
    } else {
        exibirResultado();
    }
}

// Exibir resultado final COM BOTÃO DE VOLTAR AO INÍCIO
function exibirResultado() {
    quizCard.classList.add('escondido');
    resultadoFinal.classList.remove('escondido');
    resultadoPontuacao.textContent = `${pontuacao} / ${perguntas.length}`;
}

function resetarEstado() {
    btnProxima.disabled = true;

    while (opcoesRespostas.firstChild) {
        opcoesRespostas.removeChild(opcoesRespostas.firstChild);
    }

    respostaSelecionada = false;
}

// Reiniciar
btnProxima.addEventListener('click', proximaPergunta);

btnReiniciar.addEventListener('click', () => {
    perguntaAtualIndex = 0;
    pontuacao = 0;
    pontuacaoDisplay.textContent = '0';
    exibirPergunta();
});

// Começar
exibirPergunta();

