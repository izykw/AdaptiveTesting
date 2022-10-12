import React from 'react';
import {Link} from 'react-router-dom';
import {Container} from 'reactstrap';

import styles from './selectRole.module.css';

const {wrapper, wrapper_inner, horizontal_line} = styles;

export default function SelectRole() {
	return (
		<Container className={`${wrapper} bg-light shadow_element d-flex justify-content-center align-items-center text-primary rounded-3`}>
			<div className={`${wrapper_inner}`}>
				<h1 className="h1 mb-5">Выберите роль</h1>
				<div className="d-flex flex-column justify-content-between">
					<Link to="/moderator"
								className="btn text-primary border border-2 fs-5 p-3">МОДЕРАТОР</Link>
					<span className={`${horizontal_line} text-dark text-center py-3`}>Или</span>
					<Link to="/user"
								className="btn text-primary border border-2 fs-5 p-3">ПОЛЬЗОВАТЕЛЬ</Link>
				</div>
			</div>
		</Container>
	);
}