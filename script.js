/**
 * DADOS DO QUIZ: Adicione mais perguntas aqui!
 * Estrutura: { question: string, answers: [{ text: string, correct: boolean }] }
 */
const questions = [
    {
        question: "Qual planeta é conhecido como Planeta Vermelho?",
        answers: [
            { text: "Marte", correct: true },
            { text: "Júpiter", correct: false },
            { text: "Saturno", correct: false },
            { text: "Vênus", correct: false }
        ],
        hint: "Seu nome vem do deus romano da guerra."
    },
    {
        question: "Quem é creditado por ter inventado a lâmpada incandescente de uso comercial prático?",
        answers: [
            { text: "Thomas Edison", correct: true },
            { text: "Albert Einstein", correct: false },
            { text: "Nikola Tesla", correct: false },
            { text: "Alexander Graham Bell", correct: false }
        ],
        hint: "Seu laboratório ficava em Menlo Park."
    },
    {
        question: "Quanto é 8 × 7?",
        answers: [
            { text: "56", correct: true },
            { text: "54", correct: false },
            { text: "49", correct: false },
            { text: "64", correct: false }
        ],
        hint: "É também a soma de 7+7+7+7+7+7+7+7."
    },
    {
        question: "Qual elemento químico tem o símbolo 'Fe'?",
        answers: [
            { text: "Flúor", correct: false },
            { text: "Ferro", correct: true },
            { text: "Fósforo", correct: false },
            { text: "Frâncio", correct: false }
        ],
        hint: "Metal muito usado em construções."
    }
    // Adicione mais perguntas aqui para um quiz maior!
];

// 1. VARIÁVEIS DE ESTADO
let currentQuestionIndex = 0; // Renomeado para maior clareza
let score = 0;
let isAnswerSelected = false; // Novo estado para prevenir múltiplos cliques

// 2. ELEMENTOS DO DOM (Usando a nova estrutura HTML)
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const characterMessageEl = document.getElementById("characterMessage"); // Renomeado para melhor convenção
const questionAreaEl = document.getElementById("question-area"); // Novo elemento para ocultar tudo

/**
 * Inicia o quiz
 */
function startQuiz() {
    // Garante que o estado inicial esteja correto
    currentQuestionIndex = 0;
    score = 0;
    scoreEl.textContent = `Pontos: 0`;
    nextBtn.classList.add("hidden");
    questionAreaEl.classList.remove("hidden"); // Se precisar reexibir

    showQuestion();
}

/**
 * Exibe a pergunta atual e as opções
 */
function showQuestion() {
    isAnswerSelected = false; // Reseta o estado de clique
    nextBtn.classList.add("hidden");
    
    const q = questions[currentQuestionIndex];
    
    // Atualiza a pergunta
    questionEl.textContent = `${currentQuestionIndex + 1}. ${q.question}`;

    // Atualiza o placar no topo
    scoreEl.textContent = `Pontos: ${score}`;
    
    // Feedback inicial do mascote
    characterMessageEl.textContent = "Escolha a resposta correta para ganhar pontos!";
    
    // Limpa e cria os botões de resposta
    answersEl.innerHTML = "";
    
    q.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.textContent = answer.text;
        btn.classList.add("answer-btn");
        
        // Armazena a resposta correta no dataset do botão (melhor prática)
        if (answer.correct) {
            btn.dataset.correct = "true";
        }
        
        // Adiciona o event listener
        btn.addEventListener("click", selectAnswer);
        
        answersEl.appendChild(btn);
    });
}

/**
 * Lida com a seleção de uma resposta
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
        characterMessageEl.textContent = "Ops! Errou 😢. A resposta correta está destacada!";
        
        // Encontra e destaca a resposta correta
        Array.from(answersEl.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            }
        });
    }

    // 3. Desabilita todos os botões de resposta e exibe o botão 'Próxima'
    Array.from(answersEl.children).forEach(button => {
        button.disabled = true;
    });

    // Atualiza o placar e mostra o botão de avanço
    scoreEl.textContent = `Pontos: ${score}`;
    nextBtn.classList.remove("hidden");
}

/**
 * Lida com o botão 'Próxima Pergunta'
 */
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        // Se houver mais perguntas, mostra a próxima
        showQuestion();
    } else {
        // Se acabou, finaliza o quiz
        endQuiz();
    }
});

/**
 * Finaliza o quiz e exibe o resultado
 */
function endQuiz() {
    questionEl.textContent = "⭐ Quiz Finalizado! ⭐";
    answersEl.innerHTML = "";
    
    // Exibe a pontuação final de forma clara
    const finalScoreMessage = document.createElement('h2');
    finalScoreMessage.innerHTML = `Sua Pontuação Final: <span>${score}/${questions.length}</span>`;
    finalScoreMessage.style.color = '#ffcc00'; 
    answersEl.appendChild(finalScoreMessage);
    
    characterMessageEl.textContent = `Parabéns! Você alcançou ${score} acertos. 🎉`;

    nextBtn.textContent = "Jogar Novamente";
    nextBtn.classList.remove("hidden");
    
    // Muda a função do botão para recarregar ou reiniciar
    nextBtn.onclick = () => {
        // Uma forma simples de reiniciar
        window.location.reload(); 
        // Ou chame startQuiz() para um reinício sem recarregar a página
    };
}


// INÍCIO DO QUIZ
startQuiz();
