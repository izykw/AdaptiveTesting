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
	const api = new TestingApi();
	const [themes, setThemes] = useState(null);

	// questions current theme
	const [questions, setQuestions] = useState(null);
	const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		api.getThemes().then(({data}) => {
			return data.results;
		}).then(themes => {
			console.log(themes);
			api.getThemeQuestions(themes[0].pk).then(({data: {results}}) => {
				console.log(themes, results);
				setThemes(themes);
				setQuestions(results);
			});
		});
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
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						className="border-secondary bg-transparent"
						placeholder="Введите название"
					/>
					<ButtonCustom text="Создать тему" handler={createTheme}/>
					<ButtonCustom text="Отменить действие"
								  handler={undoAction}/>
					<img src="/"
						 style={{height: '350px'}}
						 className="border border-secondary rounded-3"
						 alt="Изображение к вопросу"/>
				</div>
			</Col>
		</Row>
	);
}