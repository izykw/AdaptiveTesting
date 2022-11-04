import React, { useState } from 'react';
import { ListGroupItem } from 'reactstrap';
import SvgIcons from '../../../second-components/svg-icons/SvgIcons';
import { errorMessage } from '../../../../services/services';

export function ListItemSelect({ title, options, defaultValue = '', register, errors }) {
	if (!Array.isArray(options)) {
		throw new Error('Options is not array');
	}

	const [selected, setSelected] = useState(defaultValue);

	return (
		<ListGroupItem className="bg-transparent border-0 text-primary">
			<SvgIcons id="arrow-right" color="primary" size="20"/>
			<span className="ms-1">{title}</span>
			{errors && errorMessage(errors.message)}
			<div className="p-1">
				<select {...register}
								value={selected}
								onChange={(e) => {
									register.onChange(e);
									setSelected(e.target.value);
								}}
								className="form-select border-1 border-secondary bg-transparent ms-3">
					<option key="empty" value=""></option>
					{
						options.map(item => {
							// levels has id, competence has pk
							const { pk, id, competence, name } = item;
							const key = pk ?? id;
							return (
								<option key={key} value={key}>
									{name ?? competence}
								</option>
							);
						})
					}
				</select>
			</div>
		</ListGroupItem>);
}