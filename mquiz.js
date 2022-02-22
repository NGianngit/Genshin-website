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
        question: 'The city of Mondstadt is also known as',
        choice1: 'The city of freedom',
        choice2: 'The city of wind',
        choice3: 'The city of bards',
        choice4: 'The city of tempest',
        answer: 1,
    },
    {
        question: 'An event held anually in Mondstadt is',
        choice1: 'Windchase',
        choice2: 'Windtrace',
        choice3: 'hide and seek',
        choice4: 'Prop hunt',
        answer: 2,
    },
    {
        question: 'Andrius is also known as the',
        choice1: 'Wolf god',
        choice2: 'King of the north wind',
        choice3: 'King of ice and frost',
        choice4: 'great wolf of the north',
        answer: 2,
    },
    {
        question: 'Who is the archon of mondstadt?',
        choice1: 'Barbatos',
        choice2: 'Sucrose',
        choice3: 'Varka',
        choice4: 'Jean',
        answer: 1,
    },{
        question: 'Which is not a clan belonging to Mondstadt',
        choice1: 'Gunnhildr clan',
        choice2: 'Lawrence clan',
        choice3: 'Imunlaukr clan',
        choice4: 'Burgundian clan',
        answer: 4,
    },{
        question: 'What festival is held in Mondstadt yearly',
        choice1: 'Windblume festival',
        choice2: 'Windtrace festival',
        choice3: 'Festival of freedom',
        choice4: "Decarabian's festival",
        answer: 1,
    },{
        question: 'What is the element accociated with Mondstadt?',
        choice1: 'Geo',
        choice2: 'Pyro',
        choice3: 'Anemo',
        choice4: 'Hydro',
        answer: 3,
    },{
        question: 'What is the name of the church in Mondstadt?',
        choice1: 'Church of Barbatos',
        choice2: 'Church of Freedom',
        choice3: 'Church of Favonius',
        choice4: 'Church of Mondstadt',
        answer: 3,
    },{
        question: "What causes Dragonspine's weather to be so cold",
        choice1: 'Natural causes',
        choice2: 'The corpse of a dragon',
        choice3: 'The Skyfrost Nail',
        choice4: 'The destruction of Sal Vindagnyr',
        answer: 3,
    },{
        question: 'How long does the Ludi Harpastum last?',
        choice1: '5 days',
        choice2: '10 days',
        choice3: '15 days',
        choice4: '20 days',
        answer: 3,
    },{
        question: 'In the story, what was the Holy lyre der himmel used for',
        choice1: 'A public lyre for bards to play',
        choice2: "to purify Dvalin's tear",
        choice3: "To calm Dvalin",
        choice4: 'Grand prize for Windblume festival',
        answer: 3,
    },{
        question: 'Which area is not part of Mondstadt?',
        choice1: 'Starsnatch cliff',
        choice2: 'Stormterror lair',
        choice3: 'Galesong hill',
        choice4: 'Guyun stone forest',
        answer: 4,
    },{
        question: 'Dawn Winery is famous for their',
        choice1: 'Sakura sake',
        choice2: 'Osmanthus wine',
        choice3: 'Dandelion wine',
        choice4: 'Sweet flower beer',
        answer: 3,
    },{
        question: 'Musk reef contains',
        choice1: 'Spiral abyss',
        choice2: 'Sundail of time',
        choice3: 'Dandelion sea',
        choice4: 'The Chasm',
        answer: 1,
    },{
        question: 'How many villages/cities are there in Mondstadt?',
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: '4',
        answer: 3,
    },{
        question: 'Where in Teyvat is Mondstadt located?',
        choice1: 'North',
        choice2: 'South',
        choice3: 'East',
        choice4: 'West',
        answer: 1,
    },{
        question: 'Which one of these characters is not from Mondstadt?',
        choice1: 'Albedo',
        choice2: 'Razor',
        choice3: 'Thoma',
        choice4: 'Hu Tao',
        answer: 4,
    },{
        question: 'The city of Mondstadt is surrounded by',
        choice1: 'Cider lake',
        choice2: 'A lava lake',
        choice3: 'The chasm',
        choice4: 'Grassland',
        answer: 1,
    },{
        question: 'How many bosses reside in Mondstadt(including Dragonspine)',
        choice1: '3',
        choice2: '4',
        choice3: '6',
        choice4: '7',
        answer: 4,
    },{
        question: 'What is the ancient tree in dragonspine called',
        choice1: 'Frostbearer tree',
        choice2: 'Northlander tree',
        choice3: 'Frostbearing tree',
        choice4: 'Southlander tree',
        answer: 3,
    },
    
    
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > 9) {
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

