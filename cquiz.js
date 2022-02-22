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
        question: "Who is the writer of the novel 'A Legend of Sword'?",
        choice1: 'Albedo',
        choice2: 'Xingqiu',
        choice3: 'Ningguang',
        choice4: 'Chongyun',
        answer: 2,
    },
    {
        question: 'Who is the only 4* character with a burst animation?',
        choice1: 'Bennett',
        choice2: 'Kujou Sara',
        choice3: 'Barbara',
        choice4: 'Xiangling',
        answer: 3,
    },
    {
        question: 'Barbara is _____ sister',
        choice1: 'Jean',
        choice2: 'Rosaria',
        choice3: 'Klee',
        choice4: 'Razor',
        answer: 1,
    },
    {
        question: "According to Klee, who is not 'The Best'?",
        choice1: 'Kaeya',
        choice2: 'Amber',
        choice3: 'Lisa',
        choice4: 'Diluc',
        answer: 4,
    },
    {
        question: "Who the bartender at Cat's Tail?",
        choice1: 'Diluc',
        choice2: 'Mona',
        choice3: 'Diona',
        choice4: 'Jean',
        answer: 3,
    },
    {
        question: "How many adventurers are there in Benny's Adventure Team?",
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: '4',
        answer: 1,
    },
    {
        question: 'Who is the calvary captain of the Knights of Favonius?',
        choice1: 'Jean',
        choice2: 'Kaeya',
        choice3: 'Noelle',
        choice4: 'Lisa',
        answer: 2,
    },
    {
        question: 'Which of the following is true about Kazuha?',
        choice1: 'Poet',
        choice2: 'Samurai',
        choice3: 'Anemo User',
        choice4: 'All of the above',
        answer: 4,
    },
    {
        question: 'Who is the librarian of the Knights of Favonius?',
        choice1: 'Xingqiu',
        choice2: 'Lisa',
        choice3: 'Sucrose',
        choice4: 'Albedo',
        answer: 2,
    },
    {
        question: 'Sayu is a',
        choice1: 'Ninja',
        choice2: 'Tanuki',
        choice3: 'Tengu',
        choice4: 'Kitsune',
        answer: 1,
    },
    {
        question: 'Where is Thoma originally from?',
        choice1: 'Liyue',
        choice2: 'Inazuma',
        choice3: 'Sumuru',
        choice4: 'Mondstadt',
        answer: 4,
    },
    {
        question: 'Who is the only crossover character in Genshin Impact?',
        choice1: 'Dainsleif',
        choice2: 'Traveler',
        choice3: 'Aloy',
        choice4: 'Xinyan',
        answer: 3,
    },
    {
        question: "What is Fischl's real name?",
        choice1: 'Fischl von Luftschloss Narfidort',
        choice2: 'Sara',
        choice3: 'Amy',
        choice4: 'Karen',
        answer: 3,
    },
    {
        question: 'Who is the sibling of Kamisato Ayaka?',
        choice1: 'Yae Miko',
        choice2: 'Ayato',
        choice3: 'Arataki Itto',
        choice4: 'Yoimiya',
        answer: 2,
    },
    {
        question: 'Hutao is the __th Director of the Wangsheng Funeral Parlor',
        choice1: '74',
        choice2: '75',
        choice3: '76',
        choice4: '77',
        answer: 4,
    },
    {
        question: 'Qiqi is looking for',
        choice1: 'Coconut juice',
        choice2: 'Goat milk',
        choice3: 'Cocogoat milk',
        choice4: 'Coconut milk',
        answer: 3,
    },
    {
        question: 'Tartaglia is the ____ Harbringer of the Fatui',
        choice1: '1st',
        choice2: '2nd',
        choice3: '11th',
        choice4: '12th',
        answer: 3,
    },
    {
        question: 'Xiangling specializes in _____  dishes',
        choice1: 'Hot and Spicy',
        choice2: 'Burnt and Bitter',
        choice3: 'Sweet and Sour',
        choice4: 'Nice and Savoury',
        answer: 1,
    },
    {
        question: 'Shenhe belongs to the same clan as',
        choice1: 'Xingqiu',
        choice2: 'Ningguang',
        choice3: 'Keqing',
        choice4: 'Chongyun',
        answer: 4,
    },
    {
        question: "Who is the maid of the Knights of Favonius?",
        choice1: 'Klee',
        choice2: 'Noelle',
        choice3: 'Jean',
        choice4: 'Eula',
        answer: 2,
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

window.location.href = 'end.html'