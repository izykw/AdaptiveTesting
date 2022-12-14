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
import {
	convertTimeToSeconds,
	convertToCorrectTime
} from '../../../services/services';

export default function Testing({ header: { title, isFluid } }) {
	const api = new TestingApi();
	const navigate = useNavigate();
	const { testId } = useParams();

	const [testSettings, setTestSettings] = useState();
	const [questions, setQuestions] = useState({});
	const [level, setLevel] = useState(0);
	const [isTestCompleted, setIsTestCompleted] = useState(false);
	const [testResult, setTestResult] = useState({});


	const userAnswers = useRef([]);
	const passTime = useRef(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = getToken();
				const testSettings = await api.getTestSettingsById(testId, token);
				const testQuestions = await api.getTestingQuestions(testId, token);
				return {
					testSettings,
					questions: testQuestions.questions,
					level: testQuestions.level
				};
			} catch (e) {
				console.error(e.message);
			}
		};
		if (!testId) {
			return;
		}
		fetchData().then(({ testSettings, questions, level }) => {
			setQuestions(questions);
			setTestSettings(testSettings);
			setLevel(level)
		});
	}, [testId]);


	const nextQuestion = () => {
		if (questions.length === 1) {
			const token = getToken();
			const requestData = {
				level: level,
				time: convertToCorrectTime(Math.round(
					convertTimeToSeconds(testSettings.time) - passTime.current)),
				answers: userAnswers.current
			}
			api.postTestingAnswers(testId, requestData, token).then((res) => {
				if (res?.questions) {
					setQuestions(res.questions);
					setLevel(res.level);
					userAnswers.current = [];
				} else {
					setIsTestCompleted(true);
					setTestResult(res[0]);
				}
			});
			return;
		}
		setQuestions(questions.filter((question, i) => i !== 0));
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

	const testDuration = convertTimeToSeconds(testSettings?.time);

	return (
		<WrapperFluid>
			<Header isFluid={isFluid} title={title}/>
			<Container fluid
			           className="d-flex flex-column justify-content-between flex-grow-1 bg-light border border-2 rounded-3">
				{
					isTestCompleted ?
						<TestResult title="Результаты тестирования"
						            testResult={testResult}/> :
						<Question question={questions?.[0]?.question}
						          type={questions?.[0]?.type}
						          answers={questions?.[0]?.answers}
						          onSubmit={onSubmit}/>
				}
				<Row>
					{
						testDuration &&
						<Timer duration={testDuration}
						       isStop={isTestCompleted}
						       passTime={passTime}/>
					}
					<div className="d-flex justify-content-around text-primary p-4">
						<Button color="light"
						        onClick={() => navigate(-1)}
						        className="shadow_element text-primary bg-transparent fs-5 w-25">
							Завершить тестирование
						</Button>
						<p className={`${isTestCompleted ? 'd-none' : ''} fs-3 fw-bold text-primary`}>
							level {level}
						</p>
						<Button type="submit"
						        form="question"
						        color="light"
						        className={`${isTestCompleted ? 'd-none' : ''} shadow_element text-primary bg-transparent fs-5 w-25`}>
							Далее
						</Button>
					</div>
				</Row>
			</Container>
		</WrapperFluid>
	);
}

