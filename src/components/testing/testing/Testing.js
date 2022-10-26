import React, { useEffect, useRef, useState } from 'react';
import WrapperFluid from '../../second-components/wrapper-fluid/WrapperFluid';
import Header from '../../header/Header';
import { Button, Container, Row } from 'reactstrap';
import Timer from '../../timer/Timer';
import { useNavigate, useParams } from 'react-router-dom';
import TestingApi from '../../../services/testingApi';
import { questions as testQuestions } from './testing.services';
import { Question } from './Question';
import { TestResult } from './TestResult';

export default function Testing({ header: { title, isFluid } }) {
	const navigate = useNavigate();
	const { testId } = useParams();

	const [testSettings, setTestSettings] = useState();
	const [questions, setQuestions] = useState(testQuestions);

	useEffect(() => {
		console.log('useEffect');
		const fetchData = async () => {
			const api = new TestingApi();
			const testSettings = await api.getTestSettings(testId);
			const testQuestions = await api.getTestingQuestions(testId);

			return {
				testSettings,
				questions: testQuestions,
			};
		};
		fetchData().then(({ testSettings, questions }) => {
			setQuestions(questions);
			setTestSettings(testSettings);
		});
	}, [testId]);

	const updateQuestions = () => {
		if (questions.length === 0) {
			// get new questions pack and post user answers
		}
		setQuestions(questions.filter((item, i) => i !== 0));
	};

	const addUserAnswer = (pk, value) => {

	};

	const { question, type, answers } = questions[0];

	return (
		<WrapperFluid>
			<Header isFluid={isFluid} title={title}/>
			<Container fluid
								 className="d-flex flex-column justify-content-between flex-grow-1 bg-light border border-2 rounded-3">
				<Question question={question}
									type={type}
									answers={answers}
									addUserAnswer={addUserAnswer}/>
				{/*<TestResult/>*/}
				<Row>
					<Timer duration="300" isStop={false}/>
					<div className="d-flex justify-content-around text-primary p-4">
						<Button color="light"
										onClick={() => navigate(-1)}
										className="shadow_element text-primary bg-transparent fs-5 w-25">
							Завершить тестирование
						</Button>
						<Button color="light"
										type="submit"
										className="shadow_element text-primary bg-transparent fs-5 w-25">
							Далее
						</Button>
					</div>
				</Row>
			</Container>
		</WrapperFluid>
	);
}

