let questions = [
    {
        question: "Qual é a capital do Brasil?",
        answers: ["Rio de Janeiro", "São Paulo", "Brasília", "Bahia"],
        correct: 2
    },
    {
        question: "Quanto é 5 + 7?",
        answers: ["10", "12", "14", "15"],
        correct: 1
    },
    {
        question: "Quem pintou a Mona Lisa?",
        answers: ["Michelangelo", "Leonardo da Vinci", "Van Gogh", "Picasso"],
        correct: 1
    },
    {
        question: "Qual planeta é conhecido como Planeta Vermelho?",
        answers: ["Terra", "Júpiter", "Marte", "Vênus"],
        correct: 2
    },
    {
        question: "Qual animal é conhecido como o rei da selva?",
        answers: ["Tigre", "Leão", "Elefante", "Onça"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    if (currentQuestion >= questions.length) {
        endQuiz();
        return;
    }

    document.getElementById("question").innerText = questions[currentQuestion].question;

    let btns = document.querySelectorAll(".btn");
    questions[currentQuestion].answers.forEach((ans, i) => {
        btns[i].innerText = ans;
    });
}

function selectAnswer(choice) {
    if (choice === questions[currentQuestion].correct) {
        score++;
    }
    currentQuestion++;
    loadQuestion();
}

function endQuiz() {
    document.getElementById("question-container").classList.add("hide");

    let result = document.getElementById("result");
    result.classList.remove("hide");
    result.innerHTML = `<h2>Você terminou!</h2>
                        <p>Sua pontuação: <strong>${score}/${questions.length}</strong></p>`;

    document.getElementById("restartBtn").classList.remove("hide");
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;

    document.getElementById("question-container").classList.remove("hide");
    document.getElementById("result").classList.add("hide");
    document.getElementById("restartBtn").classList.add("hide");

    loadQuestion();
}

loadQuestion();
