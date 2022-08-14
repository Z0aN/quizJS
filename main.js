// All answer options
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

// All our Options
const optionElements = document.querySelectorAll('.option');
// Сам вопрос
const question = document.getElementById('question');
// Номер вопроса
const numberOfQuestion = document.getElementById('number-of-question'),
    //   Количество всех вопросов
      numberOfAllQuestions = document.getElementById('number-of-all-questions');

let indexOfQuestion, // индекс текущего вопроса
    indexOfPage = 0; // Индекс страницы

const answersTracker = document.getElementById('answers-tracker'); // Обёртка для трэкера
const btnNext = document.getElementById('btn-next'); // Далее

let score = 0; // Результат викторины

const correctAnswer = document.getElementById('correct-answer'), // Количество правильных вопросов
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), // Количество всех вопросов в модальном окне
      btnTryAgain = document.getElementById('btn-try-again'); //Начать викторину заново

const questions = [
    {
        question: 'Когда умер А.А.Леонов?',
        options: [
            'Кто это?',
            'Он разве умер?',
            'В 2019 году',
            'Он мой дед'
        ],
        rightAnswer: 2
    },
    {
        question: 'Когда вышла CS:GO?',
        options: [
            'В 2022',
            'В 2011',
            'В 2012',
            'В 2001'
        ],
        rightAnswer:2
    },
    {
        question: 'Какой язык учить программисту в первую очередь?',
        options: [
            'Java',
            'Python',
            'C++',
            'Английский язык'
        ],
        rightAnswer: 3
    }
];

numberOfAllQuestions.innerHTML = questions.length; //выводим количество вопросов

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; //Вопрос

    // Мапим ответы(рендерим)

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; // установка номера текущей страницы
    indexOfPage++; //Увеличение индекса страницы

};

let completedAnswers = []; // массив для уже заданных вопросов

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; // якорь для проверки рдинаковых вопрсов

    if (indexOfPage == questions.length) {
        quizOver();
    } else {
        if (completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if (hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if( el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}

for (option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e))
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
}

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled','correct','wrong');
    })
};

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
};

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')) {
        alert('Вам нужно выбрать один из вариантов ответа')
    } else {
        randomQuestion();
        enableOptions();
    }
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
})