import { Input, ListGroupItem } from 'reactstrap';
import SvgIcons from '../../../second-components/svg-icons/SvgIcons';
import React from 'react';

export function ListItemInput({type, name, placeholder, width}) {
	return (
		<ListGroupItem className="bg-transparent border-0 text-primary">
			<div className="d-flex justify-content-start align-items-center">
			<span className="me-lg-5 me-1">
				<SvgIcons id="arrow-right" color="primary" size="20"/>
				<span className="ms-1">{name}</span>
			</span>
				<Input type={type}
							 className={`bg-transparent border-secondary w-${width}`}
							 placeholder={placeholder}/>
			</div>
		</ListGroupItem>);
}