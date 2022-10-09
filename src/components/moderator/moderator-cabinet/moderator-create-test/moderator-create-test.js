import React, {useState, useEffect} from 'react';
import {Button, Input, ListGroup, ListGroupItem, Row} from 'reactstrap';
import SvgIcons from '../../../second-components/svg-icons/svg-icons';


export default function ModeratorCreateTest() {
	const [testSettings, setTestSettings] = useState({});

	useEffect(() => {

	}, []);

	return (
		<Row>
			<h4 className="h4 mt-3 mb-4">ИМЯ ПОЛЬЗОВАТЕЛЯ</h4>
			<ListGroup>
				{createListItemSelect({
					name: 'Выбор компетенции',
					options: [{value: 'date', name: 'темы'}],
				})}
				{createListItemSelect({
					name: 'Выбор темы',
					options: [{value: 'date', name: 'темы'}],
				})}
				{createListItemSelect({
					name: 'Дополнительная тема',
					options: [{value: 'date', name: 'темы'}],
				})}
				{createListItemInput({
					type: 'text',
					name: 'Название теста',
					placeholder: 'Введите название',
					width: 75
				})}
				{createListItemInput({
					type: 'number',
					name: 'Длительность теста в минутах',
					placeholder: '180',
					width: 25
				})}
				{createListItemInput({
					type: 'number',
					name: 'Количество вопросов',
					placeholder: '150',
					width: 25
				})}
				{createListItemInput({
					type: 'number',
					name: 'Пороговый бал',
					placeholder: '600',
					width: 25
				})}
			</ListGroup>
			<Button color="light"
					className="bg-transparent border border-2 w-75 mx-auto mt-4">
				Добавить тест
			</Button>
		</Row>);
}

function createListItemSelect({name, options}) {
	if (!Array.isArray(options)) {
		throw new Error('Options is not array');
	}
	return (
		<ListGroupItem className="bg-transparent border-0 text-primary">
			<SvgIcons id="arrow-right" color="primary" size="20"/>
			<span className="ms-1">{name}</span>
			<div className="ms-4">
				<select className="form-select border-1 border-secondary bg-transparent"
						value={options[0].value}>
					{options.map(({value, name}) => {
						return <option value={value}>{name}</option>;
					})}
				</select>
			</div>
		</ListGroupItem>);
}

function createListItemInput({type, name, placeholder, width}) {
	return (
		<ListGroupItem className="bg-transparent border-0 text-primary">
			<div className="d-flex justify-content-start align-items-center">
			<span className="me-lg-5 me-1">
				<SvgIcons id="arrow-right" color="primary" size="20"/>
				<span className="ms-1">{name}</span>
			</span>
				<Input type={type}
					   className={`bg-transparent border-secondary w-${width}`}
					   placeholder={placeholder}/>
			</div>
		</ListGroupItem>);
}