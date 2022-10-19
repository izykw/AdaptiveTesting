export function markItemSelected(e, selectedIds, filed) {
	const li = getListElement(e);
	if (li) {
		li.classList.toggle('bg-primary');
		li.classList.toggle('text-light');

		const id = li.id;

		if (!selectedIds[filed].find((el) => el === id)) {
			selectedIds[filed].push(id);
		} else {
			selectedIds[filed] = selectedIds[filed].filter((el) => el !== id);
		}
	}
}

export function showListBy(e, setState, apiMethod, type) {
	let currentListElement = getListElement(e);
	if (currentListElement) {
		const id = currentListElement.id;
		apiMethod(id).then(res => setState({[type]: res,}));
	}
}

export function getListElement(e) {
	if (e.target.tagName.toLowerCase() === 'li') {
		return e.target;
	} else if (e.target.tagName.toLowerCase() === 'span') {
		return e.target.parentElement;
	} else {
		return null;
	}
}

export function changeActiveListElement(e, setState, type, prevId) {
	const current = getListElement(e);
	if (current) {
		const prev = document.querySelector(`#${type} > [id='${prevId}']`);

		prev && prev.classList.remove('border', 'border-secondary');
		current.classList.add('border', 'border-secondary');

		setState({activeId: current.id});
	}
}