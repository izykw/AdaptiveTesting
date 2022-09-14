import React from 'react';
import {Button, Col, Container, Form, FormGroup, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import WrapperFluid
	from '../../../second-components/wrapper-fluid/wrapper-fluid';
import Header from '../../../header/header';
import SelectCustom
	from '../../../second-components/select-custom/select-custom';
import styles from './moderator-create-question.module.css';
import SvgIcons from '../../../second-components/svg-icons/svg-icons';

const {text_field, image} = styles;

export default function ModeratorCreateQuestion({header: {title, isFluid}}) {
	return (
		<WrapperFluid>
			<Header title={title} isFluid={isFluid}/>
			<Container fluid
					   className="d-flex flex-column flex-grow-1 bg-light border border-2 rounded-3">
				<Row>
					<span className="fs-5 text-primary">
						<SvgIcons id="bookmark-two-dash" color="primary" size="20"/>
						<span style={{verticalAlign: 'middle'}} className="ms-1">Создание вопроса</span>
					</span>
				</Row>
				<Form onSubmit={null}
					  className="d-flex flex-column justify-content-around flex-grow-1">
					<FormGroup>
						<Row>
							<SelectCustom title="Выберите тип вопроса"
										  handler={null}
										  options={[{'name': 'value'},
											  {'name': 'value'}]}/>
							<SelectCustom title="Выберите уровень сложности"
										  handler={null}
										  options={[{'name': 'value'},
											  {'name': 'value'}]}/>
						</Row>
					</FormGroup>
					<FormGroup>
						<Row className="mx-0">
							<textarea
								className={`${text_field} form-control bg-transparent border-secondary rounded-3 w-100 p-2`}
								placeholder="Введите текст"/>
						</Row>
					</FormGroup>
					<FormGroup>
						<Row>
							<Col>
								<span className="fs-5">Варианты ответов</span>
								<a href="/"
								   className="link-secondary ms-3"
								   onClick={null}>
									Добавить вариант ответа
								</a>
								<a href="/"
								   className="link-secondary ms-3"
								   onClick={null}>
									Удалить вариант ответа
								</a>
							</Col>
							<Col className="d-flex justify-content-end">
								<div className={image}>
									<img src="/"
										 className="border border-secondary rounded-3 w-25`"
										 alt="Изображение к вопросу"/>
									<a href="/"
									   className="link-secondary border border-secondary rounded-top py-1 px-2">
										Удалить
									</a>
								</div>
							</Col>
						</Row>
					</FormGroup>
					<FormGroup>
						<Row>
							<Col>
								<Link to="/moderator-cabinet/management-theme"
									  className="shadow_element bg-transparent btn text-dark border border-2 w-50">
									Выход
								</Link>
							</Col>
							<Col className="d-flex justify-content-end">
								<Button type="submit"
										className="shadow_element bg-transparent btn text-dark border border-2 w-50">
									Добавить
								</Button>
							</Col>
						</Row>
					</FormGroup>
				</Form>
			</Container>
		</WrapperFluid>
	);
}