const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Who is Elvis Presley's daughter?",
        choice1: 'Hillary Marie',
        choice2: 'Emma Marie',
        choice3: 'Lisa Marie',
        choice4: 'Scarlet Maria',
        answer: 3,
    },
    {
        question:
            "Where is Elvis Presley's mansion located?",
        choice1: "Atlanta",
        choice2: "Memphis",
        choice3: "Las Vegas",
        choice4: "New York",
        answer: 2,
    },
    {
        question: "Where did Elvis and Priscilla Presley meet?",
        choice1: "France",
        choice2: "Germany",
        choice3: "England",
        choice4: "Mexico",
        answer: 2,
    },
    {
        question: "How old was elvis when he died?",
        choice1: "41",
        choice2: "45",
        choice3: "44",
        choice4: "42",
        answer: 4,
    }, 
    {
        question: "How much did Elvis pay to make his first record?",
        choice1: "$7",
        choice2: "$6",
        choice3: "$5",
        choice4: "$4",
        answer: 4,
    }, 
    {
        question: "How much did Elvis pay to make his first record?",
        choice1: "$7",
        choice2: "$6",
        choice3: "$5",
        choice4: "$4",
        answer: 4,
    }, 
    {
        question: "How many movies did Elvis appear in?",
        choice1: "31",
        choice2: "25",
        choice3: "30",
        choice4: "29",
        answer: 1,
    },
    {
        question: "What's Elvis Presley's mansion name?",
        choice1: "Holyland",
        choice2: "Maryland",
        choice3: "Graceland",
        choice4: "Neverland",
        answer: 3,
    },
    {
        question: "How much did Elvis pay for his mansion?",
        choice1: "$200.000",
        choice2: "$102.500",
        choice3: "$154.000",
        choice4: "$115.500",
        answer: 2,
    },
    {
        question: "Where did Elvis grow up?",
        choice1: "Nashville - Tennessee",
        choice2: "Memphis - Tennessee",
        choice3: "Tupelo -  Mississipi",
        choice4: "Jackson - Mississipi",
        answer: 3,
    },
]

const SCORE_POINTS = 15
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()