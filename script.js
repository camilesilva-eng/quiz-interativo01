document.addEventListener("DOMContentLoaded", () => {

    const startBtn = document.getElementById("startBtn");
    const quizBox = document.getElementById("quizBox");
    const resultBox = document.getElementById("resultBox");
    const questionEl = document.getElementById("question");
    const answersEl = document.getElementById("answers");
    const scoreText = document.getElementById("scoreText");
    const progressText = document.getElementById("progress");

    let currentQuestion = 0;
    let score = 0;

    const questions = [
        {
            question: "Qual é o maior planeta do Sistema Solar?",
            answers: ["Terra", "Júpiter", "Marte", "Saturno"],
            correct: 1
        },
        {
            question: "Quem pintou a Mona Lisa?",
            answers: ["Leonardo da Vinci", "Picasso", "Michelangelo", "Van Gogh"],
            correct: 0
        }
    ];

    startBtn.addEventListener("click", startQuiz);

    function startQuiz() {
        document.querySelector(".container").classList.add("hidden");
        quizBox.classList.remove("hidden");
        loadQuestion();
    }

    function loadQuestion() {
        const q = questions[currentQuestion];

        questionEl.textContent = q.question;
        answersEl.innerHTML = "";
        progressText.textContent = `Pergunta ${currentQuestion + 1} de ${questions.length}`;

        q.answers.forEach((ans, index) => {
            const btn = document.createElement("button");
            btn.textContent = ans;
            btn.classList.add("answer-btn");

            btn.onclick = () => checkAnswer(index, btn);
            answersEl.appendChild(btn);
        });
    }

    function checkAnswer(selected, button) {
        if (selected === questions[currentQuestion].correct) {
            button.classList.add("correct");
            score++;
        } else {
            button.classList.add("wrong");
        }

        setTimeout(() => {
            currentQuestion++;
            if (currentQuestion < questions.length) {
                loadQuestion();
            } else {
                finishQuiz();
            }
        }, 700);
    }

    function finishQuiz() {
        quizBox.classList.add("hidden");
        resultBox.classList.remove("hidden");
        scoreText.textContent = `Você fez ${score} ponto(s)!`;
    }

});
