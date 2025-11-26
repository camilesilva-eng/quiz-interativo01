// Seleção dos elementos (mantido do código anterior)
const home = document.getElementById("home");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn"); 

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const progressEl = document.getElementById("progress");
const scoreEl = document.getElementById("score");

let current = 0;
let score = 0;

// 🆕 NOVAS PERGUNTAS ATUALIZADAS
const questions = [
    { 
        q: "Qual é o planeta mais próximo do Sol?", 
        a: ["Marte", "Terra", "Mercúrio", "Júpiter"], 
        c: 2 // Mercúrio (índice 2)
    },
    { 
        q: "Quem pintou a obra “Mona Lisa”?", 
        a: ["Van Gogh", "Leonardo da Vinci", "Picasso", "Michelangelo"], 
        c: 1 // Leonardo da Vinci (índice 1)
    },
    { 
        q: "Qual é o maior oceano do mundo?", 
        a: ["Atlântico", "Pacífico", "Índico", "Ártico"], 
        c: 1 // Pacífico (índice 1)
    },
    { 
        q: "Quantos lados tem um hexágono?", 
        a: ["4", "5", "6", "7"], 
        c: 2 // 6 (índice 2)
    },
    { 
        q: "Qual país venceu a Copa do Mundo de 2002?", 
        a: ["Alemanha", "Brasil", "Argentina", "França"], 
        c: 1 // Brasil (índice 1)
    },
    { 
        q: "Quem descobriu o Brasil?", 
        a: ["Pedro Álvares Cabral", "Cristóvão Colombo", "Dom Pedro I", "Vasco da Gama"], 
        c: 0 // Pedro Álvares Cabral (índice 0)
    },
    { 
        q: "Em que continente fica o Egito?", 
        a: ["América", "Europa", "África", "Ásia"], 
        c: 2 // África (índice 2)
    },
    { 
        q: "Qual é o maior animal terrestre?", 
        a: ["Leão", "Elefante-africano", "Urso", "Rinoceronte"], 
        c: 1 // Elefante-africano (índice 1)
    },
    { 
        q: "Em que ano o homem pisou na Lua pela primeira vez?", 
        a: ["1960", "1969", "1975", "1981"], 
        c: 1 // 1969 (índice 1)
    },
    { 
        q: "Qual é o elemento químico representado por “O”?", 
        a: ["Ouro", "Carbono", "Oxigênio", "Hidrogênio"], 
        c: 2 // Oxigênio (índice 2)
    },
];

// 🟢 1. Botão INICIAR (Funcionando)
startBtn.onclick = () => {
    home.classList.remove("active");
    quiz.classList.add("active");
    loadQuestion();
};

// Função que carrega a pergunta no HTML
function loadQuestion() {
    const q = questions[current];

    // Exibe a pergunta e o progresso
    questionEl.textContent = q.q;
    answersEl.innerHTML = ""; 
    progressEl.textContent = `Pergunta ${current + 1} de ${questions.length}`;

    // Cria os botões de resposta e anexa a função de clique
    q.a.forEach((resp, i) => {
        const btn = document.createElement("button");
        btn.textContent = resp;
        btn.className = "answer-btn";
        btn.onclick = () => check(i, btn); // << Função que verifica a resposta
        answersEl.appendChild(btn);
    });
}

// 🟢 2. Lógica dos Botões de Resposta (Funcionando)
function check(i, btn) {
    let correct = questions[current].c;

    // Desabilita todos os botões para garantir apenas um clique por pergunta
    Array.from(answersEl.children).forEach(button => {
        button.disabled = true;
    });

    if (i === correct) {
        btn.classList.add("correct");
        score++; // Incrementa a pontuação
    } else {
        btn.classList.add("wrong");
        // Opcional: Destaca a resposta correta
        Array.from(answersEl.children)[correct].classList.add("correct");
    }

    // Avança para a próxima pergunta após um pequeno delay
    setTimeout(() => {
        current++;
        if (current < questions.length) {
            loadQuestion();
        } else {
            finish();
        }
    }, 700);
}

// Final do quiz
function finish() {
    quiz.classList.remove("active");
    result.classList.add("active");

    // 🟢 3. Exibição da Pontuação (Funcionando)
    scoreEl.textContent = `Você fez ${score} ponto(s) de ${questions.length}!`;
}

// 🟢 4. Botão REINICIAR / VOLTAR AO INÍCIO (Funcionando)
restartBtn.onclick = () => {
    // Recarregar a página é a maneira mais simples e eficaz de resetar o quiz
    location.reload(); 
};
