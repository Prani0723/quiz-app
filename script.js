const questions = [
    {
        question: "What is JavaScript?",
        answers: [
            { text: "Programming Language", correct: true },
            { text: "Database", correct: false },
            { text: "Operating System", correct: false },
            { text: "Browser", correct: false }
        ]
    },
    {
        question: "Which keyword is used for variable?",
        answers: [
            { text: "let", correct: true },
            { text: "int", correct: false },
            { text: "define", correct: false },
            { text: "varible", correct: false }
        ]
    },
    {
        question: "HTML stands for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Text Machine Language", correct: false },
            { text: "Hyper Transfer Mark Language", correct: false },
            { text: "None", correct: false }
        ]
    }
];

// Get Elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score");
const progressBar = document.getElementById("progress");

// Variables
let currentQuestionIndex = 0;
let score = 0;

// Start Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    scoreDisplay.innerHTML = "";
    showQuestion();
}

// Show Question
function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    // Update Progress Bar
    progressBar.style.width =
        (currentQuestionIndex / questions.length) * 100 + "%";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;

        button.addEventListener("click", () => selectAnswer(answer, button));

        answerButtons.appendChild(button);
    });
}

// Reset UI
function resetState() {
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
}

// Handle Answer Click
function selectAnswer(answer, clickedButton) {

    if (answer.correct) {
        clickedButton.classList.add("correct");
        score++;
    } else {
        clickedButton.classList.add("wrong");
    }

    // Highlight correct answer
    Array.from(answerButtons.children).forEach(button => {
        const correctAnswer = questions[currentQuestionIndex].answers.find(a => a.correct);

        if (button.innerHTML === correctAnswer.text) {
            button.classList.add("correct");
        }

        button.disabled = true;
    });

    nextButton.style.display = "block";
}

// Next Button Click
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

// Show Final Score
function showScore() {
    resetState();

    questionElement.innerHTML = "🎉 Quiz Completed!";
    progressBar.style.width = "100%";

    scoreDisplay.innerHTML = `Your Score: ${score} / ${questions.length}`;

    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";

    nextButton.onclick = startQuiz;
}

// Start App
startQuiz();