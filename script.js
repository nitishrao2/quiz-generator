const startQuiz=document.querySelector('.normal');
const guide=document.querySelector('.guide')
const exitQuiz=document.querySelector('.btn1');
const main=document.querySelector('.main');
const continueBtn=document.querySelector('.continue-btn');
const quizSection=document.querySelector('.quizsection');
const quizBox=document.querySelector('.quizbox');
const resultBox=document.querySelector('.result-box');

let questions = [
    {
        numb: 1,
        question: "What does HTML stand for?",
        answer: "C. Hyper Text Markup Language",
        options: [
            "A. Hyper Type Multi Language",
            "B. Hyper Text Multiple Language",
            "C. Hyper Text Markup Language",
            "D. Home Text Multi Language"
        ]
    },
    {
        numb: 2,
        question: "What does CSS stand for?",
        answer: "A. Cascading Style Sheet",
        options: [
            "A. Cascading Style Sheet",
            "B. Cute Style Sheet",
            "C. Computer Style Sheet",
            "D. Codehal Style Sheet"
        ]
    },
    {
        numb: 3,
        question: "What does PHP stand for?",
        answer: "A. Hypertext Preprocessor",
        options: [
            "A. Hypertext Preprocessor",
            "B. Hometext Programming",
            "C. Hypertext Preprogramming",
            "D. Programming Hypertext Preprocessor"
        ]
    },
    {
        numb: 4,
        question: "What does SQL stand for?",
        answer: "D. Structured Query Language",
        options: [
            "A. Strength Query Language",
            "B. Stylesheet Query Language",
            "C. Science Question Language",
            "D. Structured Query Language"
        ]
    },
    {
        numb: 5,
        question: "What does XML stand for?",
        answer: "D. Extensible Markup Language",
        options: [
            "A. Excellent Multiple Language",
            "B. Explore Multiple Language",
            "C. Extra Markup Language",
            "D. Extensible Markup Language"
        ]
    }
];

startQuiz.onclick = () => {
    guide.classList.add("active");
    main.classList.add("active");
}

exitQuiz.onclick = () => {
    guide.classList.remove("active");
    main.classList.remove("active");
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    guide.classList.remove("active");
    main.classList.remove("active");
    quizBox.classList.add("active");
    showQuestion(0);
    questionTotal(1);
    headerScore();
}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {

    if(questionCount < questions.length-1){
        questionCount++;
        showQuestion(questionCount);

        questionNumb++;
        questionTotal(questionNumb);

        nextBtn.classList.remove('active');
    }else{
        console.log("");
        showResultBox();
    }
}

let optionList = document.querySelector('.option-list');

function showQuestion(index){
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question} `
    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
                    <div class="option"><span>${questions[index].options[1]}</span></div>             
                    <div class="option"><span>${questions[index].options[2]}</span></div>             
                    <div class="option"><span>${questions[index].options[3]}</span></div>`;
                    
    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for(let i=0 ; i<option.length ; i++){
        option[i].setAttribute('onclick', 'questionSelected(this)');
    }
}

function questionSelected(answer) {
    let userAns = answer.textContent;
    let correctAns = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if(userAns == correctAns)
    {
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    }else{
        answer.classList.add('incorrect');

        for(let i=0 ; i < allOptions ; i++)
        {
            if(optionList.children[i].textContent == correctAns)
            {
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }
    }

    for(let i=0 ; i < allOptions ; i++)
    {
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');
}

function questionTotal(index){
    const total = document.querySelector('.question-total');
    total.textContent = `${index} of ${questions.length} questions`;
}

function headerScore(){
    const score = document.querySelector('.header-score');
    score.textContent = `Score: ${userScore} of ${questions.length}`;
}

function showResultBox(){
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = ` Your score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore /questions.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++; 

        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#df169cc8 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;
        
        if(progressStartValue >= progressEndValue){
            clearInterval(progress);
        }
    }, speed);
}

const tryAgain = document.querySelector('.tryagain-btn');
const goToHome = document.querySelector('.gohome-btn');

tryAgain.onclick = () => {
    quizBox.classList.add('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    showQuestion(questionCount);
    questionTotal(questionNumb);

    headerScore();
}

goToHome.onclick = () => {
    quizSection.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    showQuestion(questionCount);
    questionTotal(questionNumb);
}