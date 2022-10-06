import React, {useState, useEffect} from 'react';
import ListCustom from '../../../second-components/list-custom/list-custom';
import {Col, Row} from 'reactstrap';
import ButtonCustom
	from '../../../second-components/button-custom/button-custom';
import {Link} from 'react-router-dom';
import TestingApi from '../../../../services/testing-api';
import {
	showFullQuestion,
	undoAction
} from '../moderator-management-them.services';
import {
	duplicateTheme,
	addQuestionInTheme,
	sortQuestionsBy
} from './moderator-add-question.services';

export default function ModeratorAddQuestion() {
	const api = new TestingApi();
	const [themes, setThemes] = useState(null);
	const [questions, setQuestions] = useState(null);

	useEffect(() => {
		Promise.all([api.getThemes(), api.getQuestions()])
			.then(([themes, questions]) => {
				setThemes(themes.data.results);
				setQuestions(questions.data.results);
			});
	}, []);

	return (
		<Row>
			<ListCustom size={{xxl: 3, md: 3}}
						titles={{list: 'Список тем', btn: 'Дублировать тему'}}
						content={themes}
						handlers={{
							list: null,
							btn: duplicateTheme
						}}/>
			<ListCustom size={{xxl: 6, md: 4}}
						titles={{
							list: 'База вопросов',
							btn: 'Добавить вопрос в тему'
						}}
						content={questions}
						handlers={{
							list: showFullQuestion,
							btn: addQuestionInTheme
						}}/>
			<Col>
				<span className="fs-5">Сортировать вопросы по:</span>
				<div style={{minHeight: '500px'}}
					 className="d-flex justify-content-between flex-column">
					<select
						className="form-select border-1 border-secondary bg-transparent"
						onChange={(e) => sortQuestionsBy(e.target.value,
							questions, setQuestions)}>
						<option value="date">Дате</option>
						<option value="alphabet">Алфавиту</option>
						<option value="level">Сложности</option>
					</select>
					<Link to="/moderator/create-question"
						  className="shadow_element bg-transparent btn border border-2">
						Создание вопроса
					</Link>
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