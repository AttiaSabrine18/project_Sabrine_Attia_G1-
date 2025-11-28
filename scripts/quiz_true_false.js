let questions = [];
let index = 0;
let score = 0;
let timer;
let timeLeft = 20;

const questionEl = document.getElementById("question-text");
const feedbackEl = document.getElementById("feedback");
const timerEl = document.getElementById("timer");
const progressEl = document.getElementById("progress");

async function loadQuestions() {
    const response = await fetch("../scripts/questions_vf.json");
    const data = await response.json();
    questions = data.questions;
    startQuiz();
}

function startQuiz() {
    index = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timer);

    const q = questions[index];
    questionEl.textContent = q.question;
    feedbackEl.textContent = "";

    progressEl.style.width = ((index) / questions.length) * 100 + "%";

    startTimer();
}

function startTimer() {
    timeLeft = 20;
    timerEl.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            feedbackEl.textContent = "Temps écoulé.";
            setTimeout(nextQuestion, 1000);
        }
    }, 1000);
}

function checkAnswer(resp) {
    clearInterval(timer);

    const correct = questions[index].answer;

    if (resp === correct) {
        score++;
        feedbackEl.textContent = "Correct !";
    } else {
        feedbackEl.textContent = "Incorrect !";
    }

    setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
    index++;

    if (index < questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    document.querySelector(".quiz-box").classList.add("hidden");
    document.querySelector(".result-box").classList.remove("hidden");

    document.getElementById("score").textContent = score;

    let best = localStorage.getItem("bestScore_vf") || 0;
    if (score > best) {
        best = score;
        localStorage.setItem("bestScore_vf", best);
    }

    document.getElementById("bestScore").textContent = best;
}

function restartQuiz() {
    document.querySelector(".result-box").classList.add("hidden");
    document.querySelector(".quiz-box").classList.remove("hidden");
    startQuiz();
}

loadQuestions();
