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
        question: 'Who Is the Archon of Inazuma?',
        choice1: 'Kujou Sara',
        choice2: 'Ei',
        choice3: 'Arataki Itto',
        choice4: 'Kokomi',
        answer: 2,
    },
    {
        question: 'Which is the ruling party of inazuma?',
        choice1: 'Inazuma Shogunate',
        choice2: 'Tenryou Commission',
        choice3: 'Kanjou Commission',
        choice4: 'Grand Narukami Shrine',
        answer: 1,
    },
    {
        question: 'Which of the following is an Inazuma speciality?',
        choice1: 'Lavander melons',
        choice2: 'Glaze Lilies',
        choice3: 'Violet Grass',
        choice4: 'Sea Ganoderma',
        answer: 4,
    },
    {
        question: 'What Element is inazuma assocciated with?',
        choice1: 'Hydro',
        choice2: 'Pyro',
        choice3: 'Cryo',
        choice4: 'Electro',
        answer: 4,
    },
    {
        question: 'How many main islands are there in Inazuma?',
        choice1: '3',
        choice2: '4',
        choice3: '5',
        choice4: '6',
        answer: 4,
    },
    {
        question: 'Where is the entrance to Enkanomiya?',
        choice1: 'Suigetsu Pool',
        choice2: 'Sangonomiya Shrine',
        choice3: 'Amakumo Peak',
        choice4: 'Moshiri Shrine',
        answer: 2,
    },
    {
        question: 'What is Mikage Furnace famous for?',
        choice1: 'Jade',
        choice2: 'Jade Steel',
        choice3: 'Amethyst',
        choice4: 'Delusions',
        answer: 2,
    },
    {
        question: 'Locals in tsurumi island worshipped',
        choice1: 'Thunder manifestation',
        choice2: 'Kanna Kapatcir',
        choice3: 'Beelzebul',
        choice4: 'Makoto',
        answer: 2,
    },
    {
        question: 'Where is the Sacred Sakura tree located?',
        choice1: 'Mt. Kanna',
        choice2: 'Mt. Yougou',
        choice3: 'Sangonomiya Shrine',
        choice4: 'Grand Narukami Shrine',
        answer: 4,
    },
    {
        question: 'Komore Teahouse only allows people approved by ____ to enter',
        choice1: 'Kujou clan',
        choice2: 'Kamisato clan',
        choice3: 'Tengu Clan',
        choice4: 'Yashiro Clan',
        answer: 2,
    },
    {
        question: 'How did the Musoujin Gorge come into existance',
        choice1: 'Natural formation',
        choice2: 'A fight between archons',
        choice3: "Electro Archon's swordsmanship",
        choice4: 'Mikage Furnace explosion',
        answer: 3,
    },
    {
        question: 'What is the competition held by Yae Publishing House',
        choice1: "'Best Novel Competition'",
        choice2: "'Most Amazing Novel'",
        choice3: "'This Novel Is Amazing'",
        choice4: "'Wow! Best Novel'",
        answer: 3,
    },
    {
        question: 'How did Traveller first reach Inazuma?',
        choice1: "Beidou's Ship",
        choice2: 'Wave Rider',
        choice3: 'Teleport waypoint',
        choice4: 'Statue of the seven',
        answer: 1,
    },
    {
        question: 'Who is Kanna Kapatcir?',
        choice1: 'Raiden Shogun',
        choice2: 'he great Thunderbird',
        choice3: 'Thunder Manifestation',
        choice4: 'Electro Hypostasis',
        answer: 2,
    },
    {
        question: 'Where did the people of Watatsumi use to live?',
        choice1: 'Enkanomia',
        choice2: 'Seirai Island',
        choice3: 'Tsurumi Island',
        choice4: 'Watatsumi Island',
        answer: 1,
    },
    {
        question: 'Who is Ioroi?',
        choice1: 'The leader of Bake-Danuki',
        choice2: 'A wooden carving',
        choice3: 'A sacred tree in Chinju Forest',
        choice4: 'A sneaky kitsune',
        answer: 1,
    },
    {
        question: 'What is the sacred sakura cleansing ritual?',
        choice1: 'Cleaning up the Grand Narukami Shrine',
        choice2: 'Purifying filth from Sacred Sakura roots',
        choice3: 'A praying ritual',
        choice4: 'Picking Sacred Sakura leaves',
        answer: 2,
    },
    {
        question: "What gained Kannazuka it's name?",
        choice1: 'There is no one living there',
        choice2: 'The gods have abandoned the place',
        choice3: 'Neither the shogunate nor watatsumi army has influence',
        choice4: 'The territory is independent from Inazuma',
        answer: 3,
    },
    {
        question: 'What was Raiden Shogun persuing?',
        choice1: 'Eternity',
        choice2: 'Progress',
        choice3: 'Peace',
        choice4: 'Destruction of Heavenly Principals',
        answer: 1,
    },
    {
        question: 'Why was there Balethunder in the Mikage Furnace?',
        choice1: 'The furnace was destroyed',
        choice2: 'The containment dome was destroyed',
        choice3: 'The furnace was deactivated',
        choice4: 'The furnace detected an intruder',
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

