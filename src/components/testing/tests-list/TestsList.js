import React, { useState, useEffect } from 'react';
import WrapperFluid from '../../second-components/wrapper-fluid/WrapperFluid';
import Header from '../../header/Header';
import { Container } from 'reactstrap';
import { useParams } from 'react-router-dom';
import TestingApi from '../../../services/testingApi';
import TestsListItem from './TestsListItem';

export default function TestsList({ header: { title, isFluid } }) {
	const { role } = useParams();
	const [testSettings, setTestSettings] = useState([]);

	useEffect(() => {
		const api = new TestingApi();
		api.getTestSettings().then(setTestSettings);
	}, []);

	const createTestList = () => {
		if (testSettings.length === 0) {
			return <p className="fs-4">Тестов нет</p>;
		}
		return testSettings.map(item => {
			return <TestsListItem key={item.id} testSettings={item} role={role}/>;
		});
	};

	return (
		<WrapperFluid>
			<Header title={title} isFluid={isFluid}/>
			<p className="h3 mt-lg-3">
				В соответствии с компетенциями Вам доступны следующие тесты:
			</p>
			<Container fluid className="flex-grow-1">
				{
					createTestList()
				}
			</Container>
		</WrapperFluid>
	);
};

