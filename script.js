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

const quizContainer = document.getElementById('quiz-container');
const resultsContainer = document.getElementById('results-container');
const submitBtn = document.getElementById('submit-btn');

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
    resultsContainer.innerHTML = `Your score: ${score} out of ${quizData.length}`;
}

// Generate quiz on page load
generateQuiz();
