import React, {useState, useEffect} from 'react';
import {Col, Input, Row} from 'reactstrap';
import TestingApi from '../../../../services/testing-api';
import ListCustom from '../../../second-components/list-custom/list-custom';
import ButtonCustom
	from '../../../second-components/button-custom/button-custom';
import {
	removeQuestion,
	removeTheme,
	createTheme,
	showThemeQuestions
} from './moderator-edit-theme.services';
import {
	showFullQuestion,
	undoAction
} from '../moderator-management-them.services';

export default function ModeratorEditTheme() {
	const [themes, setThemes] = useState([]);

	// questions current theme
	const [questions, setQuestions] = useState([]);
	const [newTheme, setNewTheme] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			const api = new TestingApi();
			const themes = await  api.getThemes();
			const questions = await  api.getQuestions();
			return {
				themes,
				questions,
			}
		}

		fetchData().then(res => {
			console.log(res);
			setThemes(res.themes);
			setQuestions(questions);
		})
	}, []);

	return (
		<Row>
			<ListCustom size={{xxl: 3, md: 3}}
						titles={{list: 'Список тем', btn: 'Удалить тему'}}
						content={themes}
						handlers={{
							list: showThemeQuestions,
							btn: removeTheme
						}}/>
			<ListCustom size={{xxl: 6, md: 4}}
						titles={{
							list: 'Вопросы текущей темы',
							btn: 'Удалить вопрос'
						}}
						content={questions}
						handlers={{
							list: showFullQuestion,
							btn: removeQuestion
						}}/>
			<Col>
				<span className="fs-5">Создать тему</span>
				<div style={{minHeight: '500px'}}
					 className="d-flex justify-content-between flex-column">
					<Input
						onChange={(e) => setNewTheme(e.target.value)}
						value={newTheme}
						className="border-secondary bg-transparent"
						placeholder="Введите название"
					/>
					<ButtonCustom text="Создать тему" handler={createTheme}/>
					<ButtonCustom text="Отменить действие" handler={undoAction}/>
					<img src="/"
						 style={{height: '350px'}}
						 className="border border-secondary rounded-3"
						 alt="Изображение к вопросу"/>
				</div>
			</Col>
		</Row>
	);
}