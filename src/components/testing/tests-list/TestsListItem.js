import React from 'react';
import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

//TODO: Использовать URL параметры для
export default function TestsListItem({role}) {
	return (
		<Row className="shadow_element bg-light border rounded mb-3">
			<h4 className="h4">Название теста</h4>
			<Col className="text-primary ps-5">
				<p>Компетенция: название</p>
				<p>Тема: название</p>
				<p>Ограничение по времени: время</p>
				<p>Пороговый балл: значение</p>
			</Col>
			<Col>
				<p>Осбоые указания для прохождения данного тестирования</p>
				<Link to={role === 'moderator' ? '/moderator/edit-test' : '/testing'}
							className="btn border w-50">
					{role === 'moderator' ? 'Редактировать тест' : 'Начать тест'}
				</Link>
			</Col>
		</Row>);
}