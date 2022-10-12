import React from 'react';
import WrapperFluid from '../../second-components/wrapper-fluid/WrapperFluid';
import Header from '../../header/Header';
import { Container } from 'reactstrap';
import { useParams } from 'react-router-dom';
import TestsListItem from './TestsListItem';

export default function TestsList({header: {title, isFluid}}) {
	const {role} = useParams();

	return (
		<WrapperFluid>
			<Header title={title} isFluid={isFluid}/>
			<p className="h3 mt-lg-3">
				В соответствии с компетенциями Вам доступны следующие тесты:
			</p>
			<Container fluid className="flex-grow-1">
				<TestsListItem role={role}/>
				<TestsListItem role={role}/>
				<TestsListItem role={role}/>
				<TestsListItem role={role}/>
				<TestsListItem role={role}/>
				<TestsListItem role={role}/>
			</Container>
		</WrapperFluid>
	);
}

