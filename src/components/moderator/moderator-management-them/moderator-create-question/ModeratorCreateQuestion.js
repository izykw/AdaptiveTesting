import React, { useEffect, useState } from 'react';
import { Button, Col, Container, FormGroup, Row } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import WrapperFluid
	from '../../../second-components/wrapper-fluid/WrapperFluid';
import Header from '../../../header/Header';
import SelectWithIcon
	from '../../../second-components/select-with-icon/SelectWithIcon';
import SvgIcons from '../../../second-components/svg-icons/SvgIcons';
import { addAnswersInput } from './AnswerInput';
import {
	changeCountAnswers,
	errorMessage,
	getQuestionOptions,
	checkAnswersCount,
	postQuestion
} from './moderatorCreateQuestions.services';

import styles from './moderatorCreateQuestion.module.css';
import TestingApi from '../../../../services/testingApi';
import LightButton from '../../../second-components/light-button/LightButton';

const { text_field, image } = styles;

export default function ModeratorCreateQuestion({
	header: {
		title,
		isFluid
	}
}) {
	const [countAnswers, setCountAnswers] = useState(4);
	const [isCorrectAnswersCount, setIsCorrectAnswersCount] = useState(false);

	const [themes, setThemes] = useState([]);
	const [levels, setLevels] = useState([]);

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitSuccessful }
	} = useForm({
		reValidateMode: 'onBlur',
		shouldUnregister: true,
	});

	useEffect(() => {
		const fetchData = async () => {
			const api = new TestingApi();
			const themes = await api.getThemes();
			const levels = await api.getLevels();
			return {
				themes,
				levels: levels.results,
			};
		};
		fetchData().then(({ themes, levels }) => {
			setThemes(themes);
			setLevels(levels);
		});
	}, []);

	useEffect(() => {
		isSubmitSuccessful && navigate('/moderator/management-theme');
	}, [isSubmitSuccessful]);

	const handleForm = {
		register,
		required: {
			theme: 'Пожалуйста, выберите тему вопроса',
			type: 'Пожалуйста, выберите тип вопроса',
			level: 'Пожалуйста, выберите уровень сложности вопроса',
			answer: true,
			is_correct: true,
		},
		errors,
	};

	const onClick = () => {
		const value = checkAnswersCount();
		if (value !== isCorrectAnswersCount) {
			setIsCorrectAnswersCount(value);
		}
	};

	return (
		<WrapperFluid>
			<Header title={title} isFluid={isFluid}/>
			<Container fluid
								 className="d-flex flex-column flex-grow-1 bg-light border border-2 rounded-3">
				<Row>
					<span className="fs-5 text-primary">
						<SvgIcons id="bookmark-two-dash" color="primary" size="20"/>
						<span style={{ verticalAlign: 'middle' }} className="ms-1">
							Создание вопроса
						</span>
					</span>
				</Row>
				<form onSubmit={handleSubmit(postQuestion)}
							className="d-flex flex-column justify-content-around flex-grow-1">
					<FormGroup>
						<Row>
							<SelectWithIcon name="theme"
															title="Выберите тему"
															handleForm={handleForm}
															options={themes}/>
							<SelectWithIcon name="type"
															title="Выберите тип вопроса"
															handleForm={handleForm}
															options={getQuestionOptions()}/>
							<SelectWithIcon name="level"
															title="Выберите уровень сложности"
															handleForm={handleForm}
															options={levels}/>
						</Row>
					</FormGroup>
					<FormGroup>
						<Row className="mx-0">
							<textarea
								{...register('question',
									{ required: 'Пожалуйста, введите текст вопроса' })}
								className={`${text_field} form-control bg-transparent border-secondary rounded-3 w-100 p-2`}
								placeholder="Введите текст"/>
							{errors.question && errorMessage(errors.question.message)}
						</Row>
					</FormGroup>
					<FormGroup>
						<Row>
							<Col>
								<span className="fs-5">Варианты ответов</span>
								<a href="/"
									 className="link-secondary ms-3"
									 onClick={(e) => changeCountAnswers(e, 'inc',
										 setCountAnswers)}>
									Добавить вариант ответа
								</a>
								<a href="/"
									 className="link-secondary ms-3"
									 onClick={(e) => changeCountAnswers(e, 'dec',
										 setCountAnswers)}>
									Удалить вариант ответа
								</a>
								<div>
									{addAnswersInput(countAnswers, isCorrectAnswersCount,
										handleForm)}
									{
										errors.is_correct && errorMessage(
											'Пожалуйста, укажите количество правильных ответов в соотвтствии с типом вопроса')
									}
									{
										errors.answer && errorMessage(
											'Пожалуйста, заполните все поля с ответами')
									}
								</div>
							</Col>
							<Col className="d-flex justify-content-end align-items-center">
								<div className={image}>
									<img src="/"
											 className="border border-secondary rounded-3 w-25`"
											 alt="Изображение к вопросу"/>
									<a href="/"
										 onClick={(e) => e.preventDefault()}
										 className="link-secondary border border-secondary rounded-top py-1 px-2">
										Удалить
									</a>
								</div>
							</Col>
						</Row>
					</FormGroup>
					<FormGroup>
						<Row>
							<Col>
								<LightButton text="Выход"
														 handler={() => navigate(-1)}
														 width="50"
														 isShadow/>
							</Col>
							<Col className="d-flex justify-content-end">
								<LightButton type="submit"
														 text="Добавить"
														 handler={onClick}
														 width="50"
														 isShadow/>
							</Col>
						</Row>
					</FormGroup>
				</form>
			</Container>
		</WrapperFluid>
	);
}