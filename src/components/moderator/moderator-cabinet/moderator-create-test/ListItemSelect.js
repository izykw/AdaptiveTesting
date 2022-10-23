import { ListGroupItem } from 'reactstrap';
import SvgIcons from '../../../second-components/svg-icons/SvgIcons';
import React from 'react';

export function ListItemSelect({title, options, register, errors}) {
	if (!Array.isArray(options)) {
		throw new Error('Options is not array');
	}

	return (
		<ListGroupItem className="bg-transparent border-0 text-primary">
			<SvgIcons id="arrow-right" color="primary" size="20"/>
			<span className="ms-1">{title}</span>
			<div className="p-1">
				<select {...register}
								className="form-select border-1 border-secondary bg-transparent ms-3">
					<option key="empty" value=""></option>
					{
						options.map(item => {
							const {pk, competence, name} = item;
							return <option key={pk} value={pk}>{name ?? competence}</option>;
						})
					}
				</select>
				<p className="text-danger p-0 m-0 ms-4">
					{errors && errors.message}
				</p>
			</div>
		</ListGroupItem>);
}