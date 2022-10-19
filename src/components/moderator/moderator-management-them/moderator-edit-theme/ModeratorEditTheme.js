import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import List from '../../../second-components/list/List';

import TestingApi from '../../../../services/testingApi';
import {
	sortQuestionsBy,
} from './moderatorEditTheme.services';
import { showFullQuestion } from './moderatorEditTheme.services';
import {
	markItemSelected, changeActiveListElement,
	showListBy
} from '../moderatorManagementTheme.services';
import useListData from '../../../../hooks/use-person-info/use-list-data';

export default function ModeratorEditTheme() {
	const api = new TestingApi();

	const [theme, setTheme] = useListData({
		themes: [],
		isDelete: false,
		activeId: null,
	});

	const [question, setQuestion] = useListData({
		questions: [],
		isDelete: false,
		activeId: null,
	});

	const Types = {
		THEMES: 'themes',
		QUESTIONS: 'questions',
	};

	const selectedIds = {
		[Types.THEMES]: [],
		[Types.QUESTIONS]: [],
	};

	const updateLists = () => {
		// TODO: Разобраться как избавиться от костыля isDelete: false.
		const fetchData = async () => {
			const themes = await api.getThemes();
			const questions = await api.getThemeQuestions(themes[0].pk);
			return {
				themes,
				questions,
			};
		};

		fetchData().then(({themes, questions}) => {
			setTheme({
				themes,
				activeId: theme.activeId ?? themes[0].pk,
				isDelete: false
			});
			setQuestion({
				questions,
				activeId: question.activeId ?? questions[0].pk,
				isDelete: false
			});
		});
	};

	useEffect(() => {
		updateLists();
	}, []);

	const getDataByType = (type) => {
		const textsByType = {
			[Types.THEMES]: ['Удалить тему', 'Удалить выбранные темы'],
			[Types.QUESTIONS]: ['Удалить вопрос', 'Удалить выбранные вопросы']
		};

		const methodsByType = {
			[Types.THEMES]: {
				delete: api.deleteThemes,
				setState: setTheme,
			},
			[Types.QUESTIONS]: {
				delete: api.deleteQuestions,
				setState: setQuestion,
			}
		};

		return {
			text: textsByType[type],
			methods: methodsByType[type],
		};
	};

	const buttonClickHandler = (e, type, isDelete) => {
		e.preventDefault();

		const {methods, text} = getDataByType(type);

		if (isDelete) {
			e.target.textContent = text[0];
			selectedIds[type].length &&
			methods.delete(selectedIds[type]).then(updateLists);
		} else {
			e.target.textContent = text[1];
		}

		methods.setState((prevState) => ({isDelete: !prevState.isDelete}));
	};

	const listClickHandler = (e, type, isDelete) => {
		if (isDelete) {
			markItemSelected(e, selectedIds, type);
			return;
		}

		if (type === Types.THEMES) {
			showListBy(e, setQuestion, api.getThemeQuestions, Types.QUESTIONS);
			changeActiveListElement(e, setTheme, type, theme.activeId);
		} else {
			showFullQuestion(e);
			changeActiveListElement(e, setQuestion, type, question.activeId);
		}
	};

	return (
		<>
			<Row>
				<List size={{xxl: 3, md: 3}}
							id={Types.THEMES}
							titles={{list: 'Список тем', btn: 'Удалить тему'}}
							content={theme.themes}
							handlers={{
								list: (e) => listClickHandler(e, Types.THEMES, theme.isDelete),
								btn: (e) => buttonClickHandler(e, Types.THEMES, theme.isDelete)
							}}/>
				<List size={{xxl: 6, md: 4}}
							id={Types.QUESTIONS}
							titles={{list: 'Вопросы текущей темы', btn: 'Удалить вопрос'}}
							content={question.questions}
							handlers={{
								list: (e) => listClickHandler(e, Types.QUESTIONS,
									question.isDelete),
								btn: (e) => buttonClickHandler(e, Types.QUESTIONS,
									question.isDelete)
							}}/>
				<Col>
					<span className="fs-5">Сортировать вопросы по:</span>
					<div style={{minHeight: '500px'}}
							 className="d-flex justify-content-between flex-column">
						<div className="d-flex flex-column">
							<select
								className="form-select border-1 border-secondary bg-transparent mb-2"
								onChange={(e) => sortQuestionsBy(e.target.value,
									question.questions,
									setQuestion)}>
								<option value="date">Дате</option>
								<option value="alphabet">Алфавиту</option>
								<option value="level">Сложности</option>
							</select>
							<Link to="/moderator/create-question"
										className="shadow_element bg-transparent btn border border-2">
								Создание вопроса
							</Link>
						</div>
						<img src="/"
								 style={{height: '350px'}}
								 className="border border-secondary rounded-3"
								 alt="Изображение к вопросу"/>
					</div>
				</Col>
			</Row>
			<Row className="mx-0 mt-xl-5 mt-2">
					<textarea
						style={{minHeight: '110px', resize: 'none'}}
						id="full-text-question"
						className="border border-secondary rounded-3 p-2 w-100"
						placeholder="Кликните на вопрос, чтобы увидеть его полностью"
						disabled
					/>
			</Row>
		</>
	);
}