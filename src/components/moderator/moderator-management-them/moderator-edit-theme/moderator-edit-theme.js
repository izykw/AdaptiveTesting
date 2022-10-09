import React, { useState, useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import TestingApi from '../../../../services/testing-api';
import ListCustom from '../../../second-components/list-custom/list-custom';
import {
	showQuestionsByTheme, sortQuestionsBy
} from './moderator-edit-theme.services';
import {
	showFullQuestion,
} from '../moderator-management-them.services';
import { Link } from 'react-router-dom';

export default function ModeratorEditTheme() {
	const [themes, setThemes] = useState([]);
	const [newTheme, setNewTheme] = useState('');

	// questions current theme
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const api = new TestingApi();
			const themes = await api.getThemes();
			const questions = await api.getThemeQuestions(themes[0].pk);
			return {
				themes,
				questions: questions.results,
			};
		};

		fetchData().then(({themes, questions}) => {
			setThemes(themes);
			setQuestions(questions);
		});
	}, []);

	return (
		<Row>
			<ListCustom size={{xxl: 3, md: 3}}
									titles={{list: 'Список тем', btn: 'Удалить тему'}}
									content={themes}
									handlers={{
										list: (e) => showQuestionsByTheme(e, setQuestions),
										btn: null
									}}/>
			<ListCustom size={{xxl: 6, md: 4}}
									titles={{
										list: 'Вопросы текущей темы',
										btn: 'Удалить вопрос'
									}}
									content={questions}
									handlers={{
										list: showFullQuestion,
										btn: null
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