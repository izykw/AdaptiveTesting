export function showFullQuestion(e) {
	const tagName = e.target.tagName.toLowerCase();
	console.log(tagName)
	if (tagName !== 'li' && tagName !== 'span') {
		return;
	}
	const textArea = document.querySelector('#full-text-question');
	textArea.textContent = e.target.textContent;
}

export  function undoAction() {
	console.log('undoAction');
}