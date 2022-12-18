import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function TestListItem({ testSettings, role, deleteTest }) {
	const {
		id,
		level,
		name,
		competence,
		next_level_score,
		time,
		questions_count
	} = testSettings;

	const isModerator = role === 'moderator';
	const pathname = isModerator ?
		`/moderator/edit-test/${id}` :
		`/testing/${id}`;
	return (
		<Row className="shadow_element bg-light border rounded mb-3 p-2">
			<h4 className="h4">{name}</h4>
			<Col className="text-primary ps-5">
				<p>Компетенция: {competence}</p>
				<p>Начальный уровень: {level}</p>
				<p>Ограничение по времени: {time}</p>
				<p>Количество вопросов для уровня: {questions_count}</p>
				<p>Пороговый балл уровня: {next_level_score}</p>
			</Col>
			<Col className="d-flex flex-column gap-5">
				<Link to={pathname} className="btn border w-50">
					{isModerator ? 'Редактировать тест' : 'Начать тест'}
				</Link>
				<Button color="light"
				        className={`${isModerator ? '' : 'd-none'} bg-transparent border w-50`}
				        onClick={() => deleteTest(id)}>
					Удалить тест
				</Button>
			</Col>
		</Row>);
}