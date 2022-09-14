export function duplicateTheme(e) {
	e.preventDefault();
	console.log('duplicateTheme');
}

export function addQuestionInTheme(e) {
	e.preventDefault();
	console.log('addQuestionInTheme');
}

export function sortQuestionsBy(value, questions, setQuestions) {
	const sortByField = (a, b, field) => {
		if (a[field] < b[field]) return -1;
		if (a[field] > b[field]) return 1;
		return 0;
	}

	switch (value) {
		case 'date': {
			const sortedQuestions = questions.sort(
				(a, b) => sortByField(a, b, 'pk'));
			setQuestions([...sortedQuestions]);
			break;
		}
		case 'alphabet': {
			const sortedQuestions = questions.sort(
				(a, b) => sortByField(a, b, 'question'));
			setQuestions([...sortedQuestions]);
			break;
		}
		case 'level': {
			const sortedQuestions = questions.sort(
				(a, b) => sortByField(b, a, 'level'));
			setQuestions([...sortedQuestions]);
			break;
		}
		default: {
			throw new Error(`sort by: value doesnt exit ${value}`);
		}
	}
}