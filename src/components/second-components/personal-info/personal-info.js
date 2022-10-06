import React, { useState, useRef } from 'react';
import { Input, ListGroup, ListGroupItem, Row } from 'reactstrap';
import PhoneInput from 'react-phone-number-input/input';
import SvgIcons from '../svg-icons/svg-icons';
import TestingApi from '../../../services/testing-api';

export default function PersonalInfo({info, updateInfo}) {
	const [isEdit, setIsEdit] = useState(false);
	const initInfo = useRef({});

	if (isObjectEmpty(initInfo.current) && !isObjectEmpty(info)) {
		initInfo.current = JSON.parse(JSON.stringify(info));
	}

	const postNewInfo = () => {
		if (deepEqual(initInfo.current, info)) return;
		const api = new TestingApi();
		api.updateUser(info, info.id);
		initInfo.current = {};
	};

	const editInfo = (e) => {
		e.preventDefault();
		linkChangeTextContent(isEdit);
		postNewInfo();
		setIsEdit((prevState) => !prevState);
	};

	const undoEdit = (e) => {
		e.preventDefault();
		linkChangeTextContent(isEdit);
		updateInfo(initInfo.current);
		setIsEdit((prevState) => !prevState);
	};

	const isValidInfo = () => {
		const errors = [];
		let isValid = true;
		const {phone_number, current_level, post, user: {email}} = info;
		if (phone_number.length !== 12) {
			errors.push('Длина номера телефона должна быть 11 цифр');
			isValid = false;
		}
		if (email) { // check email
			errors.push('Некорректная почта');
			isValid = false;
		}

		return isValid;
	};

	const {user, current_level, phone_number, post, address} = info;
	return (<Row className="mb-md-5 mb-sm-3">
		<h4 className="my-2 fs-2">
			{createInput({
				value: user?.first_name ?? '',
				handler: (e) => updateInfo(
					{user: {...user, first_name: e.target.value}}),
				isEdit
			})}
			{createInput({
				value: user?.last_name ?? '',
				handler: (e) => updateInfo(
					{user: {...user, last_name: e.target.value}}),
				isEdit
			})}
		</h4>
		<ListGroup className="fs-5">
			<ListGroupItem className="bg-transparent border-0">
				<SvgIcons id="arrow-right" size="20"/>
				<span className="ms-1">Должность:</span>
				{createInput({
					value: post,
					handler: (e) => updateInfo({post: e.target.value}),
					isEdit
				})}
			</ListGroupItem>
			<ListGroupItem className="bg-transparent border-0">
				<SvgIcons id="arrow-right" size="20"/>
				<span className="ms-1">Текущий уровень:</span>
				{createInput({
					value: current_level ?? '',
					handler: (e) => updateInfo(
						{current_level: e.target.value}),
					isEdit
				})}
			</ListGroupItem>
			<ListGroupItem className="bg-transparent border-0">
				<SvgIcons id="arrow-right" size="20"/>
				<span className="ms-1">Электронная почта:</span>
				{createInput({
					type: 'email',
					value: user?.email ?? '',
					handler: (e) => updateInfo(
						{user: {...user, email: e.target.value}}),
					isEdit
				})}
			</ListGroupItem>
			<ListGroupItem className="bg-transparent border-0">
				<SvgIcons id="arrow-right" size="20"/>
				<span className="ms-1">Номер телефона:</span>
				<PhoneInput
					className="d-inline-block bg-transparent border-0 w-25 form-control text-primary"
					style={{fontSize: 'inherit'}}
					country="RU"
					international
					withCountryCallingCode
					value={phone_number ?? ''}
					onChange={(e) => {
						updateInfo({phone_number: e});
					}}
					disabled={!isEdit}
					placeholder="Неизвестно"/>
			</ListGroupItem>
			<ListGroupItem className="bg-transparent border-0">
				<SvgIcons id="arrow-right" size="20"/>
				<span className="ms-1">Адрес:</span>
				{createInput({
					value: address ?? '',
					handler: (e) => updateInfo({address: e.target.value}),
					isEdit
				})}
			</ListGroupItem>
		</ListGroup>
		<a
			id="edit-data"
			href="/"
			onClick={editInfo}
			className="link-secondary w-50 ms-2">
			<SvgIcons id="pencil" size="20"/>
			<span>Редактировать данные</span>
		</a>
		<a href="/"
			 style={{display: isEdit ? 'inline' : 'none'}}
			 className="link-secondary w-25"
			 onClick={undoEdit}>
			<span>Отменить изменения</span>
		</a>
	</Row>);
};

function createInput({value, handler, isEdit, type = 'text'}) {
	return (
		<Input
			type={type}
			onChange={handler}
			value={value ?? ''}
			placeholder="Неизвестно"
			style={{fontSize: 'inherit'}}
			className="d-inline-block bg-transparent border-0 w-25 text-primary"
			disabled={!isEdit}
		/>);
}

function linkChangeTextContent(isEdit) {
	const link = document.querySelector('#edit-data');
	if (isEdit === true) {
		link.textContent = 'Редактировать данные';
	} else {
		link.textContent = 'Отправить данные';
	}
}

function deepEqual(obj1, obj2) {
	return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function isObjectEmpty(obj) {
	return Object.keys(obj).length === 0;
}