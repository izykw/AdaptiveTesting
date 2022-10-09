export function isValidData({newTheme, newCompetence}) {
	let isValid = true;
	const messages = [];
	if(!newTheme) {
		isValid = false;
		messages.push('Введите название новой темы');
	}
	if(!newCompetence.length) {
		isValid = false;
		messages.push('Введите название компетенции');
	}
	if(!isValid) {
	}
}