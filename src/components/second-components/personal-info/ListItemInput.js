import { Input } from 'reactstrap';
import React from 'react';

export function ListItemInput({value, handler, isEdit, width = 50}) {
	return (
		<Input
			onChange={handler}
			value={value ?? ''}
			placeholder="Неизвестно"
			style={{fontSize: 'inherit'}}
			className={`d-inline-block bg-transparent border-0 w-${width} text-primary`}
			disabled={!isEdit}
		/>);
}