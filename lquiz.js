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
        question: 'What is Liyue known as?',
        choice1: 'The city of contracts',
        choice2: 'The city of contacts',
        choice3: 'The city of mora',
        choice4: 'The harbor city',
        answer: 1,
    },
    {
        question: 'Who is the archon of Liyue?',
        choice1: 'Mora',
        choice2: 'Morax',
        choice3: 'Mordor',
        choice4: 'Qixing',
        answer: 2,
    },
    {
        question: 'What is the element associated with Liyue?',
        choice1: 'Pyro',
        choice2: 'Hydro',
        choice3: 'Anemo',
        choice4: 'Geo',
        answer: 4,
    },
    {
        question: 'Why was the Jade Chamber destroyed?',
        choice1: 'To defeat Oceanic',
        choice2: "To prove Ningguang's worth",
        choice3: 'To defeat Osial',
        choice4: 'To defeat Beisht',
        answer: 3,
    },
    {
        question: "What is the name of Liyue's army",
        choice1: 'The Adepti',
        choice2: 'The Millelith',
        choice3: 'The Qixing brigade',
        choice4: 'The Morax army',
        answer: 2,
    },
    {
        question: 'Where is the road that connects Liyue with Mondstadt?',
        choice1: 'Sea of Clouds',
        choice2: 'Lisha',
        choice3: 'Minlin',
        choice4: 'Dihua Marsh',
        answer: 4,
    },
    {
        question: 'What is the reward found in the 9 pillars of peace?',
        choice1: 'A dull ring',
        choice2: 'Special stone pillar',
        choice3: '200,000 mora',
        choice4: "Adeptus' Temptation",
        answer: 1,
    },
    {
        question: 'Which of these is not a lantern rite festival event?',
        choice1: 'Lantern Release',
        choice2: 'All That Glitters',
        choice3: 'Lantern Rite Tales',
        choice4: 'Theater Mechanicus',
        answer: 1,
    },
    {
        question: 'Who is the Fatui Harbringer Traveller encounters in Liyue?',
        choice1: 'Signoria',
        choice2: 'Pantalone',
        choice3: 'Tartaglia',
        choice4: 'Pierro',
        answer: 3,
    },
    {
        question: 'What is the mysterious secret hidden in Wangshu Inn?',
        choice1: 'A ghost',
        choice2: 'A secret recipe',
        choice3: 'A secret spice',
        choice4: 'Xiao',
        answer: 4,
    },
    {
        question: 'Where is the home of the adepti?',
        choice1: 'Qingce Village',
        choice2: 'Mt. Tianheng',
        choice3: 'The Chasm',
        choice4: 'Jueyun Karst',
        answer: 4,
    },
    {
        question: 'Where is Big G from?',
        choice1: 'Qingce Village',
        choice2: 'A village in Wuwang Hill',
        choice3: 'A village in Guili Plains',
        choice4: 'Liyue Harbor',
        answer: 2,
    },
    {
        question: 'What are the jagged cliffs in Guyun Stone Forest caused by?',
        choice1: 'Natural formation',
        choice2: 'Geo Hypostasis',
        choice3: "Osial's bones",
        choice4: "Rex Lapis's lances",
        answer: 4,
    },
    {
        question: 'Who established the Guili Assembly?',
        choice1: 'Guizhong',
        choice2: 'Marchosius',
        choice3: 'Havria',
        choice4: 'Azdaha',
        answer: 1,
    },
    {
        question: 'How did Havria die?',
        choice1: 'By other adepti',
        choice2: 'By Rex Lapis',
        choice3: 'By her own people',
        choice4: 'By Pervases',
        answer: 3,
    },
    {
        question: 'Who among the folllowing is NOT an Adepti?',
        choice1: 'Guoba',
        choice2: 'Shen he',
        choice3: 'Cloud Retainer',
        choice4: 'Madam Ping',
        answer: 2,
    },
    {
        question: 'Who is the ruling party in Liyue?',
        choice1: 'Liyue Qixing',
        choice2: 'Morax',
        choice3: 'Moonchaser',
        choice4: 'Rex Lapis',
        answer: 1,
    },
    {
        question: 'What is the rite of descension?',
        choice1: 'Rex Lapis giving guidance',
        choice2: 'The Stepping down of Rex lapis',
        choice3: 'The demotion of the Qixing',
        choice4: 'A march by the Milelith',
        answer: 1,
    },
    {
        question: 'Liyue is known for producing ____',
        choice1: 'Furniture',
        choice2: 'Coffins',
        choice3: 'Jade',
        choice4: 'Mora',
        answer: 4,
    },
    {
        question: 'What is the set of weapons that are boosted by liyue characters',
        choice1: 'Liyue series',
        choice2: 'Primordial Jade series',
        choice3: 'Lithic series',
        choice4: 'Milelith series',
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

        return window.location.assign('/end.html')
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

