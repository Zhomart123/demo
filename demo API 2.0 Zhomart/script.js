const apiUrl = 'https://opentdb.com/api.php?amount=5&category=18&type=multiple';
let questions = [];
let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const nextButton = document.getElementById('next-btn');
const scoreDisplay = document.getElementById('score-display');

async function fetchQuestions() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        questions = data.results;
        displayQuestion();
    } catch (error) {
        console.error(error);
    }
}

function displayQuestion() {
    resetState();
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = decodeHtml(currentQuestion.question);
        const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
        answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = decodeHtml(answer);
            button.classList.add('btn', 'btn-outline-secondary');
            button.onclick = () => selectAnswer(button, currentQuestion.correct_answer);
            answersElement.appendChild(button);
        });
    } else {
        showScore();
    }
}

function selectAnswer(button, correctAnswer) {
    const isCorrect = button.textContent === decodeHtml(correctAnswer);
    button.classList.remove('btn-outline-secondary');
    button.classList.add(isCorrect ? 'btn-success' : 'btn-danger');
    if (isCorrect) score++;
    Array.from(answersElement.children).forEach(btn => btn.disabled = true);
    nextButton.style.display = 'block';
}

function resetState() {
    nextButton.style.display = 'none';
    answersElement.innerHTML = '';
}

function selectAnswer(button, correctAnswer) {
    const isCorrect = button.textContent === decodeHtml(correctAnswer);
    button.classList.remove('btn-outline-secondary');
    button.classList.add(isCorrect ? 'btn-success' : 'btn-danger');
    if (isCorrect) score++;
    Array.from(answersElement.children).forEach(btn => btn.disabled = true);
    nextButton.style.display = 'block';
}
function resetState() {
    nextButton.style.display = 'none';
    answersElement.innerHTML = '';
}
function showScore() {
    questionElement.style.display = 'none';
    answersElement.style.display = 'none';
    nextButton.style.display = 'none';
    scoreDisplay.style.display = 'block';
    scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}`;
}
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    displayQuestion();
});
fetchQuestions();