import React from 'react';
import { Col } from 'reactstrap';
import SvgIcons from '../svg-icons/SvgIcons';
import {errorMessage} from '../../../services/services';

export default function SelectWithIcon({name, title, handleForm, options}) {
	const {register, errors, required} = handleForm;
	return (
		<Col>
			<SvgIcons id="arrow-right" color="primary" size="20"/>
			<span className="fs-5 ms-1">{title}</span>
			<select
				{...register(name, {required: required[name]})}
				className="form-select border-1 border-secondary bg-transparent w-50">
				<option key="empty" value="">{''}</option>
				{options.map(({id, pk, name}) => {
					// if not id, then pk
					return <option key={id ?? pk} value={id ?? pk}>{name}</option>;
				})}
			</select>
			{errors[name] && errorMessage(errors[name].message)}
		</Col>
	);
}