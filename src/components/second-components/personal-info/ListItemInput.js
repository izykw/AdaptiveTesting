import { Input } from 'reactstrap';
import React from 'react';

export function ListItemInput({value, handler, isEdit}) {
	return (
		<Input
			onChange={handler}
			value={value ?? ''}
			placeholder="Неизвестно"
			style={{fontSize: 'inherit'}}
			className="d-inline-block bg-transparent border-0 w-25 text-primary"
			disabled={!isEdit}
		/>);
}