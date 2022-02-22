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
        question: 'What is the reaction between cryo and pyro called?',
        choice1: 'Melt',
        choice2: 'Vapourize',
        choice3: 'Freeze',
        choice4: 'Electrocharge',
        answer: 1,
    },
    {
        question: 'What is the damage multiplier on vapourize for hydro on pyro?',
        choice1: 'x1',
        choice2: 'x1.5',
        choice3: 'x2',
        choice4: 'x2.5',
        answer: 3,
    },
    {
        question: 'Which element has the most crowd control?',
        choice1: 'Geo',
        choice2: 'Anemo',
        choice3: 'Pyro',
        choice4: 'Dendro',
        answer: 2,
    },
    {
        question: 'Which elemental reaction cannot score a critical hit?',
        choice1: 'Vapourize',
        choice2: 'Melt',
        choice3: 'Swirl',
        choice4: 'All of the above',
        answer: 3,
    },
    {
        question: 'How many abyss lector types are there (as of patch 2.4)?',
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: '4',
        answer: 3,
    },
    {
        question: 'In what situation is a shield ineffective?',
        choice1: "Azdaha's elemental attacks",
        choice2: 'Rifthound whelp attacks',
        choice3: 'Specter explosion',
        choice4: 'Elecro abyss lector attacks',
        answer: 2,
    },
    {
        question: 'What are slimes immune to?',
        choice1: 'Physical damage',
        choice2: 'Elemental damage',
        choice3: 'Elemental damage from the same element',
        choice4: 'Elemental damage from all elements except the same element',
        answer: 3,
    },
    {
        question: 'How many weekly bosses are there (patch 2.4)?',
        choice1: '3',
        choice2: '6',
        choice3: '5',
        choice4: '8',
        answer: 3,
    },
    {
        question: 'What does elemental mastery(em) boost?',
        choice1: 'All elemental damage',
        choice2: 'All reaction damage',
        choice3: 'Rate of which elemental particles are generated',
        choice4: 'All shield strength',
        answer: 2,
    },
    {
        question: 'How to obtain a Prototype Rancour?',
        choice1: 'Battle pass',
        choice2: 'Forging',
        choice3: 'Welkin moon',
        choice4: 'Completing a quest',
        answer: 2,
    },
    {
        question: 'Which monster has the most physical resistance?',
        choice1: 'Mitachurls',
        choice2: 'Ruin hunters',
        choice3: 'Ruin guards',
        choice4: 'Regisvines(stunned)',
        answer: 3,
    },
    {
        question: "Which abiliy scales off defence?",
        choice1: "Albedo's elemental skill",
        choice2: "Albedo's elemental burst",
        choice3: "Zhong Li's elemental burst",
        choice4: "Yun Jin's elemental burst damage",
        answer: 1,
    },
    {
        question: 'How many types of weapons are there?',
        choice1: '3',
        choice2: '7',
        choice3: '4',
        choice4: '5',
        answer: 4,
    },
    {
        question: 'What is the effect of superconduct?',
        choice1: 'Decrease electro res',
        choice2: 'Decrease physical res',
        choice3: 'Increase physical damage',
        choice4: 'Increase cryo damage',
        answer: 2,
    },
    {
        question: 'Which boss has the most number of phases?',
        choice1: 'Childe',
        choice2: 'Dvalin',
        choice3: 'Signora',
        choice4: 'Andrius',
        answer: 1,
    },
    {
        question: 'Which character has the highest burst energy cost?',
        choice1: 'Kazuha',
        choice2: 'Raiden Shogun',
        choice3: 'Eula',
        choice4: 'Xiang Ling',
        answer: 2,
    },
    {
        question: 'Which is not an option to restore health?',
        choice1: 'Visiting statue of the seven',
        choice2: 'Eating food',
        choice3: "Using Xingqiu's elemental skill",
        choice4: "Using Xingqiu's elemental burst",
        answer: 4,
    },
    {
        question: 'How many floors are there in the spiral abyss?',
        choice1: '10',
        choice2: '11',
        choice3: '12',
        choice4: '13',
        answer: 3,
    },
    {
        question: 'The substat of battle pass weapons are',
        choice1: 'Crit rate',
        choice2: 'Atk percent',
        choice3: 'Def percent',
        choice4: 'Crit damage',
        answer: 1,
    },
    {
        question: 'Which of the following is NOT a possible main stat of a Circlet artefact?',
        choice1: 'Crit rate',
        choice2: 'Crit Damage',
        choice3: 'Def Percent',
        choice4: 'Pyro Damage',
        answer: 4,
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

