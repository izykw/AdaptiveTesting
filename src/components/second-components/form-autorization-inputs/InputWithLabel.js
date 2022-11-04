import { errorMessage } from '../../../services/services';
import React from 'react';

export function InputWithLabel({ errors, type, title, register }) {
	return (
		<label className="form-label fs-5">
			<span className="ps-2">{title}</span>
			{
				errors[register.name] && errorMessage(errors[register.name].message)
			}
			<input type={type}
						 {...register}
						 className="form-control py-2 fs-5 text-primary mt-1"/>
		</label>
	);
}