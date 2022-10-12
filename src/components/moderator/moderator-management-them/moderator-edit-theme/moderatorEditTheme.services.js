import TestingApi from '../../../../services/testingApi';

export const TypeEnum = {
	COMPETENCIES: 'competencies',
	THEMES: 'themes',
	QUESTIONS: 'questions',
};

export function showQuestionsByTheme(e, setQuestions) {
	let li = getListElement(e);
	if (!li) {
		return;
	}

	const api = new TestingApi();
	const id = li.id;

	api.getThemeQuestions(id).then(res => setQuestions(res.results));
}

export function sortQuestionsBy(value, questions, setQuestions) {
	const sortByField = (a, b, field) => {
		if (a[field] < b[field]) return -1;
		if (a[field] > b[field]) return 1;
		return 0;
	};

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

export function showFullQuestion(e) {
	const li = getListElement(e);
	if (!li) {
		return;
	}
	const textArea = document.querySelector('#full-text-question');
	textArea.textContent = li.textContent;
}

export function addItemIdToDeleteList(e, selectedIds, filed) {
	const li = getListElement(e);
	if (!li) {
		return;
	}

	li.classList.toggle('bg-primary');
	li.classList.toggle('text-light');

	const id = li.id;
	console.log(id);
	if(!selectedIds[filed].find((el) => el === id)) {
		selectedIds[filed].push(id);
	} else {
		selectedIds[filed] = selectedIds[filed].filter((el) => el !== id);
	}
}

function getListElement(e) {
	if (e.target.tagName.toLowerCase() === 'li') {
		return e.target;
	} else if (e.target.tagName.toLowerCase() === 'span') {
		return e.target.parentElement;
	} else {
		return null;
	}
}