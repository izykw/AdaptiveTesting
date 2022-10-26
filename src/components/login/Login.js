import React from 'react';
import Wrapper from '../second-components/wrapper/Wrapper';
import { Container, Row } from 'reactstrap';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import TestingApi from '../../services/testingApi';

const { horizontal_line } = styles;

export default function Login() {
	const navigate = useNavigate();
	const { handleSubmit, register, formState: { errors } } = useForm();
	const login = (data) => {
		const api = new TestingApi();
		api.authorization(data).then(res => {
			console.log(document.cookie)
			console.log(res);
			if (res.status === 202) {
				navigate('/select-role');
			}
		});
	};


	return (
		<Wrapper>
			<Container
				className="shadow_element d-flex flex-column justify-content-evenly text-primary flex-grow-1 bg-light border border-2 rounded-3">
				<Row className="mx-auto" style={{width: '600px'}}>
					<h2 className="text-primary mb-5">Вход в систему</h2>
					<form className="form-control d-flex flex-column border-0 p-0"
								onSubmit={handleSubmit(login)}
								id="login">
						<label className="form-label">
							Введите электронную почту
							<input type="email"
										 defaultValue="hello@mail.ru"
										 {...register('username')}
										 className="form-control w-100 bg-transparent"/>
						</label>
						<label className="form-label">
							Пароль
							<input type="password"
										 {...register('password')}
										 defaultValue="ivan"
										 className="form-control bg-transparent mx-0"/>
						</label>
					</form>
				</Row>
				<Row className="mx-auto" style={{width: '600px'}}>
					<button form="login"
									className="btn text-primary border border-1">
						Войти
					</button>
					<span className={`${horizontal_line} text-dark text-center py-2`}>
						Или
						</span>
					<button className="btn text-primary border border-1">
						Пройти регистрацию
					</button>
				</Row>
			</Container>
		</Wrapper>
	);
}