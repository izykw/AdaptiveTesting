import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Row } from 'reactstrap';
import WrapperFluid from '../../second-components/wrapper-fluid/WrapperFluid';
import Header from '../../header/Header';
import Timer from '../../timer/Timer';
import { Question } from './Question';
import { TestResult } from './TestResult';
import TestingApi from '../../../services/testingApi';
import { getToken } from '../../../services/getToken';
import { middleWare } from '../../../services/middleWare';
import { convertTimeToSeconds } from '../../../services/services';

export default function Testing({ header: { title, isFluid } }) {
	const api = new TestingApi();
	const navigate = useNavigate();
	const { testId } = useParams();

	const [testSettings, setTestSettings] = useState();
	const [questions, setQuestions] = useState({});
	const [isTestCompleted, setIsTestCompleted] = useState(false);

	const userAnswers = useRef([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = getToken();
				const testSettings = await api.getTestSettings(testId, token);
				const testQuestions = await api.getTestingQuestions(testId, token);
				return {
					testSettings,
					questions: testQuestions
				};
			} catch (e) {
				console.error(e.message);
			}
		};
		if(!testId) {
			return;
		}
		fetchData().then(({ testSettings, questions }) => {
			setQuestions(questions);
			setTestSettings(testSettings);
		});
	}, [testId]);


	const nextQuestion = () => {
		if (questions.questions.length === 1) {
			const token = getToken();
			const requestData = {
				level: questions.level,
				answers: userAnswers.current
			}
			console.log(requestData);
			api.postTestingAnswers(testId, requestData, token);
			api.getTestingQuestions(testId, token).then(questions => {
				console.log(questions);
				setQuestions(questions);
				userAnswers.current = [];
			});
			return;
		}
		setQuestions(prevState => ({
			...prevState,
			questions: questions.questions.filter((question, i) => i !== 0)
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const formElements = e.target.elements;
		for (let i = 0; i < formElements.length; i++) {
			if (formElements[i].tagName !== 'INPUT') {
				continue;
			}
			const { id, checked } = formElements[i];
			checked && userAnswers.current.push(id);
		}
		nextQuestion();
	};

	console.log('5'*5);

	const testDuration = convertTimeToSeconds(testSettings?.time) * 60;
	return (
		<WrapperFluid>
			<Header isFluid={isFluid} title={title}/>
			<Container fluid
								 className="d-flex flex-column justify-content-between flex-grow-1 bg-light border border-2 rounded-3">
				<Question question={questions?.questions?.[0]?.question}
									type={questions?.questions?.[0]?.type}
									answers={questions?.questions?.[0]?.answers}
									onSubmit={onSubmit}/>
				{/*<TestResult/>*/}
				<Row>
					<Timer duration={testDuration ?? 0} isStop={false}/>
					<div className="d-flex justify-content-around text-primary p-4">
						<Button color="light"
										onClick={() => navigate(-1)}
										className="shadow_element text-primary bg-transparent fs-5 w-25">
							Завершить тестирование
						</Button>
						<Button type="submit"
										form="question"
										color="light"
										className="shadow_element text-primary bg-transparent fs-5 w-25">
							Далее
						</Button>
					</div>
				</Row>
			</Container>
		</WrapperFluid>
	);
}

