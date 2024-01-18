const pairsData = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const gameContainer = document.getElementById('game-container');
const resultsContainer = document.getElementById('results-container');

let selectedCards = [];
let matchedPairs = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
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
            resultsContainer.innerHTML = 'Congratulations! You found all pairs!';
        }
    } else {
        card1.textContent = '?';
        card2.textContent = '?';
    }

    selectedCards = [];
}

// Generate game on page load
generateGame();
