import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import Wrapper from '../second-components/wrapper/Wrapper';
import { useForm } from 'react-hook-form';
import {
	InputWithLabel
} from '../second-components/form-autorization-inputs/InputWithLabel';
import SvgIcons from '../second-components/svg-icons/SvgIcons';

export default function Registration() {
	const { register, handleSubmit, formState: { errors }, setError } = useForm({
		defaultValues: {
			email: '',
			password: '',
			passwordRepeated: '',
		}
	});

	const registration = (data) => {
		if (data.password !== data.passwordRepeated) {
			setError('passwordRepeated', { message: 'Пароли должны совпадать' });
			return;
		}
	};

	const emailErrorMessage = 'Пожалуйста, введите почту';
	const passwordErrorMessage = 'Пожалуйста, введите пароль';
	const passwordRepeatedErrorMessage = 'Пожалуйста, введите пароль';

	return (
		<Wrapper>
			<Container className="shadow_element bg-light rounded-3">
				<Link to="/" className="text-primary p-2 position-fixed">
					<SvgIcons id="arrow-left" color="primary" size="20"/>
					Вернуться
				</Link>
				<form onSubmit={handleSubmit(registration)}
							style={{ maxWidth: '550px', minHeight: '100vh' }}
							className="d-flex flex-column justify-content-evenly mx-auto text-primary">
					<div className="d-flex flex-column">
						<h1 className="mb-5">Регистрация</h1>
						<InputWithLabel errors={errors}
														type="email"
														title="Электронная почта"
														register={register('email',
															{ required: emailErrorMessage })}/>
						<InputWithLabel errors={errors}
														type="password"
														title="Введите пароль"
														register={register('password',
															{ required: passwordErrorMessage })}/>
						<InputWithLabel errors={errors}
														type="password"
														title="Повторите пароль"
														register={register('passwordRepeated',
															{ required: passwordRepeatedErrorMessage })}/>
					</div>
					<button type="submit"
									className="btn text-primary border border-2 fs-5 p-3">
						{'Зарегестрироваться'.toUpperCase()}
					</button>
				</form>
			</Container>
		</Wrapper>
	);
}