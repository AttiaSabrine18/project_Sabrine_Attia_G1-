// Données du quiz - HTML/CSS/JavaScript
const quizData = [
    // HTML Questions
    {
        question: "Que signifie l'acronyme HTML ?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language", 
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "Quelle balise HTML est utilisée pour créer un lien hypertexte ?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        correct: 1
    },
    {
        question: "Quelle balise est utilisée pour insérer une image en HTML ?",
        options: ["<picture>", "<img>", "<image>", "<src>"],
        correct: 1
    },
    {
        question: "Quel attribut HTML est utilisé pour définir des styles en ligne ?",
        options: ["class", "styles", "css", "style"],
        correct: 3
    },
    {
        question: "Quelle balise HTML est utilisée pour créer une liste non ordonnée ?",
        options: ["<ol>", "<list>", "<ul>", "<li>"],
        correct: 2
    },

    // CSS Questions
    {
        question: "Que signifie l'acronyme CSS ?",
        options: [
            "Computer Style Sheets",
            "Creative Style System",
            "Cascading Style Sheets", 
            "Colorful Style Sheets"
        ],
        correct: 2
    },
    {
        question: "Quelle propriété CSS est utilisée pour changer la couleur du texte ?",
        options: ["text-color", "font-color", "color", "text-style"],
        correct: 2
    },
    {
        question: "Comment centrer horizontalement un élément block en CSS ?",
        options: [
            "text-align: center;",
            "align: center;", 
            "margin: auto;",
            "center: true;"
        ],
        correct: 2
    },
    {
        question: "Quelle propriété CSS permet d'ajouter de l'espace entre le contenu et la bordure ?",
        options: ["margin", "spacing", "padding", "border-space"],
        correct: 2
    },
    {
        question: "Quelle unité CSS est relative à la taille de police de l'élément parent ?",
        options: ["px", "rem", "vw", "em"],
        correct: 3
    },

    // JavaScript Questions
    {
        question: "Quel mot-clé est utilisé pour déclarer une variable en JavaScript ?",
        options: ["variable", "var", "let", "Both var and let"],
        correct: 3
    },
    {
        question: "Quelle méthode JavaScript permet de sélectionner un élément par son ID ?",
        options: [
            "document.querySelector()",
            "document.getElementById()", 
            "document.getElementByID()",
            "document.selectId()"
        ],
        correct: 1
    },
    {
        question: "Quel opérateur est utilisé pour comparer à la fois la valeur et le type ?",
        options: ["==", "===", "=", "!="],
        correct: 1
    },
    {
        question: "Comment ajouter un commentaire sur une ligne en JavaScript ?",
        options: [
            "// Ceci est un commentaire",
            "<!-- Ceci est un commentaire -->", 
            "/* Ceci est un commentaire */",
            "# Ceci est un commentaire"
        ],
        correct: 0
    },
    {
        question: "Quelle méthode permet de convertir une chaîne en nombre entier ?",
        options: ["Number()", "parseInt()", "parseFloat()", "toInteger()"],
        correct: 1
    },

    // Questions mixtes avancées
    {
        question: "Quelle propriété CSS permet de créer des animations ?",
        options: ["animation", "transition", "transform", "keyframes"],
        correct: 0
    },
    {
        question: "Quelle méthode JavaScript permet d'ajouter un élément à la fin d'un tableau ?",
        options: ["push()", "append()", "add()", "insert()"],
        correct: 0
    },
    {
        question: "Quel sélecteur CSS cible tous les éléments <p> qui sont des enfants directs d'un <div> ?",
        options: ["div p", "div > p", "div + p", "div.p"],
        correct: 1
    },
    {
        question: "Quelle méthode JavaScript est utilisée pour exécuter une fonction après un délai ?",
        options: ["setTimeout()", "delay()", "wait()", "setInterval()"],
        correct: 0
    },
    {
        question: "Quelle balise HTML est utilisée pour intégrer du JavaScript dans une page ?",
        options: ["<javascript>", "<js>", "<script>", "<code>"],
        correct: 2
    }
];