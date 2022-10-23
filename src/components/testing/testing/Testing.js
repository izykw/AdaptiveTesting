import React, { useState } from 'react';
import WrapperFluid from '../../second-components/wrapper-fluid/WrapperFluid';
import Header from '../../header/Header';
import { Button, Col, Container, Row } from 'reactstrap';
import Timer from '../../timer/Timer';

export default function Testing({ header: { title, isFluid } }) {

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
						<Answers/>
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
	return (
		<ul className="list-group fs-5">
			<li className="list-group-item border-0">
				<label>
					<input type="checkbox"
								 className="form-check-input shadow_custom"/>
					<span className="ms-2">Text answer</span>
				</label>
			</li>
			<li className="list-group-item border-0">
				<label>
					<input type="radio"
								 className="form-check-input shadow_custom"/>
					<span className="ms-2">Text answer</span>
				</label>
			</li>
			<li className="list-group-item border-0">
				<label>
					<input type="radio" className="form-check-input shadow_custom"/>
					<span className="ms-2">Text answer</span>
				</label>
			</li>
			<li className="list-group-item border-0">
				<label>
					<input type="radio" className="form-check-input shadow_custom"/>
					<span className="ms-2">Text answer</span>
				</label>
			</li>
			<li className="list-group-item border-0">
				<label>
					<input type="radio" className="form-check-input shadow_custom"/>
					<span className="ms-2">Text answer</span>
				</label>
			</li>
		</ul>
	);
}

