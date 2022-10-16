import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import List from '../../../second-components/list/List';

import TestingApi from '../../../../services/testingApi';
import {
	addItemIdToDeleteList,
	showQuestionsByTheme,
	sortQuestionsBy,
	TypeEnum
} from './moderatorEditTheme.services';
import { showFullQuestion } from './moderatorEditTheme.services';

export default function ModeratorEditTheme() {
	const api = new TestingApi();
	const [themes, setThemes] = useState([]);
	const [questions, setQuestions] = useState([]);

	const [isDeleteTheme, setIsDeleteTheme] = useState(false);
	const [isDeleteQuestion, setIsDeleteQuestion] = useState(false);
	const [currentTheme, setCurrentTheme] = useState();
	const [currentQuestion, setCurrentQuestion] = useState();

	const selectedIds = {
		questions: [],
		themes: [],
	}

	const fetchData = async () => {
		const themes = await api.getThemes();
		const questions = await api.getThemeQuestions(themes[0].pk);
		return {
			themes,
			questions,
		};
	}

	const updateLists = () => {
		fetchData().then(({themes, questions}) => {
			setThemes(themes);
			setQuestions(questions);
		});
	}

	useEffect(() => {
		updateLists();
	}, []);


	const buttonClickHandler = (e, type) => {
		e.preventDefault();
		switch (type) {
			case 'themes': {
				if (isDeleteTheme) {
					api.deleteThemes(selectedIds.themes).then(() => updateLists());
					e.target.textContent = 'Удалить тему';
				} else {
					e.target.textContent = 'Удалить выбранные темы';
				}
				setIsDeleteTheme((prevState) => !prevState);
				break;
			}
			case 'questions': {
				if (isDeleteQuestion) {
					api.deleteQuestions(selectedIds.questions).then(() => updateLists());
					e.target.textContent = 'Удалить вопрос';
				} else {
					e.target.textContent = 'Удалить выбранные вопросы';
				}
				setIsDeleteQuestion((prevState) => !prevState);
				break;
			}
			default: {
				throw new Error('List type doesnt exist');
			}
		}
	};

	const listClickHandler = (e, type) => {
		switch (type) {
			case 'themes': {
				isDeleteTheme
					? addItemIdToDeleteList(e, selectedIds, 'themes')
					: showQuestionsByTheme(e, setQuestions);
				break;
			}
			case 'questions': {
				isDeleteQuestion
					? addItemIdToDeleteList(e, selectedIds, 'questions')
					: showFullQuestion(e);
				break;
			}
			default: {
				throw new Error('List type doesnt exist');
			}
		}
	};

	return (
		<Row>
			<List size={{xxl: 3, md: 3}}
						titles={{list: 'Список тем', btn: 'Удалить тему'}}
						content={themes}
						handlers={{
							list: (e) => listClickHandler(e, TypeEnum.THEMES),
							btn: (e) => buttonClickHandler(e, TypeEnum.THEMES)
						}}/>
			<List size={{xxl: 6, md: 4}}
						titles={{list: 'Вопросы текущей темы', btn: 'Удалить вопрос'}}
						content={questions}
						handlers={{
							list: (e) => listClickHandler(e, TypeEnum.QUESTIONS),
							btn: (e) => buttonClickHandler(e, TypeEnum.QUESTIONS)
						}}/>
			<Col>
				<span className="fs-5">Сортировать вопросы по:</span>
				<div style={{minHeight: '500px'}}
						 className="d-flex justify-content-between flex-column">
					<select
						className="form-select border-1 border-secondary bg-transparent"
						onChange={(e) => sortQuestionsBy(e.target.value, questions,
							setQuestions)}>
						<option value="date">Дате</option>
						<option value="alphabet">Алфавиту</option>
						<option value="level">Сложности</option>
					</select>
					<Link to="/moderator/create-question"
								className="shadow_element bg-transparent btn border border-2">
						Создание вопроса
					</Link>
					<img src="/"
							 style={{height: '350px'}}
							 className="border border-secondary rounded-3"
							 alt="Изображение к вопросу"/>
				</div>
			</Col>
		</Row>
	);
}