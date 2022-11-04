import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Wrapper from '../second-components/wrapper/Wrapper';
import { Container } from 'reactstrap';
import styles from './authorization.module.css';
import {
	InputWithLabel
} from '../second-components/form-autorization-inputs/InputWithLabel';

const { horizontal_line } = styles;

export default function Authorization() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		}
	});

	const authorization = (data) => {
		console.log(data);
	};

	const emailErrorMessage = 'Пожалуйста, введите электронную почту';
	const passwordErrorMessage = 'Пожалуйста, введите пароль';

	return (
		<Wrapper>
			<Container className="shadow_element bg-light rounded-3">
				<form onSubmit={handleSubmit(authorization)}
							style={{ maxWidth: '550px', minHeight: '100vh' }}
							className="d-flex flex-column justify-content-evenly mx-auto text-primary">
					<div className="d-flex flex-column">
						<h1 className="mb-5">Вход в систему</h1>
						<InputWithLabel errors={errors}
														type="email"
														title="Электронная почта"
														register={register('email', { required: emailErrorMessage })}/>
						<InputWithLabel errors={errors}
														type="password"
														title="Пароль"
														register={register('password', { required: passwordErrorMessage })}/>
						<Link to="/recovery-password" className="text-primary mx-auto">
							Восстановление пароля
						</Link>
					</div>
					<div className="d-flex flex-column justify-content-between">
						<button type="submit"
										className="btn text-primary border border-2 fs-5 p-3">
							{'Войти'.toUpperCase()}
						</button>
						<span className={`${horizontal_line} text-dark text-center py-3`}>
						Или
					</span>
						<Link to="/registration"
									className="btn text-primary border border-2 fs-5 p-3">
							{'Пройти регестрацию'.toUpperCase()}
						</Link>
					</div>
				</form>
			</Container>
		</Wrapper>
	);
}