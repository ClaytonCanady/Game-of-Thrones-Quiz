const options = document.querySelectorAll('.option');

for (let i = 0; i < options.length; i++) {
	options[i].mark = i;
	options[i].addEventListener('click', answer);
}

let question = 1;
let scoreCount = 0;

function answer(event) {
	if (question === 1 && this.mark === 2) {
		console.log('it works');
		scoreCount++;
		console.log(scoreCount);
        question++;
        console.log(`next question is # ${question}`);
	} else if (question === 1 && this.mark != 2) {
		console.log('wrong');
        question++;
        console.log(`next question is # ${question}`);
    } else if (question === 2 && this.mark === 0) {
        console.log('num 2 correct');
        scoreCount++
        question++
        console.log(`next question is # ${question}`);
    } else if (question === 2 && this.mark !== 0) {
        console.log('num 2 wrong');
        question++
        console.log(`next question is # ${question}`);
}
}

//test


        // you're gonna need this alot if you don't find a better way
                    // objects?

// else if (question === 2 && this.mark === 0) {
//         console.log('num 2 correct');
//         scoreCount++
//         question++
//         console.log(`next question is # ${question}`);
//     } else if (question === 2 && this.mark !== 0) {
//         console.log('num 2 wrong');
//         question++
//         console.log(`next question is # ${question}`);
// }