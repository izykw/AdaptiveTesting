import React, { useEffect } from 'react';
import { Col, Input, Row } from 'reactstrap';
import List from '../../../second-components/list/List';
import LightButton
	from '../../../second-components/light-button/LightButton';

import TestingApi from '../../../../services/testingApi';
import {
	markItemSelected, changeActiveListElement,
	showListBy
} from '../moderatorManagementTheme.services';
import useListData from '../../../../hooks/use-person-info/use-list-data';
import { Link } from 'react-router-dom';

export default function ModeratorEditCompetence() {
	const api = new TestingApi();
	const [theme, setTheme] = useListData({
		competenceThemes: [],
		newThemeName: '',
		activeId: null,
		isControl: false,
	});

	const [competence, setCompetence] = useListData({
		competencies: [],
		newCompetenceName: '',
		activeId: null,
		isControl: false,
	});

	const Types = {
		COMPETENCIES: 'competencies',
		COMPETENCE_THEMES: 'competenceThemes',
	};

	const selectedIds = {
		[Types.COMPETENCIES]: [],
		[Types.COMPETENCE_THEMES]: [],
	};

	const updateLists = () => {
		const fetchData = async () => {
			const api = new TestingApi();
			const newCompetencies = await api.getCompetencies();
			const newCompetenceThemes = await api.getCompetenceThemes(
				competence.activeId ?? newCompetencies.results[0].pk);
			return {
				competencies: newCompetencies.results,
				competenceThemes: newCompetenceThemes
			};
		};

		fetchData().then(({competencies, competenceThemes}) => {
			setTheme({
				competenceThemes,
				activeId: theme.activeId ?? competenceThemes[0].pk,
				isControl: false
			});
			setCompetence({
				competencies,
				activeId: competence.activeId ?? competencies[0].pk,
				isControl: false
			});
		});
	};

	useEffect(() => {
		updateLists();
	}, []);

	const getDataByType = (type) => {
		const textsByType = {
			[Types.COMPETENCIES]: ['Удалить компетенцию',
				'Удалить выбранные компетенции'],
			[Types.COMPETENCE_THEMES]: ['Добавить тему в выбранную компетенцию',
				'Выберите вопросы, которые хотите добавить']
		};

		const methodsByType = {
			[Types.COMPETENCIES]: {
				request: api.deleteCompetencies,
				setState: setCompetence,
			},
			[Types.COMPETENCE_THEMES]: {
				request: null,
				setState: setTheme,
			}
		};

		return {
			text: textsByType[type],
			methods: methodsByType[type],
		};
	};

	const btnClickHandler = (e, type, isControl) => {
		e.preventDefault();

		const {text, methods} = getDataByType(type);

		if (isControl) {
			e.target.textContent = text[0];
			selectedIds[type].length &&
			methods.request(selectedIds[type]).then(updateLists);
		} else {
			e.target.textContent = text[1];
		}

		methods.setState((prevState) => ({isControl: !prevState.isControl}));
	};

	const listClickHandler = (e, type, isControl) => {
		if (isControl) {
			markItemSelected(e, selectedIds, type);
			return;
		}

		if (type === Types.COMPETENCIES) {
			showListBy(e, setTheme, api.getCompetenceThemes, Types.COMPETENCE_THEMES);
			changeActiveListElement(e, setCompetence, type, competence.activeId);
		}
	};

	const createCompetence = () => {
		if (competence.newCompetenceName) {
			api.postCompetence(competence.newCompetenceName).then(updateLists);
		}
	};

	const createTheme = () => {
		if (theme.newThemeName) {
			api.postTheme({
				theme: theme.newThemeName,
				id: competence.activeId,
			}).then(updateLists);
		}
	};

	return (
		<Row>
			<List size={{xxl: 3, md: 3}}
						id={Types.COMPETENCIES}
						titles={{list: 'Список компетенций', btn: 'Удалить компетенцию'}}
						content={competence.competencies}
						handlers={{
							list: (e) => listClickHandler(e, Types.COMPETENCIES,
								competence.isControl),
							btn: (e) => btnClickHandler(e, Types.COMPETENCIES,
								competence.isControl),
						}}/>
			<List size={{xxl: 6, md: 4}}
						id={Types.COMPETENCE_THEMES}
						titles={{
							list: 'Список тем текущей компетенции',
							btn: 'Добавить тему в выбранную компетенцию'
						}}
						content={theme.competenceThemes}
						handlers={{
							list: (e) => listClickHandler(e, Types.COMPETENCE_THEMES,
								theme.isControl),
							btn: (e) => btnClickHandler(e, Types.COMPETENCE_THEMES,
								theme.isControl),
						}}/>
			<Col>
				<span className="fs-5">Создание компетенции и темы</span>
				<div style={{minHeight: '500px'}}
						 className="d-flex flex-column">
					<Input
						onChange={(e) => setCompetence(
							{newCompetenceName: e.target.value})}
						value={competence.newCompetenceName}
						className="border-secondary bg-transparent mb-2"
						placeholder="Введите название компетенции"
					/>
					<LightButton text="Создать компетенцию" handler={createCompetence}/>
					<Input
						onChange={(e) => setTheme({newThemeName: e.target.value})}
						value={theme.newThemeName}
						className="border-secondary bg-transparent mt-5 mb-2"
						placeholder="Введите название темы"
					/>
					<LightButton text="Создать тему" handler={createTheme}/>
					<Link to="/moderator"
								className="shadow_element bg-transparent btn text-dark border border-2 mt-5">
						Выход
					</Link>
				</div>
			</Col>
		</Row>
	);
}