/**
 * DADOS DO QUIZ: 10 perguntas de Conhecimento Geral, Geek e História.
 */
const questions = [
    {
        question: "Qual planeta é conhecido como Planeta Vermelho?",
        answers: [
            { text: "Júpiter", correct: false },
            { text: "Marte", correct: true },
            { text: "Saturno", correct: false },
            { text: "Vênus", correct: false }
        ]
    },
    {
        question: "Em que ano a Segunda Guerra Mundial terminou?",
        answers: [
            { text: "1942", correct: false },
            { text: "1945", correct: true },
            { text: "1950", correct: false },
            { text: "1939", correct: false }
        ]
    },
    {
        question: "Qual elemento químico tem o símbolo 'Fe'?",
        answers: [
            { text: "Flúor", correct: false },
            { text: "Fósforo", correct: false },
            { text: "Ferro", correct: true },
            { text: "Cobre", correct: false }
        ]
    },
    {
        question: "Quem é o autor da famosa peça 'Romeu e Julieta'?",
        answers: [
            { text: "Charles Dickens", correct: false },
            { text: "William Shakespeare", correct: true },
            { text: "Jane Austen", correct: false },
            { text: "George Orwell", correct: false }
        ]
    },
    {
        question: "Qual empresa criou o sistema operacional Android?",
        answers: [
            { text: "Apple", correct: false },
            { text: "Microsoft", correct: false },
            { text: "Samsung", correct: false },
            { text: "Google", correct: true }
        ]
    },
    {
        question: "Na série 'Game of Thrones', qual é o nome do continente principal onde a história se passa?",
        answers: [
            { text: "Essos", correct: false },
            { text: "Westeros", correct: true },
            { text: "Sothoryos", correct: false },
            { text: "Ulthos", correct: false }
        ]
    },
    {
        question: "Qual é o maior oceano do mundo?",
        answers: [
            { text: "Atlântico", correct: false },
            { text: "Índico", correct: false },
            { text: "Pacífico", correct: true },
            { text: "Ártico", correct: false }
        ]
    },
    {
        question: "Em que país está localizada a Grande Barreira de Coral?",
        answers: [
            { text: "México", correct: false },
            { text: "Brasil", correct: false },
            { text: "Austrália", correct: true },
            { text: "Indonésia", correct: false }
        ]
    },
    {
        question: "Qual é a capital do Canadá?",
        answers: [
            { text: "Toronto", correct: false },
            { text: "Vancouver", correct: false },
            { text: "Montreal", correct: false },
            { text: "Ottawa", correct: true }
        ]
    },
    {
        question: "Qual famoso cientista desenvolveu a Teoria da Relatividade?",
        answers: [
            { text: "Isaac Newton", correct: false },
            { text: "Albert Einstein", correct: true },
            { text: "Galileu Galilei", correct: false },
            { text: "Nikola Tesla", correct: false }
        ]
    }
];

// VARIÁVEIS DE ESTADO
let currentQuestionIndex = 0;
let score = 0;
let isAnswerSelected = false;

// ELEMENTOS DO DOM
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const characterMessageEl = document.getElementById("characterMessage");

/**
 * Inicia o quiz, resetando pontuação e índice.
 */
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreEl.textContent = `Pontos: 0`;
    nextBtn.classList.add("hidden");
    nextBtn.textContent = "Próxima Pergunta"; // Reseta o texto
    showQuestion();
}

/**
 * Exibe a pergunta atual e as opções.
 */
function showQuestion() {
    isAnswerSelected = false;
    nextBtn.classList.add("hidden");
    
    const q = questions[currentQuestionIndex];
    
    // Atualiza a pergunta
    questionEl.textContent = `${currentQuestionIndex + 1}. ${q.question}`;
    scoreEl.textContent = `Pontos: ${score}`;
    characterMessageEl.textContent = "Escolha a resposta correta para ganhar pontos!";
    
    // Limpa e cria os botões
    answersEl.innerHTML = "";
    
    q.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.textContent = answer.text;
        btn.classList.add("answer-btn");
        
        // Armazena a resposta correta no dataset do botão
        if (answer.correct) {
            btn.dataset.correct = "true";
        }
        
        btn.addEventListener("click", selectAnswer);
        answersEl.appendChild(btn);
    });
}

/**
 * Lida com a seleção de uma resposta e fornece feedback.
 */
function selectAnswer(e) {
    // 1. Previne cliques múltiplos
    if (isAnswerSelected) return;
    isAnswerSelected = true;

    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    // 2. Feedback visual e pontuação
    if (isCorrect) {
        score++;
        selectedBtn.classList.add("correct");
        characterMessageEl.textContent = "Boa! Você acertou! 😄";
    } else {
        selectedBtn.classList.add("incorrect");
        characterMessageEl.textContent = "Ops! Errou 😢. A correta está destacada!";
        
        // Encontra e destaca a resposta correta para aprendizado
        Array.from(answersEl.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            }
        });
    }

    // 3. Desabilita todos os botões e exibe o 'Próxima'
    Array.from(answersEl.children).forEach(button => {
        button.disabled = true;
    });

    scoreEl.textContent = `Pontos: ${score}`;
    nextBtn.classList.remove("hidden");
}

/**
 * Lida com o avanço para a próxima pergunta ou finalização.
 */
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
});

/**
 * Finaliza o quiz e exibe o resultado final.
 */
function endQuiz() {
    questionEl.textContent = "⭐ Quiz Finalizado! ⭐";
    answersEl.innerHTML = "";
    
    // Exibe a pontuação final de forma clara
    const finalScoreMessage = document.createElement('h2');
    finalScoreMessage.innerHTML = `Sua Pontuação Final: <span>${score}/${questions.length}</span>`;
    finalScoreMessage.style.color = '#ffcc00'; 
    answersEl.appendChild(finalScoreMessage);
    
    characterMessageEl.textContent = `Parabéns! Você acertou ${score} de ${questions.length} perguntas. 🎉`;

    nextBtn.textContent = "Jogar Novamente";
    nextBtn.classList.remove("hidden");
    
    // Muda a função do botão para reiniciar o quiz
    nextBtn.onclick = startQuiz;
}

// INÍCIO DO QUIZ
startQuiz();
