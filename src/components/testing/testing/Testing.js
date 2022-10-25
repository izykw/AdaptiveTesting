import React, { useEffect, useState } from 'react';
import WrapperFluid from '../../second-components/wrapper-fluid/WrapperFluid';
import Header from '../../header/Header';
import { Button, Col, Container, Row } from 'reactstrap';
import Timer from '../../timer/Timer';
import { useNavigate, useParams } from 'react-router-dom';
import TestingApi from '../../../services/testingApi';

export default function Testing({ header: { title, isFluid } }) {
	const navigate = useNavigate();
	const { testId } = useParams();

	const [testSettings, setTestSettings] = useState();
	const [questions, setQuestions] = useState();
	const answers = [];

	useEffect(() => {
		console.log('useEffect');
		const fetchData = async () => {
			const api = new TestingApi();
			const testSettings = await api.getTestSettings(testId);
			const testQuestions = await api.getTestingQuestions(testId);

			return {
				testSettings,
				questions: testQuestions,
			}
		}
		fetchData().then(({testSettings, questions}) => {
			setQuestions(questions);
			setTestSettings(testSettings);
		})
	}, [testId])

	return (
		<WrapperFluid>
			<Header isFluid={isFluid} title={title}/>
			<Container fluid
								 className="d-flex flex-column justify-content-between flex-grow-1 bg-light border border-2 rounded-3">
				<Row>
					<h3 className="border border-1 border-secondary rounded p-4 text-primary text-center">
						Text question
					</h3>
				</Row>
				<Row>
					<Col md="8">
						<Answers isOneCorrect={false} answers={answers}/>
					</Col>
					<Col md="4">
						<img src="/"
								 alt="картинка к вопросу"
								 style={{ height: '230px', width: '300px' }}
								 className="shadow_element border border-secondary rounded"/>
					</Col>
				</Row>
				<Row>
					<Timer duration="300"/>
					<div className="d-flex justify-content-around text-primary p-4">
						<Button color="light"
										onClick={() => navigate(-1)}
										className="shadow_element text-primary bg-transparent fs-5 w-25">
							Завершить тестирование
						</Button>
						<Button color="light"
										className="shadow_element text-primary bg-transparent fs-5 w-25">
							Далее
						</Button>
					</div>
				</Row>
			</Container>
		</WrapperFluid>
	);
}

function Answers({ isOneCorrect, answers }) {
	const type = isOneCorrect ? 'radio' : 'checkbox';
	return (
		<ul className="list-group fs-5">
			{
				answers.map(item => {
					const name = isOneCorrect ? 'answer' : `answer[i]`
					return (
						<li className="list-group-item border-0">
							<label>
								<input type={type}
											 name={name}
											 className="form-check-input shadow_custom"/>
								<span className="ms-2">{item}</span>
							</label>
						</li>
					);
				})
			}
		</ul>
	);
}

