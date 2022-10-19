import { ListGroupItem } from 'reactstrap';
import SvgIcons from '../svg-icons/SvgIcons';
import React from 'react';

export function ListItems({list, listId}) {
	if (!Array.isArray(list)) {
		//throw new Error(`List: ${list} is not array`)
		return;
	}

	const active = (listId === 'themes' || listId === 'competencies') ?
		'border border-secondary' : '';
	return list.map((el, i) => {
		// Theme list include name. Question list include question. Competence list include competence
		const {pk, name, question, competence, level} = el;
		return (
			<ListGroupItem id={pk}
										 key={pk}
										 className={`ps-2 rounded-top-1 ${i === 0 ? active : ''}`}>
				<SvgIcons id={`${level}-star`} size="72" color="dark"/>
				<span style={{verticalAlign: 'middle'}}>
					{name ?? question ?? competence}
				</span>
			</ListGroupItem>);
	});
}