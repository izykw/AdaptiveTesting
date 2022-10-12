import React from 'react';
import styles from './wrapper.module.css';

const {wrapper} = styles;

export default function Wrapper({children}) {
	return (
		<div className={wrapper}>
			{children}
		</div>
	);
}