const options = document.querySelectorAll('.option');
const currentQuestion = document.querySelector('.text-here');
const results = document.querySelector('.results');
for (let i = 0; i < options.length; i++) {
	options[i].mark = i;
	options[i].addEventListener('click', answer);
}

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
	}),
	(question2 = {
		text: "What is Arya's swords name?",
		optionA: 'Needle',
		optionB: 'Poker',
		optionC: 'Stabby',
		optionD: 'Ned',
		correct: 0,
	}),
	(question3 = {
		text: 'What creature is the symbol for house Baratheon?',
		optionA: 'The sun',
		optionB: 'A lion',
		optionC: 'A crown',
		optionD: 'A stag',
		correct: 3,
	}),
	(question4 = {
		text: 'What character turned Theon into Reek?',
		optionA: 'The Mountain',
		optionB: 'Ramsey Bolton',
		optionC: 'Walder Frey',
		optionD: 'Harrion Karstark',
		correct: 1,
	}),
	(question5 = {
		text: 'Who is the head of House Tarly?',
		optionA: 'Randyll',
		optionB: 'Dicken',
		optionC: 'Samwell',
		optionD: 'Robert',
		correct: 0,
	}),
	(question6 = {
		text: 'What substance is dragon glass mande of?',
		optionA: 'Dragons Scales',
		optionB: 'Special metal smelted by the children of the forest',
		optionC: 'Obsidian',
		optionD: 'Onyx',
		correct: 2,
	}),
	(question7 = {
		text: 'What are the official words of house Lannister?',
		optionA: 'Family First.',
		optionB: 'A Lannister always pays his debts.',
		optionC: 'Always Prepared',
		optionD: 'Hear me roar!',
		correct: 3,
	}),
	(question8 = {
		text:
			'What translated term do Dothraki Bloodriders use to refer to each other?',
		optionA: 'Son of my Khal',
		optionB: 'Blood of my Blood',
		optionC: 'King Hunter',
		optionD: 'Nomad',
		correct: 1,
	}),
	(question9 = {
		text: "What is the name of Ned Stark's sword",
		optionA: 'Spike',
		optionB: "Widow's Wail",
		optionC: 'Honor',
		optionD: 'Ice',
		correct: 3,
	}),
	(question10 = {
		text: "Who cut off Jaime Lannister's hand",
		optionA: 'Locke',
		optionB: 'Jon Snow',
		optionC: 'The Night King',
		optionD: 'Ramsay Bolton',
		correct: 0,
	}),
];
currentQuestion.innerText = myQuestions[questionNumber].text;
options[0].innerText = myQuestions[questionNumber].optionA;
options[1].innerText = myQuestions[questionNumber].optionB;
options[2].innerText = myQuestions[questionNumber].optionC;
options[3].innerText = myQuestions[questionNumber].optionD;

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

function displayResults() {
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
	results.classList.remove('hidden');
	resetButton.classList.remove('hidden');
}
const resetButton = document.querySelector('.reset-button');
resetButton.addEventListener('click', reset);

function reset() {
	questionNumber = 0;
	scoreCount = 0;
	results.classList.add('hidden');
	resetButton.classList.add('hidden');
	currentQuestion.innerText = myQuestions[questionNumber].text;
	options[0].innerText = myQuestions[questionNumber].optionA;
	options[1].innerText = myQuestions[questionNumber].optionB;
	options[2].innerText = myQuestions[questionNumber].optionC;
	options[3].innerText = myQuestions[questionNumber].optionD;
}
