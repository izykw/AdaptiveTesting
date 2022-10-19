import { Input, ListGroupItem } from 'reactstrap';
import SvgIcons from '../../../second-components/svg-icons/SvgIcons';
import React from 'react';

export function ListItemInput({type, name, placeholder, width}) {
	return (
		<ListGroupItem className="bg-transparent border-0 text-primary">
			<SvgIcons id="arrow-right" color="primary" size="20"/>
			<span className="ms-1">{name}</span>
			<div className="p-1">
				<Input type={type}
							 className={`bg-transparent border-secondary ms-3 w-${width}`}
							 placeholder={placeholder}/>
			</div>
		</ListGroupItem>);
}