// Banco de Perguntas (adicione quantas quiser)
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
        pergunta: "Qual animal é conhecido como o 'Rei da Selva'?",
        opcoes: ["Leão", "Elefante", "Tigre", "Guepardo"],
        respostaCorreta: "Leão"
    },
    {
        pergunta: "Quanto é 12 × 8?",
        opcoes: ["96", "108", "88", "104"],
        respostaCorreta: "96"
    },
    {
        pergunta: "Qual é o continente mais populoso do mundo?",
        opcoes: ["África", "Europa", "Ásia", "América"],
        respostaCorreta: "Ásia"
    },
    {
        pergunta: "Qual é o maior oceano do planeta?",
        opcoes: ["Atlântico", "Índico", "Pacífico", "Ártico"],
        respostaCorreta: "Pacífico"
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
const btnVoltar = document.createElement("button");

// Criar botão VOLTAR AO INÍCIO
btnVoltar.textContent = "VOLTAR AO INÍCIO";
btnVoltar.classList.add("btn-principal");
btnVoltar.style.marginTop = "15px";
resultadoFinal.appendChild(btnVoltar);

// Variáveis de Estado
let perguntaAtualIndex = 0;
let pontuacao = 0;
let respostaSelecionada = false;

// Inicialização
totalQuestoes.textContent = perguntas.length;

// Função para exibir a pergunta
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

    const botao = e.target;
    const correta = botao.dataset.correct;

    if (correta) {
        pontuacao++;
        pontuacaoDisplay.textContent = pontuacao;
        botao.classList.add('correct');
    } else {
        botao.classList.add('incorrect');
        Array.from(opcoesRespostas.children)
            .find(btn => btn.dataset.correct)
            .classList.add('correct');
    }

    Array.from(opcoesRespostas.children).forEach(btn => btn.disabled = true);
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

function exibirResultado() {
    quizCard.classList.add("escondido");
    resultadoFinal.classList.remove("escondido");
    resultadoPontuacao.textContent = `${pontuacao} / ${perguntas.length}`;
}

function resetarEstado() {
    btnProxima.disabled = true;

    while (opcoesRespostas.firstChild) {
        opcoesRespostas.removeChild(opcoesRespostas.firstChild);
    }

    respostaSelecionada = false;
}

// EVENTOS
btnProxima.addEventListener('click', proximaPergunta);

btnReiniciar.addEventListener('click', () => {
    perguntaAtualIndex = 0;
    pontuacao = 0;
    pontuacaoDisplay.textContent = "0";
    exibirPergunta();
});

// VOLTAR PARA O INÍCIO (reload)
btnVoltar.addEventListener("click", () => {
    window.location.reload();
});

// INÍCIO
exibirPergunta();
