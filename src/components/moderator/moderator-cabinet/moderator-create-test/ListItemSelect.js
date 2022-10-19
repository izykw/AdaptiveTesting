import { ListGroupItem } from 'reactstrap';
import SvgIcons from '../../../second-components/svg-icons/SvgIcons';
import React from 'react';

export function ListItemSelect({name, options}) {
	if (!Array.isArray(options)) {
		throw new Error('Options is not array');
	}
	return (
		<ListGroupItem className="bg-transparent border-0 text-primary">
			<SvgIcons id="arrow-right" color="primary" size="20"/>
			<span className="ms-1">{name}</span>
			<div className="p-1">
				<select className="form-select border-1 border-secondary bg-transparent ms-3"
								value={options[0].value}>
					{options.map(({value, name}) => {
						return <option value={value}>{name}</option>;
					})}
				</select>
			</div>
		</ListGroupItem>);
}