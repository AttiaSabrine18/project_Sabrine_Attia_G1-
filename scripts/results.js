 // Initialisation des particules
        document.addEventListener('DOMContentLoaded', function() {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 60, density: { enable: true, value_area: 800 } },
                    color: { value: "#00b4d8" },
                    shape: { type: "circle" },
                    opacity: { value: 0.5, random: true },
                    size: { value: 3, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#00b4d8",
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "repulse" },
                        onclick: { enable: true, mode: "push" }
                    }
                }
            });
            
            // Afficher les résultats
            showResults();
            
            // Effet sonore de célébration pour les bons scores
            const score = parseInt(localStorage.getItem('quizScore') || "0");
            if (score >= 15) {
                setTimeout(() => {
                    document.getElementById('celebration-sound').play();
                }, 1000);
            }
        });

        // Éléments DOM
        const resultName = document.getElementById('result-name');
        const finalScore = document.getElementById('final-score');
        const resultTitle = document.getElementById('result-title');
        const resultMessage = document.getElementById('result-message');
        const resultsGrid = document.getElementById('results-grid');
        const restartBtn = document.getElementById('restart-btn');
        const homeBtn = document.getElementById('home-btn');
        const correctCount = document.getElementById('correct-count');
        const incorrectCount = document.getElementById('incorrect-count');
        const percentage = document.getElementById('percentage');

        // Afficher les résultats
        function showResults() {
            // Récupérer les données du localStorage
            const playerName = localStorage.getItem('quizPlayerName') || "Joueur";
            const userAnswers = JSON.parse(localStorage.getItem('quizUserAnswers') || "[]");
            const score = parseInt(localStorage.getItem('quizScore') || "0");
            
            // Afficher le nom et le score
            resultName.textContent = playerName;
            
            // Animation du compteur de score
            animateScoreCounter(0, score, 1500, finalScore);
            
            // Calculer les statistiques
            const correctAnswers = userAnswers.filter((answer, index) => 
                answer !== null && answer === quizData[index].correct
            ).length;
            const incorrectAnswers = userAnswers.filter((answer, index) => 
                answer !== null && answer !== quizData[index].correct
            ).length;
            const percentageValue = Math.round((score / quizData.length) * 100);
            
            // Animer les statistiques
            animateValue(0, correctAnswers, 1500, correctCount);
            animateValue(0, incorrectAnswers, 1500, incorrectCount);
            animateValue(0, percentageValue, 1500, percentage, true);
            
            // Personnaliser le message en fonction du score
            customizeResultMessage(score, playerName, resultTitle, resultMessage);
            
            // Afficher la grille de résultats
            displayResultsGrid(userAnswers);
            
            // Animation du cercle de score
            animateScoreCircle(percentageValue);
        }

        // Animation du compteur de score
        function animateScoreCounter(start, end, duration, element) {
            const range = end - start;
            const increment = end > start ? 1 : -1;
            const stepTime = Math.abs(Math.floor(duration / range));
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                element.textContent = current;
                
                if (current === end) {
                    clearInterval(timer);
                }
            }, stepTime);
        }

        // Animation des valeurs numériques
        function animateValue(start, end, duration, element, isPercentage = false) {
            const range = end - start;
            const increment = end > start ? 1 : -1;
            const stepTime = Math.abs(Math.floor(duration / range));
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                element.textContent = isPercentage ? current + "%" : current;
                
                if (current === end) {
                    clearInterval(timer);
                }
            }, stepTime);
        }

        // Personnaliser le message de résultat
        function customizeResultMessage(score, playerName, titleElement, messageElement) {
            if (score === quizData.length) {
                titleElement.textContent = "Score Parfait, " + playerName + " !";
                messageElement.textContent = "Incroyable ! Vous avez maîtrisé tous les concepts";
                messageElement.style.color = "var(--success-color)";
                titleElement.style.color = "var(--cyan-light)";
                createConfettiEffect();
            } else if (score >= quizData.length * 0.8) {
                titleElement.textContent = "Excellent Travail, " + playerName + " !";
                messageElement.textContent = "Vous avez une excellente compréhension des concepts";
                messageElement.style.color = "var(--success-color)";
                titleElement.style.color = "var(--cyan-light)";
            } else if (score >= quizData.length / 2) {
                titleElement.textContent = "Bon Score, " + playerName + " !";
                messageElement.textContent = "Vous avez une bonne base, continuez à pratiquer ";
                messageElement.style.color = "var(--warning-color)";
                titleElement.style.color = "var(--cyan-light)";
            } else {
                titleElement.textContent = "Continuez à Apprendre, " + playerName + " !";
                messageElement.textContent = "Chaque erreur est une opportunité d'apprentissage";
                messageElement.style.color = "var(--accent-color)";
                titleElement.style.color = "var(--cyan-light)";
            }
            
            titleElement.style.textAlign = "center";
            titleElement.style.paddingTop = "40px";
        }

        // Animation du cercle de score
        function animateScoreCircle(percentage) {
            const circleBg = document.querySelector('.score-circle-bg');
            const circumference = 2 * Math.PI * 70; // Rayon du cercle
            
            // Animation du cercle de progression
            setTimeout(() => {
                circleBg.style.strokeDasharray = circumference;
                circleBg.style.strokeDashoffset = circumference - (percentage / 100) * circumference;
            }, 500);
        }

        // Afficher la grille de résultats avec animations
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
                        icon.innerHTML = '<i class="fas fa-check"></i>';
                    } else {
                        resultBox.classList.add('incorrect');
                        icon.innerHTML = '<i class="fas fa-times"></i>';
                    }
                    
                    // Animation avec délai progressif
                    resultBox.style.animationDelay = `${i * 0.1}s`;
                    
                    // Tooltip avec la question
                    resultBox.title = `Question ${i + 1}: ${quizData[i].question}`;
                    
                    // Effet au survol
                    resultBox.addEventListener('mouseenter', function() {
                        this.style.transform = 'scale(1.1) rotate(5deg)';
                    });
                    
                    resultBox.addEventListener('mouseleave', function() {
                        this.style.transform = 'scale(1) rotate(0deg)';
                    });
                } else {
                    resultBox.classList.add('empty');
                    icon.innerHTML = '<i class="fas fa-question"></i>';
                    status.textContent = '-';
                }
                
                resultBox.appendChild(questionNumber);
                resultBox.appendChild(icon);
                resultBox.appendChild(status);
                resultsGrid.appendChild(resultBox);
            }
        }

        // Effet de confettis pour les scores élevés
        function createConfettiEffect() {
            const confettiContainer = document.createElement('div');
            confettiContainer.className = 'confetti-container';
            document.body.appendChild(confettiContainer);
            
            const colors = ['#00b4d8', '#ff6b6b', '#51cf66', '#fcc419', '#9d4edd'];
            
            for (let i = 0; i < 100; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = Math.random() * 5 + 's';
                confettiContainer.appendChild(confetti);
            }
        }

        // Événements
        restartBtn.addEventListener('click', function() {
            document.getElementById('click-sound').play();
            // Animation de transition
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                window.location.href = 'quiz.html';
            }, 300);
        });

        homeBtn.addEventListener('click', function() {
            document.getElementById('click-sound').play();
            // Animation de transition
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 300);
        });