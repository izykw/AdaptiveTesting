import React, { useEffect } from 'react';
import { Col, Input, Row } from 'reactstrap';
import List from '../../../second-components/list/List';
import LightButton from '../LightButton';
import TestingApi from '../../../../services/testingApi';
import useListData from '../../../../hooks/use-list-data/useListData';
import { Link } from 'react-router-dom';
import {
	markItemSelected, changeActiveListElement, showListBy
} from './moderatorEdit.services';

//TODO: Разобраться с этим окном. (стоит разделить все 3 списка на разные компоненты)
export default function ModeratorEdit() {
	const api = new TestingApi();
	const [theme, setTheme] = useListData({
		themes: [],
		newThemeName: '',
		activeId: null,
		isControl: false,
	});

	const [competence, setCompetence] = useListData({
		competencies: [],
		newCompetenceName: '',
		activeId: null,
		isDelete: false,
	});

	const [question, setQuestion] = useListData({
		questions: [],
		isDelete: false,
		activeId: null,
		activeText: ''
	});

	const Types = {
		COMPETENCIES: 'competencies',
		THEMES: 'themes',
		QUESTIONS: 'questions',
	};

	const selectedIds = {
		[Types.COMPETENCIES]: [],
		[Types.THEMES]: [],
		[Types.QUESTIONS]: [],
	};

	const updateLists = () => {
		const fetchData = async () => {
			const newCompetencies = await api.getCompetencies();
			const newThemes = await api.getCompetenceThemes(
				competence.activeId ?? newCompetencies.results[0]?.pk);
			const newQuestions = await api.getThemeQuestions(
				theme.activeId ?? newThemes[0]?.pk);

			return {
				competencies: newCompetencies.results,
				themes: newThemes,
				questions: newQuestions,
			};
		};

		fetchData().then(({ competencies, themes, questions }) => {
			setTheme({
				themes,
				activeId: theme.activeId ?? themes[0]?.pk,
				isDelete: false,
				newThemeName: '',
			});
			setCompetence({
				competencies,
				activeId: competence.activeId ?? competencies[0]?.pk,
				isDelete: false,
				newCompetenceName: '',
			});
			setQuestion({
				questions,
				activeId: question.activeId ?? question[0]?.pk,
				activeText: '',
				isDelete: false,
			});
		}).catch(err => console.error(err));
	};

	useEffect(() => {
		const api = new TestingApi();
		api.getCompetencies()
			.then(({ results }) => setCompetence({ competencies: results }));
	}, []);

	const getDataByType = (type) => {
		const textsByType = {
			[Types.COMPETENCIES]: ['Удалить компетенции',
				'Удалить выбранные компетенции'],
			[Types.THEMES]: ['Удалить темы',
				'Выберите темы, которые хотите удалить'],
			[Types.QUESTIONS]: ['Удалить вопросы',
				'Выберите вопросы, которые хотите удалить']
		};

		const methodsByType = {
			[Types.COMPETENCIES]: {
				delete: api.deleteCompetencies,
				setState: setCompetence,
			},
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

		const { text, methods } = getDataByType(type);

		if (isDelete) {
			e.target.textContent = text[0];
			selectedIds[type].length &&
			methods.delete(selectedIds[type]).then(updateLists);
		} else {
			e.target.textContent = text[1];
		}

		methods.setState((prevState) => ({ isDelete: !prevState.isDelete }));
	};

	const listClickHandler = (e, type, isDelete) => {
		if (isDelete) {
			markItemSelected(e, selectedIds, type);
			return;
		}

		switch (type) {
			case Types.COMPETENCIES: {
				showListBy(e, setTheme, api.getCompetenceThemes, Types.THEMES);
				changeActiveListElement(e, setCompetence, type, competence.activeId);
				break;
			}
			case Types.THEMES: {
				showListBy(e, setQuestion, api.getThemeQuestions, Types.QUESTIONS);
				changeActiveListElement(e, setTheme, type, theme.activeId);
				break;
			}
			case Types.QUESTIONS: {
				changeActiveListElement(e, setQuestion, type, question.activeId);
				break;
			}
			default: {

			}
		}
	};

	const createCompetence = () => {
		if (competence.newCompetenceName) {
			api.postCompetence(competence.newCompetenceName)
				.then(updateLists)
				.catch(e => console.error(e.message));
		}
	};

	const createTheme = () => {
		if (theme.newThemeName) {
			api.postTheme({ theme: theme.newThemeName, id: competence.activeId })
				.then(updateLists)
				.catch(e => console.error(e.message));
		}
	};

	const competenceTitles = ['Список компетенций', 'Удалить компетенцию'];
	const competenceHandlers = [
		(e) => listClickHandler(e, Types.COMPETENCIES, competence.isDelete),
		(e) => buttonClickHandler(e, Types.COMPETENCIES, competence.isDelete)];

	const themeTitles = ['Темы текущей компетенции', 'Удалить тему'];
	const themeHandlers = [
		(e) => listClickHandler(e, Types.THEMES, theme.isDelete),
		(e) => buttonClickHandler(e, Types.THEMES, theme.isDelete)];

	const questionTitles = ['Вопросы текущей темы', 'Удалить вопрос'];
	const questionHandlers = [
		(e) => listClickHandler(e, Types.QUESTIONS, question.isDelete),
		(e) => buttonClickHandler(e, Types.QUESTIONS, question.isDelete)];

	return (
		<Row>
			<Col md="3">
				<List id={Types.COMPETENCIES}
				      titles={competenceTitles}
				      content={competence.competencies}
				      handlers={competenceHandlers}/>
				<Input onChange={(e) => setCompetence(
					{ newCompetenceName: e.target.value })}
				       value={competence.newCompetenceName}
				       className="border-secondary bg-transparent my-2"
				       placeholder="Введите название компетенции"
				/>
				<LightButton text="Создать компетенцию"
				             handler={createCompetence}
				             isShadow
				             width="100"/>
			</Col>
			<Col xxl="4" md="3">
				<List id={Types.THEMES}
				      titles={themeTitles}
				      content={theme.themes}
				      handlers={themeHandlers}/>
				<Input onChange={(e) => setTheme({ newThemeName: e.target.value })}
				       value={theme.newThemeName}
				       className="border-secondary bg-transparent my-2"
				       placeholder="Введите название темы"
				/>
				<LightButton text="Создать тему"
				             handler={createTheme}
				             isShadow
				             width="100"/>
			</Col>
			<Col xxl="5" md="4">
				<List id={Types.QUESTIONS}
				      titles={questionTitles}
				      content={question.questions}
				      handlers={questionHandlers}/>
				<textarea style={{ minHeight: '87px', resize: 'none' }}
				          id="full-text-question"
				          value={question.activeText}
				          className="border-1 border-secondary rounded-3 p-2 w-100 mt-2"
				          placeholder="Кликните на вопрос, чтобы увидеть его полностью"
				          disabled
				/>
			</Col>
			<Link to="/moderator"
			      className="shadow_element btn btn-light bg-transparent mt-4">
				Выход
			</Link>
		</Row>
	);
}