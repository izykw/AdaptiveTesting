import React from 'react';
import {Col} from 'reactstrap';
import SvgIcons from '../svg-icons/SvgIcons';

export default function SelectWithIcon({name, title, handler, options}) {
	return (
		<Col>
			<SvgIcons id="arrow-right" color="primary" size="20"/>
			<span className="fs-5 ms-1">{title}</span>
			<select
				name={name}
				className="form-select border-1 border-secondary bg-transparent w-50"
				onChange={handler}>
				{options.map((option) => {
					const key = Object.keys(option).toString();
					const value = Object.values(option).toString();
					return <option key={key} value={key}>{value}</option>
				})}
			</select>
		</Col>
	)
}