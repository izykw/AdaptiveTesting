import React, {useState, useEffect} from 'react';
import ListCustom from '../../../second-components/list-custom/list-custom';
import { Col, Input, Row } from 'reactstrap';
import ButtonCustom
	from '../../../second-components/button-custom/button-custom';
import TestingApi from '../../../../services/testing-api';
import ModalWindow from '../../../second-components/modal-window/modal-window';


export default function ModeratorAddQuestion() {
	const [competencies, setCompetencies] = useState([]);
	const [competenceForTheme, setCompetenceForTheme] = useState('');

	// Themes current competence
	const [themes, setThemes] = useState([]);
	const [newTheme, setNewTheme] = useState('');

	const [isModalOpen, setIsModalOpen] = useState(false);

	const searchCompetence = (competenceName) => {
		return competencies.filter(item => item.competence === competenceName);
	}

	const createTheme = () => {
	}

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
			<ListCustom size={{xxl: 3, md: 3}}
						titles={{list: 'Список компетенций', btn: 'Удалить компетенцию'}}
						content={competencies}
						handlers={{}}/>
			<ListCustom size={{xxl: 6, md: 4}}
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
					<ButtonCustom text="Создать тему" handler={createTheme}/>
					<img src="/"
						 style={{height: '350px'}}
						 className="border border-secondary rounded-3"
						 alt="Изображение к вопросу"/>
				</div>
			</Col>
		</Row>
	);
}