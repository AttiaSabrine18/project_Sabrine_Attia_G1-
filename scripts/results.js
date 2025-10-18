// Éléments DOM
const resultName = document.getElementById('result-name');
const finalScore = document.getElementById('final-score');
const resultTitle = document.getElementById('result-title');
const resultMessage = document.getElementById('result-message');
const resultsGrid = document.getElementById('results-grid');
const restartBtn = document.getElementById('restart-btn');
const homeBtn = document.getElementById('home-btn');

// Afficher les résultats
function showResults() {
    // Récupérer les données du localStorage
    const playerName = localStorage.getItem('quizPlayerName') || "Joueur";
    const userAnswers = JSON.parse(localStorage.getItem('quizUserAnswers') || "[]");
    const score = parseInt(localStorage.getItem('quizScore') || "0");
    
    // Afficher le nom et le score
    resultName.textContent = playerName;
    finalScore.textContent = score;
    
    // Personnaliser le message en fonction du score
    if (score === quizData.length) {
        resultTitle.textContent = "Félicitations, " + playerName + " !";
        resultMessage.textContent = "Vous avez obtenu un score parfait !";
        resultMessage.style.color = "var(--success-color)";
    } else if (score >= quizData.length / 2) {
        resultTitle.textContent = "Bon travail, " + playerName + " !";
        resultMessage.textContent = "Vous avez bien répondu à la majorité des questions.";
        resultMessage.style.color = "var(--primary-color)";
        resultTitle.style.textAlign = "center"
        resultTitle.style.color = " #53d1df"
        resultTitle.style.paddingTop = "40px"


    } else {
        resultTitle.textContent = "Dommage, " + playerName + " !";
        resultMessage.textContent = "Vous pouvez faire mieux la prochaine fois !";
        resultMessage.style.color = "var(--accent-color)";
    }
    
    // Afficher la grille de résultats
    displayResultsGrid(userAnswers);
}

// Afficher la grille de résultats
function displayResultsGrid(userAnswers) {
    resultsGrid.innerHTML = '';
    
    for (let i = 0; i < 20; i++) {
        const resultBox = document.createElement('div');
        resultBox.classList.add('result-box');
        
        const questionNumber = document.createElement('div');
        questionNumber.classList.add('result-number');
        questionNumber.textContent = `Q${i + 1}`;
        
        const icon = document.createElement('div');
        icon.classList.add('result-icon');
        
        const status = document.createElement('div');
        status.classList.add('result-status');
        
        if (i < userAnswers.length) {
            const userAnswer = userAnswers[i];
            const isCorrect = userAnswer === quizData[i].correct;
            
            if (isCorrect) {
                resultBox.classList.add('correct');
                icon.textContent = '✓';
            } else {
                resultBox.classList.add('incorrect');
                icon.textContent = '✗';
            }
            
            // Ajouter un effet de hover avec délai
            resultBox.style.animationDelay = `${i * 0.1}s`;
            
            // Ajouter un tooltip au survol
            resultBox.title = `Question ${i + 1}: ${quizData[i].question}`;
        } else {
            resultBox.classList.add('empty');
            icon.textContent = '?';
            status.textContent = '-';
        }
        
        resultBox.appendChild(questionNumber);
        resultBox.appendChild(icon);
        resultBox.appendChild(status);
        resultsGrid.appendChild(resultBox);
    }
}

// Événements
restartBtn.addEventListener('click', function() {
    // Redémarrer le quiz
    window.location.href = 'quiz.html';
});

homeBtn.addEventListener('click', function() {
    // Retourner à l'accueil
    window.location.href = '../index.html';
});

// Afficher les résultats quand la page est chargée
document.addEventListener('DOMContentLoaded', showResults);