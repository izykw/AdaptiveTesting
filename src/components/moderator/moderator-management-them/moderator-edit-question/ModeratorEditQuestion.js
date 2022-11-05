import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../../header/Header';
import WrapperFluid
	from '../../../second-components/wrapper-fluid/WrapperFluid';
import { Container } from 'reactstrap';
import ModeratorCreateQuestion
	from '../moderator-create-question/ModeratorCreateQuestion';
import TestingApi from '../../../../services/testingApi';

export default function ModeratorEditQuestion({ header: { title, isFluid } }) {
	const {questionId} = useParams();
	const [question, setQuestion] = useState(null);

	useEffect(() => {
		const api = new TestingApi();
		api.getQuestion(questionId).then(res => setQuestion(res));
	}, [questionId]);

	return (
		<WrapperFluid>
			<Header title={title} isFluid={isFluid}></Header>
			<Container fluid
								 className="d-flex flex-column justify-content-start flex-grow-1 bg-light border border-2 rounded-3">
				{question !== null && <ModeratorCreateQuestion question={question}/>}
			</Container>
		</WrapperFluid>
	);
}