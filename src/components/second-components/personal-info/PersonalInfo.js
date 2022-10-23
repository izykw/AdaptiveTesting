import React, { useState, useRef } from 'react';
import { ListGroup, ListGroupItem, Row } from 'reactstrap';
import PhoneInput from 'react-phone-number-input/input';
import SvgIcons from '../svg-icons/SvgIcons';
import TestingApi from '../../../services/testingApi';
import { ListItemInput } from './ListItemInput';
import { isObjectEmpty } from './personalInfo.service';
import { deepEqual, linkChangeTextContent } from './personalInfo.service';

export default function PersonalInfo({ info, updateInfo }) {
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

	const firstNameHandler = (e) => updateInfo(
		{ user: { ...user, first_name: e.target.value } });
	const secondNameHandler = (e) => updateInfo(
		{ user: { ...user, last_name: e.target.value } });
	const levelHandler = (e) => updateInfo({ current_level: e.target.value });
	const mailHandler = (e) => updateInfo(
		{ user: { ...user, email: e.target.value } });

	const { user, current_level, phone_number, post, address } = info;
	return (<Row className="mb-md-5 mb-sm-3">
		<h4 className="my-2 fs-2">
			<ListItemInput value={user?.first_name}
										 handler={firstNameHandler}
										 isEdit={isEdit}/>
			<ListItemInput value={user?.last_name}
										 handler={secondNameHandler}
										 isEdit={isEdit}/>
		</h4>
		<ListGroup className="fs-5">
			<ListGroupItem className="bg-transparent border-0">
				<SvgIcons id="arrow-right" size="20"/>
				<span className="ms-1">Должность:</span>
				<ListItemInput value={post}
											 handler={(e) => updateInfo({ post: e.target.value })}
											 isEdit={isEdit}/>
			</ListGroupItem>
			<ListGroupItem className="bg-transparent border-0">
				<SvgIcons id="arrow-right" size="20"/>
				<span className="ms-1">Текущий уровень:</span>
				<ListItemInput value={current_level}
											 handler={levelHandler}
											 isEdit={isEdit}/>
			</ListGroupItem>
			<ListGroupItem className="bg-transparent border-0">
				<SvgIcons id="arrow-right" size="20"/>
				<span className="ms-1">Электронная почта:</span>
				<ListItemInput
					value={user?.email}
					handler={mailHandler}
					isEdit={isEdit}/>
			</ListGroupItem>
			<ListGroupItem className="bg-transparent border-0">
				<SvgIcons id="arrow-right" size="20"/>
				<span className="ms-1">Номер телефона:</span>
				<PhoneInput
					className="d-inline-block bg-transparent border-0 w-25 form-control text-primary"
					style={{ fontSize: 'inherit' }}
					country="RU"
					international
					withCountryCallingCode
					value={phone_number}
					onChange={(e) => {updateInfo({ phone_number: e })}}
					disabled={!isEdit}
					placeholder="Неизвестно"/>
			</ListGroupItem>
			<ListGroupItem className="bg-transparent border-0">
				<SvgIcons id="arrow-right" size="20"/>
				<span className="ms-1">Адрес:</span>
				<ListItemInput
					value={address}
					handler={(e) => updateInfo({ address: e.target.value })}
					isEdit={isEdit}/>
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
			 style={{ display: isEdit ? 'inline' : 'none' }}
			 className="link-secondary w-25"
			 onClick={undoEdit}>
			<span>Отменить изменения</span>
		</a>
	</Row>);
};