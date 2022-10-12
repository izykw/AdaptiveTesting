import React, { useState, useEffect } from 'react';
import { Button, ListGroup, Row } from 'reactstrap';
import { ListItemInput } from './ListItemInput';
import { ListItemSelect } from './ListItemSelect';

export default function ModeratorCreateTest() {
	const [testSettings, setTestSettings] = useState({});

	useEffect(() => {

	}, []);

	return (
		<Row>
			<h4 className="h4 mt-3 mb-4">ИМЯ ПОЛЬЗОВАТЕЛЯ</h4>
			<ListGroup>
				<ListItemSelect name="Выбор компетенции"
												options={[{value: 'date', name: 'темы'}]}/>
				<ListItemSelect name="Выбор темы"
												options={[{value: 'date', name: 'темы'}]}/>
				<ListItemSelect name="Дополнительная тема"
												options={[{value: 'date', name: 'темы'}]}/>
				<ListItemInput type="text"
											 name="Название теста"
											 placeholder="Введите название"
											 width="75"/>
				<ListItemInput type="number"
											 name="Длительность теста в минутах"
											 placeholder="180"
											 width="25"/>
				<ListItemInput type="number"
											 name="Количество вопросов"
											 placeholder="150"
											 width="25"/>
				<ListItemInput type="number"
											 name="Пороговый балл"
											 placeholder="40"
											 width="25"/>
			</ListGroup>
			<Button color="light"
							className="bg-transparent border border-2 w-75 mx-auto mt-4">
				Добавить тест
			</Button>
		</Row>);
}