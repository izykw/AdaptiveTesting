import TestingApi from '../../../../services/testing-api';
import ModalWindow from '../../../second-components/modal-window/modal-window';

export function showThemeQuestions(e, setQuestions) {
	if(e.target.tagName.toLowerCase() !== 'li') {
		return;
	}
	const api = new TestingApi();
	const id = e.target.id;
	console.log(id);
	api.getThemeQuestions(id).then((res) => {
		console.log(res);
	})
}

export function removeTheme(e) {
	e.preventDefault();
	console.log(e.tags);
}

export function removeQuestion(e) {
	e.preventDefault();

}

export function createTheme() {
}