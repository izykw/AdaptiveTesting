import React, { useState, useEffect } from 'react';
import WrapperFluid from '../../second-components/wrapper-fluid/WrapperFluid';
import Header from '../../header/Header';
import { Container } from 'reactstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TestingApi from '../../../services/testingApi';
import TestListItem from './TestListItem';
import SvgIcons from '../../second-components/svg-icons/SvgIcons';

export default function TestList({ header: { title, isFluid } }) {
	const api = new TestingApi();
	const { role } = useParams();
	const navigate = useNavigate();
	const [testSettings, setTestSettings] = useState([]);

	useEffect(() => {
		api.getTestSettings().then(setTestSettings);
	}, []);

	const deleteTest = (id) => {
		api.deleteTestSettings(id)
			.then(() => api.getTestSettings().then(setTestSettings))
			.catch(err => console.error(err));
	}

	const createTestList = () => {
		if (testSettings.length === 0) {
			return <p className="fs-4">Тестов нет</p>;
		}
		return testSettings.map(item => {
			return <TestListItem key={item.id}
			                     testSettings={item}
			                     role={role}
			                     deleteTest={deleteTest}/>;
		});
	};

	return (
		<WrapperFluid>
			<Header title={title} isFluid={isFluid}/>
			<div>
				<Link to={`/${role}`}
				        className="text-primary fs-5 ms-1 bg-transparent border-0 text-decoration-underline ">
					<SvgIcons id="arrow-left" color="primary" size="20"/>
					Вернуться в кабинет
				</Link>
				<p className="h3 mt-lg-3">
					В соответствии с компетенциями Вам доступны следующие тесты:
				</p>
			</div>
			<Container fluid className="flex-grow-1">
				{
					createTestList()
				}
			</Container>
		</WrapperFluid>
	);
};

