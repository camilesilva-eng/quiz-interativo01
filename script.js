  // 1. Estrutura de Dados (Melhoria: Objeto para cada resposta)
// Isso torna o array mais legível, e a lógica de verificação mais clara e escalável.
const questions = [
    {
        question: "Qual é o maior planeta do Sistema Solar?",
        answers: [
            { text: "Terra", isCorrect: false },
            { text: "Marte", isCorrect: false },
            { text: "Júpiter", isCorrect: true },
            { text: "Vênus", isCorrect: false }
        ]
    },
    {
        question: "Quem descobriu o Brasil?",
        answers: [
            { text: "Pedro Álvares Cabral", isCorrect: true },
            { text: "Cristóvão Colombo", isCorrect: false },
            { text: "Dom Pedro I", isCorrect: false },
            { text: "Vasco da Gama", isCorrect: false }
        ]
    },
    {
        question: "Qual país venceu a Copa de 2002?",
        answers: [
            { text: "Alemanha", isCorrect: false },
            { text: "Brasil", isCorrect: true },
            { text: "Argentina", isCorrect: false },
            { text: "Itália", isCorrect: false }
        ]
    }
];

// 2. Referências do DOM (Melhoria: Armazenar referências globalmente)
// Reduz as chamadas repetidas a document.getElementById()
const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const nextButton = document.getElementById("nextBtn");
const finalScreen = document.getElementById("final");
const scoreTextElement = document.getElementById("scoreText");
const quizBox = document.getElementById("quiz-box"); // Adicionado para controle de exibição

// 3. Variáveis de Estado
let currentQuestionIndex = 0; // Renomeado de 'index' para clareza
let score = 0;
let answerSelected = false; // Nova flag para evitar cliques múltiplos

// 4. Funções Principais

/** Inicia ou reinicia o estado do quiz. */
function restart() {
    currentQuestionIndex = 0;
    score = 0;
    answerSelected = false;

    // Controla a exibição das telas
    finalScreen.style.display = "none";
    quizBox.style.display = "block"; // Garante que a caixa principal está visível
    questionElement.style.display = "block";
    answersContainer.style.display = "block";
    nextButton.style.display = "none";
    
    loadQuestion();
}

/** Carrega e exibe a pergunta atual. */
function loadQuestion() {
    resetState(); // Limpa o estado anterior
    const currentQuestion = questions[currentQuestionIndex];
    
    // Exibe o número da pergunta e o texto
    questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach((answer, i) => {
        const btn = document.createElement("button");
        btn.textContent = answer.text;
        btn.classList.add("answer-btn"); // Adiciona classe para estilização e delegação de evento
        
        // Armazena a correção no dataset em vez de no evento, mais limpo
        if (answer.isCorrect) {
            btn.dataset.correct = "true";
        }
        
        // Atribui o índice da resposta (i) para a verificação
        btn.dataset.index = i; 
        
        answersContainer.appendChild(btn);
    });
}

/** Limpa os botões e oculta o botão "Próxima Pergunta". */
function resetState() {
    nextButton.style.display = "none";
    while (answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild);
    }
}

/** * Verifica a resposta selecionada e atualiza a pontuação.
 * @param {HTMLElement} selectedBtn - O botão clicado.
 */
function checkAnswer(selectedBtn) {
    if (answerSelected) return; // Se a resposta já foi selecionada, ignora

    answerSelected = true;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    // 1. Desativa todos os botões e remove o clique
    Array.from(answersContainer.children).forEach(button => {
        button.disabled = true;
        button.classList.add("disabled"); // Classe CSS para visualmente indicar desativado
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

    // 3. Exibe o botão de próxima pergunta
    nextButton.style.display = "block";
}


/** Avança para a próxima pergunta ou finaliza o quiz. */
function nextQuestion() {
    currentQuestionIndex++;
    answerSelected = false; // Reseta a flag para a próxima pergunta

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

// 5. Delegação de Eventos (Melhoria: Centraliza o listener)
// Em vez de adicionar um listener a cada botão criado (no loadQuestion), 
// adicionamos um único listener ao container pai (answersContainer).
answersContainer.addEventListener("click", (e) => {
    // Verifica se o clique foi em um botão de resposta e não no container em si
    if (e.target.matches(".answer-btn")) {
        checkAnswer(e.target);
    }
});


// As funções 'nextQuestion' e 'restart' são chamadas pelo HTML (onclick), 
// mas é bom remover o 'onclick' do HTML e usar addEventListener para uma separação 
// de responsabilidades mais limpa (veja Observações).

// Inicia o Quiz
restart();
