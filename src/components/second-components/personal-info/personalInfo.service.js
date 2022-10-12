export function linkChangeTextContent(isEdit) {
	const link = document.querySelector('#edit-data');
	if (isEdit === true) {
		link.textContent = 'Редактировать данные';
	} else {
		link.textContent = 'Отправить данные';
	}
}

export function deepEqual(obj1, obj2) {
	return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function isObjectEmpty(obj) {
	return Object.keys(obj).length === 0;
}