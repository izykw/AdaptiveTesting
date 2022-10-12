import React, { useEffect, useState } from 'react';
import { Button, Col, Container, FormGroup, Row } from 'reactstrap';
import { Form, redirect, useNavigate } from 'react-router-dom';
import WrapperFluid
	from '../../../second-components/wrapper-fluid/WrapperFluid';
import Header from '../../../header/Header';
import SelectWithIcon
	from '../../../second-components/select-with-icon/SelectWithIcon';
import SvgIcons from '../../../second-components/svg-icons/SvgIcons';
import { addAnswersInput } from './AnswerInput';

import styles from './moderatorCreateQuestion.module.css';
import TestingApi from '../../../../services/testingApi';

const {text_field, image} = styles;

export async function action({request}) {
	const formData = await request.formData();
	formDataToRequestData(formData);
	// return redirect(`/moderator/management-theme`);
}

function formDataToRequestData(formData) {
	const {level, theme, type, question, ...otherData} = Object.fromEntries(
		formData);
	console.log(otherData)
}

export default function ModeratorCreateQuestion({header: {title, isFluid}}) {
	const [countAnswers, setCountAnswers] = useState(4);
	const [themes, setThemes] = useState([]);
	const [levels, setLevels] = useState([]);
	const navigate = useNavigate();

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
		fetchData().then(({themes, levels}) => {
			setThemes(themes);
			setLevels(levels);
		});
	}, []);

	const changeCountAnswers = (e, type) => {
		e.preventDefault();
		switch (type) {
			case 'inc': {
				setCountAnswers((prevState) => {
					return prevState === 6 ? prevState : prevState + 1;
				});
				break;
			}
			case 'dec': {
				setCountAnswers((prevState) => {
					return prevState === 0 ? prevState : prevState - 1;
				});
				break;
			}
			default: {
				throw new Error(`${type} this type doesnt exist`);
			}
		}
	};

	const getQuestionOptions = () => {
		return (
			[
				{id: 1, name: 'Один ответ'},
				{id: 2, name: 'Несколько ответов'},
			]
		);
	};

	return (
		<WrapperFluid>
			<Header title={title} isFluid={isFluid}/>
			<Container fluid
								 className="d-flex flex-column flex-grow-1 bg-light border border-2 rounded-3">
				<Row>
					<span className="fs-5 text-primary">
						<SvgIcons id="bookmark-two-dash" color="primary" size="20"/>
						<span style={{verticalAlign: 'middle'}} className="ms-1">
							Создание вопроса
						</span>
					</span>
				</Row>
				<Form method="post"
							className="d-flex flex-column justify-content-around flex-grow-1">
					<FormGroup>
						<Row>
							<SelectWithIcon name="theme"
															title="Выберите тему"
															handler={null}
															options={themes}/>
							<SelectWithIcon name="type"
															title="Выберите тип вопроса"
															handler={null}
															options={getQuestionOptions()}/>
							<SelectWithIcon name="level"
															title="Выберите уровень сложности"
															handler={null}
															options={levels}/>
						</Row>
					</FormGroup>
					<FormGroup>
						<Row className="mx-0">
							<textarea
								defaultValue="test"
								name="question"
								className={`${text_field} form-control bg-transparent border-secondary rounded-3 w-100 p-2`}
								placeholder="Введите текст"/>
						</Row>
					</FormGroup>
					<FormGroup>
						<Row>
							<Col>
								<span className="fs-5">Варианты ответов</span>
								<a href="/"
									 className="link-secondary ms-3"
									 onClick={(e) => changeCountAnswers(e, 'inc')}>
									Добавить вариант ответа
								</a>
								<a href="/"
									 className="link-secondary ms-3"
									 onClick={(e) => changeCountAnswers(e, 'dec')}>
									Удалить вариант ответа
								</a>
								{addAnswersInput(countAnswers)}
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
								<button
									onClick={() => navigate(-1)}
									className="shadow_element bg-transparent btn text-dark border border-2 w-50">
									Выход
								</button>
							</Col>
							<Col className="d-flex justify-content-end">
								<Button type="submit"
												className="shadow_element bg-transparent btn text-dark border border-2 w-50">
									Добавить
								</Button>
							</Col>
						</Row>
					</FormGroup>
				</Form>
			</Container>
		</WrapperFluid>
	);
}