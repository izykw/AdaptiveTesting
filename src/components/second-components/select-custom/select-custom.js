import React from 'react';
import {Col} from 'reactstrap';
import SvgIcons from '../svg-icons/svg-icons';

export default function SelectCustom({title, handler, options}) {
	return (
		<Col>
			<SvgIcons id="arrow-right" color="primary" size="20"/>
			<span className="fs-5 ms-1">{title}</span>
			<select
				className="form-select border-1 border-secondary bg-transparent w-50"
				onChange={handler}>
				{options.map((option) => {
					const name = Object.keys(option);
					const value = Object.values(option);
					return <option key={value} value={value}>{name}</option>
				})}
			</select>
		</Col>
	)
}