  // 1. Estrutura de Dados (Perguntas sobre Geek, Esportes, História)
const questions = [
    // --- Categoria: GEEK ---
    {
        question: "Qual é o nome do robô mordomo que serve a família Jetson?",
        answers: [
            { text: "R2-D2", isCorrect: false },
            { text: "C-3PO", isCorrect: false },
            { text: "Rosie", isCorrect: true },
            { text: "Bender", isCorrect: false }
        ]
    },
    {
        question: "Em 'O Senhor dos Anéis', qual é o nome do anel de Sauron?",
        answers: [
            { text: "Anel do Poder", isCorrect: false },
            { text: "O Um Anel", isCorrect: true },
            { text: "Anel Mestre", isCorrect: false },
            { text: "Anel do Destino", isCorrect: false }
        ]
    },
    {
        question: "Qual herói da Marvel é conhecido como o 'Deus do Trovão'?",
        answers: [
            { text: "Hulk", isCorrect: false },
            { text: "Capitão América", isCorrect: false },
            { text: "Homem de Ferro", isCorrect: false },
            { text: "Thor", isCorrect: true }
        ]
    },
    
    // --- Categoria: ESPORTES ---
    {
        question: "Quantos jogadores compõem um time de futebol em campo?",
        answers: [
            { text: "9", isCorrect: false },
            { text: "10", isCorrect: false },
            { text: "11", isCorrect: true },
            { text: "12", isCorrect: false }
        ]
    },
    {
        question: "Qual país sediou a Copa do Mundo de Futebol de 2014?",
        answers: [
            { text: "Alemanha", isCorrect: false },
            { text: "Brasil", isCorrect: true },
            { text: "Rússia", isCorrect: false },
            { text: "África do Sul", isCorrect: false }
        ]
    },
    {
        question: "Em que esporte o termo 'Grand Slam' é mais comumente usado?",
        answers: [
            { text: "Basquete", isCorrect: false },
            { text: "Natação", isCorrect: false },
            { text: "Tênis", isCorrect: true },
            { text: "Vôlei", isCorrect: false }
        ]
    },

    // --- Categoria: HISTÓRIA ---
    {
        question: "Quem foi o primeiro presidente do Brasil?",
        answers: [
            { text: "Dom Pedro I", isCorrect: false },
            { text: "Deodoro da Fonseca", isCorrect: true },
            { text: "Getúlio Vargas", isCorrect: false },
            { text: "Marechal Rondon", isCorrect: false }
        ]
    },
    {
        question: "Em que ano a Segunda Guerra Mundial terminou?",
        answers: [
            { text: "1939", isCorrect: false },
            { text: "1942", isCorrect: false },
            { text: "1945", isCorrect: true },
            { text: "1950", isCorrect: false }
        ]
    },
    {
        question: "Qual civilização antiga construiu as Pirâmides de Gizé?",
        answers: [
            { text: "Romanos", isCorrect: false },
            { text: "Gregos", isCorrect: false },
            { text: "Egípcios", isCorrect: true },
            { text: "Maias", isCorrect: false }
        ]
    }
];

// 2. Referências do DOM
const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const nextButton = document.getElementById("nextBtn");
const finalScreen = document.getElementById("final");
const scoreTextElement = document.getElementById("scoreText");
const quizBox = document.getElementById("quiz-box"); 
const restartButton = document.getElementById("restartBtn"); // Nova referência

// 3. Variáveis de Estado
let currentQuestionIndex = 0; 
let score = 0;
let answerSelected = false; 

// 4. Funções Principais

/** Inicia ou reinicia o estado do quiz. */
function restart() {
    currentQuestionIndex = 0;
    score = 0;
    answerSelected = false;

    // Controla a exibição das telas
    finalScreen.style.display = "none";
    quizBox.style.display = "block"; 
    questionElement.style.display = "block";
    answersContainer.style.display = "flex"; // Garante que answers fica visível
    nextButton.style.display = "none";
    
    loadQuestion();
}

/** Carrega e exibe a pergunta atual. */
function loadQuestion() {
    resetState(); 
    const currentQuestion = questions[currentQuestionIndex];
    
    questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach((answer, i) => {
        const btn = document.createElement("button");
        btn.textContent = answer.text;
        btn.classList.add("answer-btn");
        
        if (answer.isCorrect) {
            btn.dataset.correct = "true";
        }
        
        btn.dataset.index = i; 
        
        answersContainer.appendChild(btn);
    });
}

/** Limpa os botões e oculta o botão "Próxima Pergunta". */
function resetState() {
    nextButton.style.display = "none";
    nextButton.disabled = true; // Desabilita o botão "Próxima Pergunta"
    while (answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild);
    }
}

/** Verifica a resposta selecionada e atualiza a pontuação.
 * @param {HTMLElement} selectedBtn - O botão clicado.
 */
function checkAnswer(selectedBtn) {
    if (answerSelected) return; 

    answerSelected = true;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    // 1. Desativa todos os botões e remove o clique
    Array.from(answersContainer.children).forEach(button => {
        button.disabled = true;
        button.classList.add("disabled"); 
    });

    // 2. Aplica estilos e atualiza pontuação
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
        // Mostra a resposta correta
        const correctButton = Array.from(answersContainer.children).find(b => b.dataset.correct === "true");
        if (correctButton) {
            correctButton.classList.add("correct");
        }
    }

    // 3. Exibe e habilita o botão de próxima pergunta
    nextButton.style.display = "block";
    nextButton.disabled = false;
}

/** Avança para a próxima pergunta ou finaliza o quiz. */
function nextQuestion() {
    currentQuestionIndex++;
    answerSelected = false; 

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        finishQuiz();
    }
}

/** Exibe a tela final com a pontuação. */
function finishQuiz() {
    quizBox.style.display = "none";
    finalScreen.style.display = "block";
    scoreTextElement.textContent = 
        `Você acertou ${score} de ${questions.length} perguntas!`;
}

// 5. Delegação de Eventos (Centraliza os listeners no JS)
answersContainer.addEventListener("click", (e) => {
    if (e.target.matches(".answer-btn")) {
        checkAnswer(e.target);
    }
});

nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restart);

// Inicia o Quiz ao carregar a página
restart();
