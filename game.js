const options = document.querySelectorAll('.option');
const currentQuestion = document.querySelector('.text-here');
for (let i = 0; i < options.length; i++) {
	options[i].mark = i;
	options[i].addEventListener('click', answer);
}

let questionNumber = 0;
let scoreCount = 0;

const myQuestions = [
	(question1 = {
		text: "what is Jon's wolf's name",
		optionA: 'Simba',
		optionB: 'Lady',
		optionC: 'Ghost',
		optionD: 'Frost',
		correct: 2,
	}),
	(question2 = {
		text: "what is Arrya's swords name",
		optionA: 'needle',
		optionB: 'poker',
		optionC: 'stabby',
		optionD: 'ned',
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
		console.log('correct');
		scoreCount++;
		questionNumber++;
		if (questionNumber >= myQuestions.length) {
			return console.log('end of game');
		}
		currentQuestion.innerText = myQuestions[questionNumber].text;
		options[0].innerText = myQuestions[questionNumber].optionA;
		options[1].innerText = myQuestions[questionNumber].optionB;
		options[2].innerText = myQuestions[questionNumber].optionC;
		options[3].innerText = myQuestions[questionNumber].optionD;
	} else if (this.mark != myQuestions[questionNumber].correct) {
		console.log('incorrect');
		questionNumber++;
		if (questionNumber >= myQuestions.length) {
			return console.log('end of game');
		}
		currentQuestion.innerText = myQuestions[questionNumber].text;
		options[0].innerText = myQuestions[questionNumber].optionA;
		options[1].innerText = myQuestions[questionNumber].optionB;
		options[2].innerText = myQuestions[questionNumber].optionC;
		options[3].innerText = myQuestions[questionNumber].optionD;
	}
}
