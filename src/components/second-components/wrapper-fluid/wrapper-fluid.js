import React from 'react';
import styles from './wrapper-fluid.module.css';

const {wrapper_fluid} = styles;

export default function WrapperFluid({children}) {
	return (
		<div className={wrapper_fluid}>
			{children}
		</div>
	);
}