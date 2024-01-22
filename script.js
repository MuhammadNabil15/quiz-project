const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "Berlin", "Madrid", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which programming language is this quiz written in?",
        options: ["JavaScript", "Python", "Java", "C++"],
        correctAnswer: "JavaScript"
    },
    // Add more questions as needed
];

const pairsData = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const quizContainer = document.getElementById('quiz-container');
const resultsContainerQuiz = document.getElementById('results-container');
const submitBtn = document.getElementById('submit-btn');

const gameContainer = document.getElementById('game-container');
const resultsContainerGame = document.getElementById('results-container');

let selectedCards = [];
let matchedPairs = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function generateQuiz() {
    let quizHTML = "";
    quizData.forEach((question, index) => {
        quizHTML += `<div class="question">
                        <p>${index + 1}. ${question.question}</p>`;
        question.options.forEach(option => {
            quizHTML += `<label>
                            <input type="radio" name="q${index}" value="${option}">
                            ${option}
                        </label>`;
        });
        quizHTML += `</div>`;
    });
    quizContainer.innerHTML = quizHTML;
}

function submitQuiz() {
    let score = 0;
    quizData.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedOption) {
            if (selectedOption.value === question.correctAnswer) {
                score++;
            }
        }
    });
    resultsContainerQuiz.innerHTML = `Your score: ${score} out of ${quizData.length}`;
}

function generateGame() {
    const shuffledPairs = shuffle([...pairsData, ...pairsData]);

    shuffledPairs.forEach((pair, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-index', index);
        card.textContent = '?';
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
    });
}

function flipCard() {
    if (selectedCards.length < 2) {
        const selectedCard = this;
        selectedCard.textContent = pairsData[selectedCard.getAttribute('data-index')];

        selectedCards.push(selectedCard);

        if (selectedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch() {
    const [card1, card2] = selectedCards;
    const value1 = pairsData[card1.getAttribute('data-index')];
    const value2 = pairsData[card2.getAttribute('data-index')];

    if (value1 === value2) {
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);

        matchedPairs++;
        if (matchedPairs === pairsData.length) {
            resultsContainerGame.innerHTML = 'Congratulations! You found all pairs!';
        }
    } else {
        card1.textContent = '?';
        card2.textContent = '?';
    }

    selectedCards = [];
}

// Generate quiz on page load
generateQuiz();
// Generate game on page load
generateGame();
