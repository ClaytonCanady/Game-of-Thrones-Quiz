const options = document.querySelectorAll('.option');
const currentQuestion = document.querySelector('.text-here');
const results = document.querySelector('.results');
const incorrect = document.querySelector('.show-incorrect');
const startScreen = document.querySelector('.start-screen');
const gameScreen = document.querySelector('.game-area');
const startGame = document.querySelector('.start-game');
startGame.addEventListener('click', go);
const finishedScreen = document.querySelector('.finished-screen');
const highScore = document.querySelector('.record-score');
var bestScore = localStorage.getItem('highScore') || 0;
highScore.innerText = `Your current high score is ${bestScore}`;

function go() {
	startScreen.classList.add('hidden');
	gameScreen.classList.remove('hidden');
}
//array where correct answer will be stored to display later
let missed = [];
//adds onclick event to all 4 option buttons
for (let i = 0; i < options.length; i++) {
	options[i].mark = i;
	options[i].addEventListener('click', answer);
}
//button to show missed answers
incorrect.addEventListener('click', showMissed);
let questionNumber = 0;
let scoreCount = 0;

// checked facts at https://gameofthrones.fandom.com/wiki/Game_of_Thrones_Wiki

const myQuestions = [
	(question1 = {
		text: "What is Jon's dire-wolf's name?",
		optionA: 'Simba',
		optionB: 'Lady',
		optionC: 'Ghost',
		optionD: 'Frost',
		correct: 2,
		correction: "Ghost is Jon's dire-wolf.",
	}),
	(question2 = {
		text: "What is the name Arya's sword?",
		optionA: 'Needle',
		optionB: 'Poker',
		optionC: 'Stabby',
		optionD: 'Ned',
		correct: 0,
		correction: "Needle is Arya's sword.",
	}),
	(question3 = {
		text: 'What creature is the symbol for house Baratheon?',
		optionA: 'Boar',
		optionB: 'Lion',
		optionC: 'Crown',
		optionD: 'Stag',
		correct: 3,
		correction: 'House Baratheon has a Stag as its symbol.',
	}),
	(question4 = {
		text: 'Who turned Theon Greyjoy into Reek?',
		optionA: 'The Mountain',
		optionB: 'Ramsey Bolton',
		optionC: 'Walder Frey',
		optionD: 'Harrion Karstark',
		correct: 1,
		correction: 'Ramsey Bolton turned Theon into Reek.',
	}),
	(question5 = {
		text: 'Who is the head of House Tarly?',
		optionA: 'Randyll',
		optionB: 'Dicken',
		optionC: 'Samwell',
		optionD: 'Robert',
		correct: 0,
		correction: 'Randyll Tarly is the head of his house.',
	}),
	(question6 = {
		text: 'What substance is dragon glass mande of?',
		optionA: 'Dragons Scales',
		optionB: 'Special metal smelted by the Children of the Forest',
		optionC: 'Obsidian',
		optionD: 'Onyx',
		correct: 2,
		correction: 'Dragon glass is made form obsidian.',
	}),
	(question7 = {
		text: 'What are the official words of house Lannister?',
		optionA: 'Family First.',
		optionB: 'A Lannister always pays his debts.',
		optionC: 'Always Prepared!',
		optionD: 'Hear me roar!',
		correct: 3,
		correction: 'Hear me roar are the words of house Lannister.',
	}),
	(question8 = {
		text:
			'What translated term do Dothraki Bloodriders use to refer to each other?',
		optionA: 'Son of my Khal',
		optionB: 'Blood of my Blood',
		optionC: 'King Hunter',
		optionD: 'Nomad',
		correct: 1,
		correction: 'Blood riders call each other Blood of My Blood.',
	}),
	(question9 = {
		text: "What is the name of Ned Stark's sword?",
		optionA: 'Spike',
		optionB: "Widow's Wail",
		optionC: 'Honor',
		optionD: 'Ice',
		correct: 3,
		correction: "Ned Starks's sword is named Ice.",
	}),
	(question10 = {
		text: "Who cut off Jaime Lannister's hand?",
		optionA: 'Locke',
		optionB: 'Jon Snow',
		optionC: 'The Night King',
		optionD: 'Ramsay Bolton',
		correct: 0,
		correction: "Locke cut off Jaime Lannister's Hand.",
	}),
	(question11 = {
		text: 'What color is the sap of a Weirwood tree?',
		optionA: 'Black',
		optionB: 'Orange',
		optionC: 'Red',
		optionD: 'White',
		correct: 2,
		correction: 'The sap of Weirwood trees is blood red',
	}),
	(question12 = {
		text: 'Who is the master of whispers?',
		optionA: 'Varys',
		optionB: 'Tyrion',
		optionC: 'Little Finger',
		optionD: 'Arya Stark',
		correct: 0,
		correction: 'Varys is the master of whispers.',
	}),
	(question13 = {
		text: 'What historical society are the Ironborn based upon?',
		optionA: 'Celts',
		optionB: 'Greeks',
		optionC: 'Egyptians',
		optionD: 'Vikings',
		correct: 3,
		correction:
			'George R.R. Martin has stated that the Ironborn were inspired by the Vikings.',
	}),
	(question14 = {
		text: "Who are the Bastard's Girls?",
		optionA: "Robert Baratheon's illegitimate children.",
		optionB: "Ramsay Bolton's hound pack.",
		optionC: 'A group of pick pockets in the capital.',
		optionD: 'A secret group of all female assassins.',
		correct: 1,
		correction: "The Bastard\'s Girls are Ramsay Bolton's hound pack.",
	}),
	(question15 = {
		text: 'Why were the White Walkers originally created?',
		optionA: 'To punish mankind.',
		optionB: 'To protect the Children of the Forest.',
		optionC: "To help the night's watch defend from giants",
		optionD: 'To guard secrets treasures stashed in the far north.',
		correct: 1,
		correction:
			'The White Walkers were created to protect the Children of the Forest from the First Men.',
	}),
];
currentQuestion.innerText = myQuestions[questionNumber].text;
options[0].innerText = myQuestions[questionNumber].optionA;
options[1].innerText = myQuestions[questionNumber].optionB;
options[2].innerText = myQuestions[questionNumber].optionC;
options[3].innerText = myQuestions[questionNumber].optionD;

//handles both correct and incorrect options
function answer(event) {
	if (this.mark == myQuestions[questionNumber].correct) {
		scoreCount++;
		questionNumber++;
		if (questionNumber >= myQuestions.length) {
			return displayResults();
		}
		currentQuestion.innerText = myQuestions[questionNumber].text;
		options[0].innerText = myQuestions[questionNumber].optionA;
		options[1].innerText = myQuestions[questionNumber].optionB;
		options[2].innerText = myQuestions[questionNumber].optionC;
		options[3].innerText = myQuestions[questionNumber].optionD;
	} else if (this.mark != myQuestions[questionNumber].correct) {
		missed.push(myQuestions[questionNumber].correction);
		questionNumber++;
		if (questionNumber >= myQuestions.length) {
			return displayResults();
		}
		currentQuestion.innerText = myQuestions[questionNumber].text;
		options[0].innerText = myQuestions[questionNumber].optionA;
		options[1].innerText = myQuestions[questionNumber].optionB;
		options[2].innerText = myQuestions[questionNumber].optionC;
		options[3].innerText = myQuestions[questionNumber].optionD;
	}
}
//shows results of quiz with option to reset or display correct answers
function displayResults() {
	if (scoreCount > bestScore) {
		localStorage.setItem('highScore', scoreCount);
		bestScore = scoreCount;
		highScore.innerText = `Your current high score is ${bestScore}`;
	}

	const responses = [
		`${scoreCount}/${myQuestions.length} You Know Nothing John Snow`,
		`${scoreCount}/${myQuestions.length} A book is to the mind as a whetstone is to a sword, you should pick one up.`,
		`${scoreCount}/${myQuestions.length} Not too shabby, Little Finger would be proud`,
		`${scoreCount}/${myQuestions.length} Great Job! You're as quick as Tyrion himself!`,
	];
	if (scoreCount / myQuestions.length <= 0.25) {
		results.innerText = responses[0];
	} else if (
		scoreCount / myQuestions.length > 0.25 &&
		scoreCount / myQuestions.length <= 0.5
	) {
		results.innerText = responses[1];
	} else if (
		scoreCount / myQuestions.length > 0.5 &&
		scoreCount / myQuestions.length <= 0.75
	) {
		results.innerText = responses[2];
	} else if (scoreCount / myQuestions.length > 0.75) {
		results.innerText = responses[3];
	}
	finishedScreen.classList.remove('hidden');
	incorrect.classList.remove('hidden');
	results.classList.remove('hidden');
	resetButton.classList.remove('hidden');
	currentQuestion.classList.add('hidden');
	options[0].classList.add('hidden');
	options[1].classList.add('hidden');
	options[2].classList.add('hidden');
	options[3].classList.add('hidden');
}

const resetButton = document.querySelector('.reset-button');
resetButton.addEventListener('click', reset);
const myUl = document.querySelector('.correct-answers');
// places correct answers to missed questions into a ul
function showMissed() {
	for (let i = 0; i < missed.length; i++) {
		var newLi = document.createElement('li');
		var text = document.createTextNode(missed[i]);
		newLi.appendChild(text);
		myUl.appendChild(newLi);
	}
	myUl.classList.remove('hidden');
}
// resets to beginning of game
function reset() {
	questionNumber = 0;
	scoreCount = 0;
	finishedScreen.classList.add('hidden');
	incorrect.classList.add('hidden');
	myUl.classList.add('hidden');
	results.classList.add('hidden');
	resetButton.classList.add('hidden');
	currentQuestion.classList.remove('hidden');
	currentQuestion.innerText = myQuestions[questionNumber].text;
	options[0].innerText = myQuestions[questionNumber].optionA;
	options[1].innerText = myQuestions[questionNumber].optionB;
	options[2].innerText = myQuestions[questionNumber].optionC;
	options[3].innerText = myQuestions[questionNumber].optionD;
	options[0].classList.remove('hidden');
	options[1].classList.remove('hidden');
	options[2].classList.remove('hidden');
	options[3].classList.remove('hidden');
	// https://www.sitepoint.com/community/t/dom-remove-all-li-from-ul/3145/2 user: Kravvitz
	for (let i = 0; i <= missed.length; i++) {
		myUl.removeChild(myUl.firstChild);
	}
	while (missed.length > 0) {
		missed.pop();
	}
}
