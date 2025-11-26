let questions = [
    {
        q: "Qual é a capital do Brasil?",
        options: ["Rio de Janeiro", "Brasília", "São Paulo", "Bahia"],
        correct: 1
    },
    {
        q: "Quanto é 10 + 5?",
        options: ["12", "15", "20", "30"],
        correct: 1
    },
    {
        q: "Quem descobriu o Brasil?",
        options: ["Pedro Álvares Cabral", "Dom Pedro I", "Machado de Assis", "Tiradentes"],
        correct: 0
    },
    {
        q: "Qual planeta é vermelho?",
        options: ["Terra", "Júpiter", "Marte", "Vênus"],
        correct: 2
    },
    {
        q: "Qual animal é o rei da selva?",
        options: ["Tigre", "Leão", "Onça", "Lobo"],
        correct: 1
    }
];

let index = 0;
let score = 0;

function loadQuestion() {
    if (index >= questions.length) {
        endQuiz();
        return;
    }

    document.getElementById("question").innerText = questions[index].q;

    let buttons = document.querySelectorAll(".optionBtn");
    questions[index].options.forEach((opt, i) => {
        buttons[i].innerText = opt;
    });
}

function checkAnswer(choice) {
    if (choice === questions[index].correct) {
        score++;
    }
    index++;
    loadQuestion();
}

function endQuiz() {
    document.getElementById("quizBox").classList.add("hidden");
    document.getElementById("resultBox").classList.remove("hidden");

    document.getElementById("scoreText").innerHTML =
        `Você acertou <strong>${score}</strong> de <strong>${questions.length}</strong> perguntas!`;
}

function restartQuiz() {
    index = 0;
    score = 0;

    document.getElementById("quizBox").classList.remove("hidden");
    document.getElementById("resultBox").classList.add("hidden");

    loadQuestion();
}

loadQuestion();
