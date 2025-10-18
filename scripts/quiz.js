// Variables globales
let currentQuestion = 0;
let score = 0;
let userAnswers = [];
let playerName = "";

// Éléments DOM
const playerNameSpan = document.getElementById('player-name');
const questionNumberSpan = document.getElementById('question-number');
const scoreSpan = document.getElementById('score');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressBar = document.getElementById('progress');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');

// Initialisation
function initQuiz() {
    // Récupérer le nom du joueur
    playerName = localStorage.getItem('quizPlayerName') || "Joueur";
    playerNameSpan.textContent = playerName;
    
    // Initialiser les réponses utilisateur
    userAnswers = new Array(quizData.length).fill(null);
    
    // Afficher la première question
    showQuestion();
    
    // Masquer le bouton "Terminer" au début
    submitBtn.style.display = 'none';
}

// Afficher une question
function showQuestion() {
     const question = quizData[currentQuestion];
    
    // Mettre à jour le numéro de question (1/20 au lieu de 1/5)
    questionNumberSpan.textContent = currentQuestion + 1;
    
    // Mettre à jour la barre de progression
    progressBar.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;
    
    // Afficher la question
    questionText.textContent = question.question;
    
    // Afficher les options
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        
        // Vérifier si l'utilisateur a déjà répondu à cette question
        if (userAnswers[currentQuestion] === index) {
            optionElement.classList.add('selected');
        }
        
        optionElement.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });
    
    // Gérer l'affichage des boutons de navigation
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = userAnswers[currentQuestion] === null;
    
    // Afficher/masquer le bouton "Terminer"
    if (currentQuestion === quizData.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
    }
    
    // Mettre à jour le score
    updateScore();
}

// Sélectionner une option
function selectOption(index) {
    // Enregistrer la réponse de l'utilisateur
    userAnswers[currentQuestion] = index;
    
    // Mettre à jour l'affichage des options
    const options = document.querySelectorAll('.option');
    options.forEach((option, i) => {
        if (i === index) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
    
    // Activer le bouton "Suivant"
    nextBtn.disabled = false;
    
    // Calculer le score actuel
    calculateScore();
}

// Calculer le score
function calculateScore() {
    score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer !== null && answer === quizData[index].correct) {
            score++;
        }
    });
    updateScore();
}

// Mettre à jour l'affichage du score
function updateScore() {
    scoreSpan.textContent = score;
}

// Question précédente
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

// Question suivante
function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        showQuestion();
    }
}

// Soumettre le quiz
function submitQuiz() {
    // Sauvegarder les résultats dans le localStorage
    localStorage.setItem('quizUserAnswers', JSON.stringify(userAnswers));
    localStorage.setItem('quizScore', score.toString());
    
    // Rediriger vers la page des résultats
    window.location.href = 'results.html';
}

// Événements
prevBtn.addEventListener('click', prevQuestion);
nextBtn.addEventListener('click', nextQuestion);
submitBtn.addEventListener('click', submitQuiz);

// Initialiser le quiz quand la page est chargée
document.addEventListener('DOMContentLoaded', initQuiz);