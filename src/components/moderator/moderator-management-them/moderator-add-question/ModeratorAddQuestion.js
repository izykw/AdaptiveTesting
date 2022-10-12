import React, {useState, useEffect} from 'react';
import { Col, Input, Row } from 'reactstrap';
import List from '../../../second-components/list/List';
import LightButton
	from '../../../second-components/light-button/LightButton';
import TestingApi from '../../../../services/testingApi';


export default function ModeratorAddQuestion() {
	const [competencies, setCompetencies] = useState([]);
	const [competenceForTheme, setCompetenceForTheme] = useState('');

	// Themes current competence
	const [themes, setThemes] = useState([]);
	const [newTheme, setNewTheme] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			const api = new TestingApi();
			const competencies = await api.getCompetencies();
			const themes = await api.getThemes();
			return {
				competencies: competencies.results,
				themes
			}
		}
		fetchData().then(({themes, competencies}) => {
			setThemes(themes);
			setCompetencies(competencies);
		})
	}, []);

	return (
		<Row>
			<List size={{xxl: 3, md: 3}}
						titles={{list: 'Список компетенций', btn: 'Удалить компетенцию'}}
						content={competencies}
						handlers={{}}/>
			<List size={{xxl: 6, md: 4}}
						titles={{
							list: 'Список тем текущей компетенции',
							btn: 'Добавить тему в компетенцию'
						}}
						content={themes}
						handlers={{}}/>
			<Col>
				<span className="fs-5">Создание темы</span>
				<div style={{minHeight: '500px'}}
					 className="d-flex justify-content-between flex-column">
					<Input
						onChange={(e) => setCompetenceForTheme(e.target.value)}
						value={competenceForTheme}
						className="border-secondary bg-transparent"
						placeholder="Введите название компетенции"
					/>
					<Input
						onChange={(e) => setNewTheme(e.target.value)}
						value={newTheme}
						className="border-secondary bg-transparent"
						placeholder="Введите название темы"
					/>
					<LightButton text="Создать тему" handler={null}/>
					<img src="/"
						 style={{height: '350px'}}
						 className="border border-secondary rounded-3"
						 alt="Изображение к вопросу"/>
				</div>
			</Col>
		</Row>
	);
}