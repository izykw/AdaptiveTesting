import { getListElement } from '../moderatorManagementTheme.services';

export function sortQuestionsBy(value, questions, setQuestion) {
	const sortByField = (a, b, field) => {
		if (a[field] < b[field]) return -1;
		if (a[field] > b[field]) return 1;
		return 0;
	};

	switch (value) {
		case 'date': {
			const sortedQuestions = questions.sort(
				(a, b) => sortByField(a, b, 'pk'));
			setQuestion({questions: [...sortedQuestions]});
			break;
		}
		case 'alphabet': {
			const sortedQuestions = questions.sort(
				(a, b) => sortByField(a, b, 'question'));
			setQuestion({questions: [...sortedQuestions]});
			break;
		}
		case 'level': {
			const sortedQuestions = questions.sort(
				(a, b) => sortByField(b, a, 'level'));
			setQuestion({questions: [...sortedQuestions]});
			break;
		}
		default: {
			throw new Error(`sort by: value doesnt exit ${value}`);
		}
	}
}

export function showFullQuestion(e) {
	const li = getListElement(e);
	if (li) {
		const textArea = document.querySelector('#full-text-question');
		textArea.textContent = li.textContent;
	}
}


