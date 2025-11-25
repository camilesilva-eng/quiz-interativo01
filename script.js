const questions = [
    {
        question: "Qual planeta é conhecido como Planeta Vermelho?",
        answers: [
            { text: "Marte", correct: true },
            { text: "Júpiter", correct: false },
            { text: "Saturno", correct: false },
            { text: "Vênus", correct: false }
        ]
    },
    {
        question: "Quem inventou a lâmpada?",
        answers: [
            { text: "Thomas Edison", correct: true },
            { text: "Albert Einstein", correct: false },
            { text: "Nikola Tesla", correct: false },
            { text: "Graham Bell", correct: false }
        ]
    },
    {
        question: "Quanto é 8 × 7?",
        answers: [
            { text: "56", correct: true },
            { text: "54", correct: false },
            { text: "49", correct: false },
            { text: "64", correct: false }
        ]
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const characterMessage = document.getElementById("characterMessage");

function startQuiz() {
    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    answersEl.innerHTML = "";
    characterMessage.textContent = "Escolha a resposta correta!";

    q.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.textContent = answer.text;
        btn.classList.add("answer-btn");
        btn.onclick = () => selectAnswer(answer.correct);
        answersEl.appendChild(btn);
    });
}

function selectAnswer(correct) {
    if (correct) {
        score++;
        characterMessage.textContent = "Boa! Você acertou! 😄";
    } else {
        characterMessage.textContent = "Ops! Errou 😢";
    }

    nextBtn.classList.remove("hidden");
}

nextBtn.onclick = () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        nextBtn.classList.add("hidden");
        showQuestion();
    } else {
        endQuiz();
    }
};

function endQuiz() {
    questionEl.textContent = "Quiz finalizado!";
    answersEl.innerHTML = "";
    scoreEl.textContent = `Sua pontuação final: ${score}/${questions.length}`;
    scoreEl.classList.remove("hidden");
    characterMessage.textContent = "Parabéns por jogar! 🎉";
    nextBtn.classList.add("hidden");
}

startQuiz();
