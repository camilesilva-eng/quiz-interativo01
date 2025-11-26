// Seleção dos elementos
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

// PERGUNTAS (10 novas)
const questions = [
    { q: "Qual é o maior planeta do Sistema Solar?", a: ["Terra", "Marte", "Júpiter", "Vênus"], c: 2 },
    { q: "Quem pintou a Mona Lisa?", a: ["Michelangelo", "Leonardo da Vinci", "Picasso", "Van Gogh"], c: 1 },
    { q: "Quanto é 12 × 8?", a: ["96", "82", "108", "112"], c: 0 },
    { q: "Qual é o país do samba e futebol?", a: ["Argentina", "Espanha", "Brasil", "Portugal"], c: 2 },
    { q: "Qual animal é conhecido como o rei da selva?", a: ["Leão", "Tigre", "Elefante", "Urso"], c: 0 },
    { q: "Qual é o oceano maior do mundo?", a: ["Atlântico", "Pacífico", "Índico", "Ártico"], c: 1 },
    { q: "Qual é a capital da França?", a: ["Paris", "Londres", "Roma", "Berlim"], c: 0 },
    { q: "Quem descobriu o Brasil?", a: ["Cabral", "Vasco da Gama", "Cristóvão Colombo", "Dom Pedro"], c: 0 },
    { q: "Quanto é 50 + 50?", a: ["70", "80", "100", "120"], c: 2 },
    { q: "Qual é a cor do céu em um dia claro?", a: ["Verde", "Azul", "Amarelo", "Vermelho"], c: 1 },
];

// Iniciar o Quiz
startBtn.onclick = () => {
    home.classList.remove("active");
    quiz.classList.add("active");
    loadQuestion();
};

// Carregar pergunta
function loadQuestion() {
    const q = questions[current];

    questionEl.textContent = q.q;
    answersEl.innerHTML = "";
    progressEl.textContent = `Pergunta ${current + 1} de ${questions.length}`;

    q.a.forEach((resp, i) => {
        const btn = document.createElement("button");
        btn.textContent = resp;
        btn.className = "answer-btn";
        btn.onclick = () => check(i, btn);
        answersEl.appendChild(btn);
    });
}

// Verificar resposta
function check(i, btn) {
    let correct = questions[current].c;

    if (i === correct) {
        btn.classList.add("correct");
        score++;
    } else {
        btn.classList.add("wrong");
    }

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

    scoreEl.textContent = `Você fez ${score} ponto(s) de ${questions.length}!`;
}

// Reiniciar quiz
restartBtn.onclick = () => location.reload();
