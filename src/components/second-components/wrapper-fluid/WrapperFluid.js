import React from 'react';
import styles from './wrapperFluid.module.css';

const {wrapper_fluid} = styles;

export default function WrapperFluid({children}) {
	return (
		<div className={wrapper_fluid}>
			{children}
		</div>
	);
}