import TestingApi from '../../../../services/testingApi';

export function changeCountAnswers(e, type, setCountAnswers) {
	e.preventDefault();
	switch (type) {
		case 'inc': {
			setCountAnswers((prevState) => {
				return prevState === 6 ? prevState : prevState + 1;
			});
			break;
		}
		case 'dec': {
			setCountAnswers((prevState) => {
				return prevState === 0 ? prevState : prevState - 1;
			});
			break;
		}
		default: {
			throw new Error(`${type} this type doesnt exist`);
		}
	}
}

export function postQuestion(data) {
	const {level, theme, question, type, is_correct, answer} = data;

	let answers = [];
	for (let i = 1; i < answer.length; i++) {
		answers.push({
			is_correct: !!is_correct[i],
			answer: answer[i],
		});
	}

	const requestData = {
		level,
		theme,
		question,
		type,
		answers,
	};

	console.log(requestData);

	new TestingApi().postQuestion(requestData)
}

export function getQuestionOptions() {
	return ([
			{id: 1, name: 'Один ответ'},
			{id: 2, name: 'Несколько ответов'},
		]
	);
}

export function errorMessage(message) {
	return <p className="text-danger p-1 m-0">{message}</p>;
}

export function checkAnswersCount() {
	const type = document.querySelector('[name="type"]')?.value;
	const isCorrects = document.querySelectorAll('[type="checkbox"]');
	let isCorrectCount = 0;

	isCorrects.forEach(item => item.checked && isCorrectCount++);

	if(type === '') {
		return false;
	}

	return !((type === '1' && isCorrectCount !== 1)
		|| (type === '2' && isCorrectCount <= 1));
}